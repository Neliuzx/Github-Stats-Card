✨ Features

🔍 GitHub API integration — fetches user data + repos in real time
🎨 Live gradient customization — 5-color gradient banner editable via color pickers
🌈 6 preset themes — sunset, ocean, forest, candy, fire, mono
🏷️ Top 3 languages detection — automatically computed from your public repos
📊 Key stats — repos, followers, total stars (calculated across all repos)
📸 One-click JPG export — download your card via html2canvas
💎 Editorial UI — clean, premium design with Inter font and multi-layer shadows

🛠️ Stack

HTML5
CSS3 (CSS variables for live theming)
Vanilla JavaScript (no framework)
html2canvas for image export
GitHub REST API

🚀 Getting Started
Prerequisites

A modern browser
Node.js (only if you want to install html2canvas via npm)

Installation
bashgit clone https://github.com/Neliuzx/github-stats-card.git
cd github-stats-card
npm install
Then open index.html in your browser, or use a live server (VS Code Live Server extension recommended).
📖 Usage

Enter a GitHub username in the input field
The card is generated with the user's avatar, name, location, top languages and stats
Open the customize panel (bottom-right) to tweak the gradient colors or pick a preset
Click Download to export your card as a JPG

📁 Project Structure
.
├── index.html
├── style.css
├── main.js          # Main logic & GitHub API calls
├── capture.js       # JPG export via html2canvas
├── customize.js     # Color customization panel
└── node_modules/
    └── html2canvas/
🎨 Design System
ElementValueFontInter (Google Fonts)Background#F6F5F8Card background#fffPrimary text#1a1a1dSecondary text#6b6b70Tag pills#F5F6FABorder radius24px (card) / 30px (buttons & inputs)
⚙️ How it works

Calls https://api.github.com/users/{username} for user data
Calls https://api.github.com/users/{username}/repos for repos and languages
Filters out forks, counts languages, sorts by frequency, returns top 3
Total stars computed via reduce on stargazers_count (no native endpoint)
Gradient colors stored as CSS variables (--color-1 to --color-5) and updated live via setProperty

⚠️ Limitations

GitHub API rate limit: 60 requests/hour without authentication
Languages are based on the repo's primary language only (not weighted by code size)

📝 License
MIT
👤 Author
Julien — @Neliuzx
Student at Normandie Web School — Bachelor Chef de Projet Digital
