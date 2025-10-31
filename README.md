# Custom-HomeTab

A customizable and aesthetic 'New Tab' replacement for your browser. This project replaces the default Google Chrome home screen with a beautiful, modern, and widget-based dashboard.

This was built as a study project and is not published on the Chrome Web Store, but you can easily build it from the source and run it locally.

<img width="1917" height="959" alt="image" src="https://github.com/user-attachments/assets/9be59475-20cd-4d83-9ab2-ac3a07daa527" />

---

## ✨ Key Features

* **🎨 Highly Customizable UI:**
    * **Wallpaper Changer:** Cycle through a collection of beautiful wallpapers.
    * **Color Themes:** Instantly change the entire color scheme. Includes **Light**, **Dark**, **Catppuccin**, **Dracula**, **Nord**, **Tokyo Night**, **Gruvbox**, **Solarized**, and many more.
    * **Backdrop Blur:** A slider to control the intensity of a "glass" blur effect over the wallpaper.

* **🧩 Widget-Based Dashboard:**
    * All widgets can be toggled on or off from the settings menu.
    * **Weather:** Shows the current temperature and conditions for your location.
    * **Date & Time:** A clean clock with multiple display formats (e.g., 12-hour, 24-hour, with seconds, date-only).
    * **Google Search Bar:** A sleek search bar with different style variants.
    * **Bookmarks:** Full CRUD (Create, Read, Update, Delete) functionality. Add, edit, and launch your favorite links.
    * **Sticky Notes:** A rich-text note editor (powered by Tiptap) to jot down quick thoughts, which are saved locally.
    * **News Feed:** An RSS feed to stay updated with the latest news.

## 🛠️ Built With

This project uses a modern and powerful tech stack:

* **Framework:** [React 18](https://reactjs.org/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
* **Global State:** [Zustand](https://github.com/pmndrs/zustand)
* **Data Fetching:** [React Query (`@tanstack/react-query`)](https://tanstack.com/query/latest)
* **Forms:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
* **Rich-Text Editor:** [Tiptap](https://tiptap.dev/)
* **API Client:** [Axios](https://axios-http.com/)

---

## 🚀 Getting Started: Installation

Since this extension is not on the Chrome Web Store, you need to build it from the source and load it as an 'unpacked extension'.

### Prerequisites

* You must have [Node.js](https://nodejs.org/) (which includes npm) installed on your machine.
* A code editor (like [VS Code](https://code.visualstudio.com/))
* [Git](https://git-scm.com/)

### Installation Steps

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/DiegoAndradeD/custom-hometab.git
    cd custom-hometab
    ```

2.  **Install dependencies:**
    This will install React, Zustand, and all other necessary packages.
    ```sh
    npm install
    ```

3.  **Build the project:**
    This is the most important step. It will create a `dist` folder with all the optimized, static files for the Chrome extension.
    ```sh
    npm run build
    ```
    You should now have a new folder in your project named `dist`.

4.  **Load the extension in Chrome:**
    * Open your Google Chrome browser.
    * Navigate to `chrome://extensions` in the address bar.
    * In the top-right corner, turn on **"Developer mode"**.
    * A new set of buttons will appear. Click on **"Load unpacked"**.
    * A file dialog will open. Navigate to your project directory and select the `dist` folder (the one created in step 3).
    * The "Custom-HomeTab" extension will now appear in your list of extensions and will be active.

5.  **Enjoy!**
    Open a new tab (Ctrl+T or Cmd+T) to see your new, custom dashboard.

## 🖥️ How to Use

Once installed, simply open a new tab to see your dashboard.

* To customize the UI, hover over the **top-left corner** to find the settings menus.
* **Image Icon:** Click this to change your wallpaper, theme, and backdrop blur.
* **Settings Icon:** Click this to toggle widgets on or off and change their variants (like the clock format or search bar style).

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.
