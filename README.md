# 🗳️ VoteWise India — Election Education Assistant

> A gamified, multilingual, zero-dependency web app that empowers Indian citizens to understand the democratic voting process, verify their eligibility, locate polling booths, learn election terminology, and test their civic knowledge — all in one place.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Live Demo](#live-demo)
- [Screenshots](#screenshots)
- [Features](#features)
- [Project Structure](#project-structure)
- [File Breakdown](#file-breakdown)
- [Gamification System](#gamification-system)
- [Multilingual Support](#multilingual-support)
- [Tech Stack](#tech-stack)
- [Design System](#design-system)
- [Getting Started](#getting-started)
- [Deploying to GitHub Pages](#deploying-to-github-pages)
- [Customisation Guide](#customisation-guide)
- [Data & Content](#data--content)
- [Browser Compatibility](#browser-compatibility)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**VoteWise India** is a civic education platform built as a single-page application (SPA) using pure HTML, CSS, and JavaScript — no frameworks, no build tools, no backend required. It was designed to break down the intimidating process of voting in India into digestible, interactive steps, with a gamified experience that rewards users for learning.

The app targets first-time voters, students, and citizens who want to understand how Indian democracy works in practice — from registering on the electoral roll to pressing a button on an EVM.

**Key design principles:**
- 🚫 Zero dependencies — runs directly in the browser
- 📱 Mobile-first responsive layout
- 🌐 Trilingual UI (English, Hindi, Bengali)
- 🎮 XP and achievement system to encourage exploration
- ♿ Accessible with ARIA labels and keyboard-friendly interactions


<img width="1359" height="691" alt="1" src="https://github.com/user-attachments/assets/58b94b24-5f91-4116-afcb-3bc3598bc317" />


<img width="1364" height="688" alt="2" src="https://github.com/user-attachments/assets/b7feba86-18b5-4cde-a124-0f3504a69746" />


<img width="1364" height="686" alt="4" src="https://github.com/user-attachments/assets/d4ba199f-30e6-4510-85d6-78aadcd723a0" />



---

## Features

The app is divided into **10 tabs**, each focused on a specific aspect of the voting journey.

---

### 🏆 1. My Journey (Dashboard)

The landing tab that gives users a personalised progress overview.

- **XP Progress Bar** — Fills as users explore sections, complete steps, answer quiz questions, and interact with the app. Each level requires 100 XP.
- **Level Badge** — Displays current level title (e.g., "Level 1 — Curious Citizen").
- **Sections Completed Counter** — Tracks how many of the 6 main sections the user has visited.
- **Quiz Score Display** — Shows the running quiz tally in real time.
- **Achievements Grid** — 8 unlockable badges displayed as locked (greyed out) or earned (gold border + checkmark). See [Gamification System](#gamification-system) for the full list.
- **Daily Voter Fact** — Rotates through 6 curated facts about Indian elections with a "Show New Fact" button.

---

### 📋 2. Steps to Vote

An interactive, step-by-step visual guide to casting a vote in India.

There are **6 steps**, each rendered as a timeline card:

| Step | Title | Colour |
|------|-------|--------|
| 1 | Check Your Eligibility | Saffron |
| 2 | Register to Vote (or Confirm) | India Green |
| 3 | Know Your Voting Date | Navy |
| 4 | Find Your Polling Booth | Gold |
| 5 | Gather Your Documents | Saffron |
| 6 | Vote! | India Green |

**Interactions:**
- Click any step card to mark it as **completed** (green border + ✓ icon).
- Each completed step earns **+15 XP**.
- Completing step 1 unlocks the **"First Step" achievement**.
- Completing all 6 steps unlocks the **"All Steps Done" achievement**.
- Steps re-render in the active language when the language is changed.

---

### ✅ 3. Eligibility Checker

A short 4-question form that determines whether a user is eligible to vote in India.

**Questions asked:**
1. **Age** — numeric input (must be ≥ 18)
2. **Indian Citizen?** — Yes / No dropdown
3. **Permanent residence in India?** — Yes / No dropdown
4. **Registered voter?** — Yes / No / Not sure dropdown

**Outcomes:**
- ✅ **Eligible** — Shows a green result box. Dynamically appends guidance based on registration status:
  - Not registered → link to `voters.eci.gov.in` and Form 6 instructions
  - Not sure → link to check registration status
  - Already registered → redirects to Steps tab
- ❌ **Not Eligible** — Shows a red result box listing each specific reason (underage, non-citizen, non-resident).

Completing the eligibility check earns **+20 XP** and unlocks the **"Eligibility Checked" achievement**.

---

### 📄 4. Documents to Carry

An interactive checklist of all **12 photo ID documents** accepted at Indian polling booths.

| Icon | Document |
|------|----------|
| 🪪 | Voter ID Card (EPIC) — **Primary** |
| 🛂 | Passport |
| 🚗 | Driving Licence |
| 🏛️ | Aadhaar Card / Letter |
| 🏢 | Service ID (Govt. employees) |
| 🏦 | Bank Passbook with Photo |
| 💳 | PAN Card |
| 🎓 | Student ID (Recognised University) |
| 🏠 | MNREGA Job Card |
| 📋 | Health Insurance Smart Card |
| 👨‍⚖️ | Pension Documents with Photo |
| 📮 | Official Documents (MP/MLA) |

**Interactions:**
- Tap any card to toggle it as **checked** (green border + ✓).
- The EPIC card is flagged with a **"PRIMARY"** label.
- Checking the first document earns **+5 XP** and unlocks **"Docs Ready" achievement**.
- A reminder banner at the bottom notes that only **one** document is needed.

---

### 📍 5. Find Polling Booth

A visual map interface that displays nearby polling centres.

**Components:**
- **Search bar** — Enter locality, district, or pincode.
- **My Location button** — Simulates geolocation detection with a 1.2-second loading animation.
- **Illustrated map** — A CSS-rendered grid map with road lines and 4 colour-coded polling booth markers (saffron, green, navy, gold) plus a pulsing blue "You are here" marker.
- **Booth list** — 4 sample polling centres with name, address, opening hours, and distance badge.

A green info banner at the bottom links users to `voters.eci.gov.in` and the **1950** voter helpline for live data.

> **Note:** The map is a static illustration. To integrate live data, replace the `BOOTHS` array and map markers in `app.js` with a Google Maps API or ECI API integration.

---

### 📅 6. Election Timeline

A vertical timeline showing the **7 key milestones** of an Indian election cycle:

1. Election Announcement (MCC comes into effect)
2. Voter Registration Deadline
3. Nomination of Candidates
4. Last Date to Withdraw
5. Campaign Period (48-hour silence rule)
6. 🗳️ Voting Day! (7 AM – 6 PM)
7. Counting & Results

Each event is colour-coded (saffron → green → navy → gold) and rendered as a card with date label, title, and a detailed description. Cards animate with a slide-right effect on hover.

---

### 📖 7. Glossary

A searchable, audio-enabled glossary of **10 key election terms**, each with translations in Hindi and Bengali.

| Term | Hindi | Bengali |
|------|-------|---------|
| EVM | ईवीएम | ইভিএম |
| VVPAT | वीवीपैट | ভিভিপ্যাট |
| EPIC / Voter ID | मतदाता पहचान पत्र | ভোটার আইডি কার্ড |
| Model Code of Conduct | आदर्श आचार संहिता | আদর্শ আচরণ বিধি |
| Returning Officer | रिटर्निंग अधिकारी | রিটার্নিং অফিসার |
| Constituency | निर्वाचन क्षेत्र | নির্বাচনী এলাকা |
| Electoral Roll | मतदाता सूची | ভোটার তালিকা |
| Booth Level Officer (BLO) | बूथ स्तर अधिकारी | বুথ স্তরের আধিকারিক |
| NOTA | नोटा | নোটা |
| Lok Sabha | लोक सभा | লোকসভা |

**Interactions:**
- **Search bar** — Filters terms in real time by word or definition text.
- **Tap a card** — Expands/collapses the full definition.
- **🔊 Speak button** — Uses the Web Speech API to read the term and definition aloud (`lang: en-IN`, `rate: 0.9`). Clicking again cancels playback.
- Listening to 3 terms earns **+3 XP each** and unlocks the **"Glossary Fan" achievement**.

---

### 🎬 8. Visual Tour

An animated, 6-step carousel walkthrough of what happens on election day.

| Step | Emoji | Title |
|------|-------|-------|
| 1 | 🌅 | Election Day Begins |
| 2 | 🪪 | Show Your ID |
| 3 | 🖊️ | Ink on Your Finger |
| 4 | 🗳️ | Cast Your Vote |
| 5 | 📋 | VVPAT Verification |
| 6 | 🎉 | Voting Complete! |

**Interactions:**
- Large floating emoji animates with a CSS `float` keyframe on a dark gradient stage.
- Title and subtitle overlay the stage. Body text appears below.
- **Previous / Next buttons** navigate between steps.
- **Dot indicators** show current position (active dot stretches to a pill shape).
- Each step navigated earns **+5 XP**.
- Reaching step 6 unlocks the **"Tour Guide" achievement**.

---

### 🧠 9. Quiz

A 10-question multiple-choice quiz testing knowledge of Indian elections.

**Questions cover:**
- Minimum voting age
- EVM full form
- NOTA meaning
- Number of Lok Sabha seats
- Primary voter ID document
- VVPAT slip visibility duration
- Model Code of Conduct authority
- Voter helpline number
- Who conducts Indian elections
- Type of ink used in voting

**How it works:**
- Questions are shown one at a time with a progress dot bar at the top.
- 4 answer options per question in a 2×2 grid (1 column on mobile).
- On selection, options are immediately **disabled** and colour-coded:
  - 🟢 Correct answer → green
  - 🔴 Wrong selection → red
- After 1.4 seconds, the next question loads automatically.
- Wrong answers trigger a toast notification revealing the correct answer.
- Each correct answer earns **+10 or +15 XP** depending on difficulty.

**Results screen:**
- Medal: 🥇 (100%) / 🥈 (≥70%) / 🥉 (below 70%)
- Score display with animated XP bar.
- Perfect score unlocks **"Perfect Score" achievement**.
- Finishing the quiz unlocks **"Quiz Taker" achievement**.
- **Retake Quiz** button resets all answers and score.

###  10.Chatbot

To interact with Ask anything about elections in 9 
Indian languages (Hindi, Bengali, Tamil, Telugu, Marathi, 
Gujarati, Kannada, Urdu, English) and get instant, accurate answers

---

## Project Structure

```
votewise/
│
├── index.html              # Main HTML file — all page structure and content
│
├── css/
│   └── styles.css          # All styles, CSS custom properties, animations
│
├── js/
│   └── app.js              # All JavaScript — state, data, logic, rendering
│
└── README.md               # This file
```

---

## File Breakdown

### `index.html`
- Declares the document structure and all 9 tab sections.
- Imports Google Fonts (Baloo 2, Tiro Devanagari Hindi, Noto Sans Bengali).
- Links `css/styles.css` in `<head>` and `js/app.js` at end of `<body>`.
- Contains all multilingual static text (English / Hindi / Bengali) using CSS class toggling (`english-text`, `hindi-text`, `bengali-text`).
- Dynamic content areas (steps, documents, glossary, quiz, timeline, tour, achievements) are left as empty containers and populated by JavaScript on `DOMContentLoaded`.

### `css/styles.css`
- Defines all **CSS custom properties** (design tokens) in `:root`.
- Organised into labelled sections: Hero, Nav Tabs, Cards, Dashboard, Steps, Glossary, Eligibility, Map, Timeline, Documents, Quiz, Visual Tour, Section Headers, Language Display, Toast, Utilities.
- Uses `clamp()` for fluid typography and `@media (max-width: 600px)` for mobile responsiveness.
- Contains 5 CSS keyframe animations: `spin`, `pulse`, `float`, `slideUp`, and hover transitions.

### `js/app.js`
- Single global `state` object tracks all user progress in memory.
- Organised into labelled sections: State, Language, Tabs, XP, Achievements, Steps, Eligibility, Documents, Booths, Timeline, Glossary, Visual Tour, Quiz, Facts, Init.
- All data (`STEPS`, `DOCS`, `BOOTHS`, `TIMELINE_EVENTS`, `GLOSSARY_TERMS`, `QUIZ_Q`, `TOUR_STEPS`, `FACTS`, `ACHIEVEMENTS`) is defined as JavaScript arrays/objects — easy to edit without touching HTML.
- All rendering functions generate HTML strings and inject via `innerHTML`.
- `DOMContentLoaded` listener calls all `render*()` and `init*()` functions on page load.

---

## Gamification System

The app uses a lightweight XP + achievement system to reward civic learning.

### XP Actions

| Action | XP Earned |
|--------|-----------|
| Visit a new section/tab | +10 XP |
| Complete a voting step | +15 XP |
| Check eligibility | +20 XP |
| Check off a document | +5 XP |
| Search for booths | +5 XP |
| Use My Location | +5 XP |
| Navigate a tour step | +5 XP |
| Listen to a glossary term | +3 XP |
| Change language | +5 XP |
| Answer a quiz question correctly | +10 or +15 XP |
| Unlock an achievement | +20 XP |

Every **100 XP** advances the user one level. The XP bar in the dashboard animates smoothly with a cubic-bezier spring effect.

### Achievements

| Badge | ID | Icon | Unlock Condition |
|-------|----|------|-----------------|
| First Step | `first_step` | 👣 | Complete any one voting step |
| All Steps Done | `all_steps` | 🏁 | Complete all 6 voting steps |
| Eligibility Checked | `eligible` | ✅ | Submit the eligibility form (eligible result) |
| Docs Ready | `docs_ready` | 📄 | Check off at least one document |
| Quiz Taker | `quiz_start` | 🧠 | Finish the quiz |
| Perfect Score | `quiz_perfect` | 🥇 | Score 100% in the quiz |
| Glossary Fan | `glossary_fan` | 📖 | Listen to 3 terms via text-to-speech |
| Tour Guide | `tour_complete` | 🎬 | Reach the final step of the Visual Tour |

---

## Multilingual Support

Language switching is handled entirely via CSS class toggling on `<body>` — no content duplication or re-renders needed for static text.

### Supported Languages

| Code | Language | Script |
|------|----------|--------|
| `en` | English | Latin |
| `hi` | Hindi | Devanagari |
| `bn` | Bengali | Bengali |

> Tamil, Telugu, and Marathi buttons are present in the UI but currently fall back to English. Their data strings can be added to the `STEPS` objects and HTML markup to fully support them.

---

## Tech Stack

| Technology | Usage |
|------------|-------|
| **HTML5** | Page structure, semantic markup |
| **CSS3** | Styling, animations, responsive layout, CSS custom properties |
| **Vanilla JavaScript (ES6+)** | State management, DOM rendering, event handling |
| **Google Fonts** | Baloo 2 (main), Tiro Devanagari Hindi, Noto Sans Bengali |
| **Web Speech API** | Text-to-speech in the glossary (browser native, no API key needed) |

No npm, no bundler, no framework, no CDN scripts — just the three files and Google Fonts.

---

## Design System

The entire visual language is defined via CSS custom properties in `:root` in `styles.css`.

### Colour Palette (Indian Flag Inspired)

| Variable | Hex | Usage |
|----------|-----|-------|
| `--saffron` | `#FF671F` | Primary actions, active states, CTAs |
| `--saffron-light` | `#FF8C4B` | Hover states |
| `--saffron-pale` | `#FFF0E8` | Backgrounds, selected cards |
| `--india-green` | `#046A38` | Success states, completed steps |
| `--india-green-pale` | `#E8F5EE` | Success backgrounds |
| `--navy` | `#06038D` | Hero gradient, nav shadows, glossary terms |
| `--gold` | `#E9A800` | Achievements, XP bar, highlight borders |
| `--gold-pale` | `#FFFBEB` | Warning / info backgrounds |

### Typography

| Variable | Font | Used For |
|----------|------|----------|
| `--font-main` | Baloo 2 | All UI text, buttons, labels |
| `--font-hindi` | Tiro Devanagari Hindi | Hindi script text |
| `--font-bengali` | Noto Sans Bengali | Bengali script text |

### Shadows

| Variable | Usage |
|----------|-------|
| `--shadow-sm` | Cards, term items |
| `--shadow-md` | Hover states |
| `--shadow-lg` | Floating elements |
| `--shadow-3d` | Primary cards (with inset highlight for depth) |

### Border Radius

| Variable | Value | Usage |
|----------|-------|-------|
| `--radius-sm` | 8px | Small elements |
| `--radius-md` | 12px | Buttons, inputs, small cards |
| `--radius-lg` | 20px | Section cards, list items |
| `--radius-xl` | 28px | Primary feature cards |
| `--radius-pill` | 999px | Tags, badges, language buttons |

VoteWise India is a lightweight yet feature-rich civic education tool built entirely with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies, no backend. What started as a single monolithic HTML file has been refactored into a clean, maintainable three-file project ready for local development and GitHub deployment.
The app covers the full voter journey — from eligibility checking and document preparation to understanding EVMs, locating polling booths, and testing civic knowledge — wrapped in a gamified experience designed to make democratic participation feel approachable rather than bureaucratic.
A few things make it stand out architecturally:

Zero build complexity. Open index.html and it works. No npm install, no webpack, no config files.
All data is editable without touching HTML. Every quiz question, glossary term, step, and fact lives in plain JavaScript arrays in app.js — easy to update for any election cycle.
The multilingual system is CSS-native. Switching between English, Hindi, and Bengali is a single class swap on <body> — no re-renders, no framework needed.
Gamification is purely in-memory. The XP and achievement system is intentionally simple — a single state object — making it trivial to extend with localStorage persistence later.

The natural next steps for the project would be integrating the ECI's live API for real booth data, adding localStorage to persist progress across sessions, expanding language support to Tamil, Telugu, and Marathi, and converting it into a PWA for offline access — especially important for voters in areas with unreliable connectivity.
At its core, VoteWise India is a demonstration that civic tech doesn't need to be complicated. A well-structured static site, thoughtfully designed, can genuinely serve millions of first-time voters who just need someone to explain the process clearly — in their language, at their pace.










