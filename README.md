# Intuitive Eating Tracker 🍽️
A clean, minimalist, and privacy-first Progressive Web App (PWA) designed to help you listen to your body, tune into your internal cues, and log your mindful eating journey using the intuitive Hunger-Fullness Scale.
Built completely with vanilla web technologies, this app features zero operational tracking, no corporate bloat, and runs entirely on your local device.
👉 [**Launch the Live Web App**](https://krishnaprashanthr.github.io/IntuitiveEating/IntuitiveEating.html)
## 🌟 Key Features
* **Hunger-Fullness Dual Sliders:** Easily register your starting physical hunger cues (aiming for the 3–4 zone) and post-meal satiety (aiming for the 6–7 zone).
* **Mindfulness Tracking:** Keep tabs on behavioral habits like eating with **no distractions** and taking **intentional breaks** mid-meal.
* **Instant Dynamic Scoring:** Formulates an immediate wellness assessment from 0 to 100 based on physical zones and mindful practices.
* **Analytical Insights:**
* **Focus Area Indicator:** Auto-calculates your lowest-scoring meal over a rolling 3-week window to surface patterns needing gentle attention.
* **Interactive Weekly Charts:** High-fidelity, reactive CSS bar charts mapping your historical averages by day.
* **Trend Filtering:** Instantly filter charts and metrics by specific meal types (Breakfast, Lunch, Dinner, Snack).
* **Smart Offline Reminders:** Uses localized background Service Workers to trigger optional, loving 7 PM notifications if you haven't logged a meal yet today.
* **100% Privacy & Data Ownership:** Zero server overhead. Your inputs live entirely within your sandboxed browser environment (`LocalStorage`).
## 📱 Installation Guide
Because this application is built as a Progressive Web App, you do not need an app store. You can pin it directly to your system for a native, standalone app experience with offline capability.
### On iOS (Safari)
1. Open the [Live Tracker](https://krishnaprashanthr.github.io/IntuitiveEating/IntuitiveEating.html) in **Safari**.
2. Tap the **Share** button (the square icon with an upward arrow) in the browser toolbar.
3. Scroll down the menu and select **Add to Home Screen**.
4. Confirm by tapping **Add** in the upper-right corner.
### On Android / Desktop (Chrome or Edge)
1. Open the [Live Tracker](https://krishnaprashanthr.github.io/IntuitiveEating/IntuitiveEating.html) in **Chrome**.
2. Tap the three vertical dots (menu icon) next to the address bar.
3. Select **Install app** or **Add to Home screen**.
4. Confirm the prompt to pin it to your desktop or drawer.
## 📊 How Scoring Works
The app scores your integration with intuitive eating principles on a scale of `0` to `100`:
* **40 Points:** Fullness after eating is within the comfort zone (7).
* **30 Points:** Initial hunger falls inside the ideal warning zone (3 to 4).
* **20 Points:** Eating without screen or lifestyle distractions.
* **10 Points:** Incorporating intentional physical breaks during the meal.
*Note: The algorithm extends partial credit for near-zone metrics (2 for hunger or 8 for fullness) to prevent spreadsheet perfectionism.*
## 🔒 Portability & Local Storage
Your profile is sandbox-isolated. No email sign-ups, no tracking cookies, and no analytics databases.
* **Data Lifecycle:** Logs are preserved inside your local browser cache. Clearing your browser's history or system data for this domain will wipe your current records.
* **Backup & Migration:** Built-in **Export CSV** and **Import CSV** buttons allow you to save flat-file physical back-ups of your entire log history or shift devices whenever you want.
## ❤️ Support & Maintenance
This web application is hosted entirely on GitHub Pages as a passion project to keep the interface free, peaceful, and accessible.
If this tracker has been a helpful companion in listening to your body and you would like to support its continued upkeep or buy the developer a coffee, optional donations are incredibly welcome!
* ☕ **Buy Me a Coffee:** [https://www.buymeacoffee.com/krishr](https://www.buymeacoffee.com/krishr)

## 🛠️ Codebase Architecture
For developers interested in exploring or modifying the utility:
* `IntuitiveEating.html`: Core presentation layer containing pristine, reactive semantic HTML5, localized responsive layout structures, CSS custom properties (`--bg`, `--accent`), and procedural state management.
* `sw.js`: Background event driven service file regulating synchronous reminder triggers, randomized coaching assets, and client focus bindings.
* `site.webmanifest`: Hardware-mapping layer dictating standalone behaviors, browser coloring, and splash resolution paths.
### Local Development Setup
To boot up the environment locally:
1. Clone this repository: ```bash git clone https://github.com/Krishnaprashanthr/IntuitiveEating.git ```
2. Run a micro-server engine inside the root directory: ```bash npx serve . ```
3. Open your browser to the local port displayed.
## 📄 License
Distributed under the open-source **MIT License**. Check out `LICENSE` for more info.
