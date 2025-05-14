# 🐾 Virtual Pet Web App

This is a simple and fun web-based virtual pet game created as a final project for a computer science course. Users can feed, play with, and monitor the mood of a virtual pet through an interactive interface. The pet's stats change over time, encouraging users to check back and care for their pet regularly.

---

## 🌟 Features

- 🐶 **Central pet display** with emoji representation
- 🍖 **Feed** your pet to lower hunger
- 🎾 **Play** with your pet to increase happiness
- 🕒 **Time-based stat decay**
- 💾 **Persistent storage** using `localStorage`
- 📊 **Status viewer** showing current hunger and happiness levels

---

## 🛠 Tech Stack

- **HTML** – Page structure
- **CSS** – Styling and layout
- **JavaScript** – Core logic and interactivity
- **localStorage** – Save pet stats across sessions

---

## 🚀 How to Run

1. Ensure all project files (index.html, style.css, script.js, and images folder) are in the same directory.

2. Open a terminal and navigate to the project folder.

3. Run a local server using Python:
	python -m http.server
   
4. Open a browser and go to: http://localhost:8000


## Implemented Functionalities:
- **Pet Selection:**
	- Users can choose from three pets: Dog, Cat, or Penguin.
	- Each pet has three emotional states: happy, neutral, and sad.
	- Clicking a pet visually highlights it and prompts the user to enter a name.

- **Name Customization:**
	- Users can name their pet before starting the game.
	- The pet's name is displayed prominently during gameplay.

- **Mood-Based Sprite Display:**
	- The pet’s appearance changes based on its current mood.
	- Moods are determined by happiness and hunger values.
	- Happy pets appear cheerful, sad pets look down, and neutral is the default.
	- Hunger and Happiness Stats:
	- Hunger starts at 100 (fully fed) and decreases with activity.
	- Happiness starts at 100 (very happy) and can be increased through play.
	- Both stats are displayed at all times and adjust dynamically.

- **Interactive Buttons:**
	- Feed: Increases hunger value (up to a max of 100).
	- Play: Increases happiness and decreases hunger.
	- Reset: Clears progress and resets the game.

- **Local Storage Support:** 
	- Stats and pet name are saved across sessions using browser localStorage.
	- Users can leave and return to find their pet’s status intact.
	
- **Responsive Layout:**
	- The game is styled with CSS for a clean, friendly interface.
	- Works on desktop browsers without any additional installations.

