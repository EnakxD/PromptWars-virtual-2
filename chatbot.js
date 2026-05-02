/* Chatbot Logic */

function clearChat() {
    const messages = document.getElementById('chat-messages');
    messages.innerHTML = `
        <div class="chat-message bot">
            <div class="message-avatar">🗳️</div>
            <div class="message-bubble">
                <p>Chat cleared! How can I help you today?</p>
                <div class="message-time">Just now</div>
            </div>
        </div>
    `;
}

function sendSuggestion(btn) {
    const text = btn.textContent;
    const input = document.getElementById('chat-input');
    input.value = text;
    sendMessage();
}

function getBotResponse(input) {
    const text = input.toLowerCase();
    
    if (text.includes("register") || text.includes("enroll")) {
        return "To register to vote, you need to fill out Form 6 online at voters.eci.gov.in or submit it to your Electoral Registration Officer (ERO). You need proof of age, address, and a passport-size photo.";
    }
    if (text.includes("nota") || text.includes("none of the above")) {
        return "NOTA stands for 'None of the Above'. It is an option on the EVM that allows you to register a vote of rejection for all candidates in the election. However, NOTA votes do not impact the election outcome.";
    }
    if (text.includes("evm") || text.includes("electronic voting machine")) {
        return "An EVM (Electronic Voting Machine) is used to cast votes in India. It consists of a Control Unit and a Balloting Unit. You press the blue button next to the candidate of your choice. It's tamper-proof and runs on a battery.";
    }
    if (text.includes("lok sabha")) {
        return "The Lok Sabha is the lower house of India's Parliament. Members are directly elected by the public. The country is divided into 543 Lok Sabha constituencies, and the party or coalition with a majority (272+ seats) forms the central government.";
    }
    if (text.includes("eligible") || text.includes("who can vote") || text.includes("age")) {
        return "To be eligible to vote in India, you must be an Indian citizen, at least 18 years of age on the qualifying date, and be ordinarily resident of the polling area. You must also be registered in the electoral roll.";
    }
    if (text.includes("after voting") || text.includes("vvpat")) {
        return "After you press the button on the EVM, the VVPAT machine will print a slip showing the candidate's name and symbol. It is visible for 7 seconds through a transparent window, verifying your vote, before it drops into a sealed drop box.";
    }
    if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
        return "Hello! Jai Hind! 🇮🇳 I'm VoteWise AI. Ask me any questions you have about the Indian election process.";
    }
    
    return "I'm not sure about that. Try asking about voter registration, EVMs, NOTA, eligibility, or the Lok Sabha!";
}

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;

    // Hide API key section if it's there
    const apiSection = document.getElementById('api-key-section');
    if (apiSection) apiSection.style.display = 'none';

    const messages = document.getElementById('chat-messages');
    
    // User message
    messages.innerHTML += `
        <div class="chat-message user">
            <div class="message-bubble">
                <p>${text}</p>
                <div class="message-time">Just now</div>
            </div>
        </div>
    `;
    
    input.value = '';
    
    // Bot loading
    const loadingId = 'loading-' + Date.now();
    messages.innerHTML += `
        <div class="chat-message bot" id="${loadingId}">
            <div class="message-avatar">🤖</div>
            <div class="message-bubble">
                <p>Thinking...</p>
            </div>
        </div>
    `;
    
    messages.scrollTop = messages.scrollHeight;
    
    // Simulate thinking delay
    setTimeout(() => {
        document.getElementById(loadingId).remove();
        
        const responseText = getBotResponse(text);
        
        messages.innerHTML += `
            <div class="chat-message bot">
                <div class="message-avatar">🤖</div>
                <div class="message-bubble">
                    <p>${responseText}</p>
                    <div class="message-time">Just now</div>
                </div>
            </div>
        `;
        messages.scrollTop = messages.scrollHeight;
        
        if (typeof earnXP === 'function') earnXP(2, 'Used AI Assistant');
        if (typeof unlockAchievement === 'function') unlockAchievement('ai_user');
    }, 600);
}
