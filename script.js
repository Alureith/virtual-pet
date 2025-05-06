let pet = {
  hunger: 50,
  happiness: 50,
  lastUpdated: Date.now()
};

let selectedPet = localStorage.getItem("selectedPet");
let petName = localStorage.getItem("petName") || "Your Pet";

function choosePet(type, element) {
  selectedPet = type;
  localStorage.setItem("selectedPet", selectedPet);

  // Highlight selected card
  const allChoices = document.querySelectorAll(".pet-choice");
  allChoices.forEach(choice => choice.classList.remove("selected"));
  element.classList.add("selected");

  document.getElementById("name-entry").style.display = "block";
}

function startGame() {
  const nameInput = document.getElementById("petNameInput").value.trim();
  if (nameInput) {
    petName = nameInput;
    localStorage.setItem("petName", petName);
  } else {
    petName = "Your Pet";
  }

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("pet-interface").style.display = "block";
  document.getElementById("pet").textContent = getPetEmoji("neutral");
  document.getElementById("pet-name-title").textContent = petName;
  loadPet();
}

function getPetEmoji(mood) {
  const petEmojis = {
    dog: { happy: "🐶", sad: "😢🐶", neutral: "😐🐶" },
    cat: { happy: "😺", sad: "😿", neutral: "😐🐱" },
    rabbit: { happy: "🐰", sad: "🥺🐰", neutral: "😐🐰" }
  };
  return petEmojis[selectedPet]?.[mood] || "🐾";
}

function decayStats() {
  const now = Date.now();
  const minutesPassed = Math.floor((now - pet.lastUpdated) / 60000);
  if (minutesPassed > 0) {
    pet.hunger = Math.min(100, pet.hunger + minutesPassed * 2);
    pet.happiness = Math.max(0, pet.happiness - minutesPassed * 2);
    pet.lastUpdated = now;
    savePet();
  }
}

function feedPet() {
  decayStats();
  pet.hunger = Math.max(0, pet.hunger - 10);
  updateMood();
  updateStatus(`${petName} was fed!`);
  savePet();
}

function playWithPet() {
  decayStats();
  pet.happiness = Math.min(100, pet.happiness + 10);
  updateMood();
  updateStatus(`You played with ${petName}!`);
  savePet();
}

function checkStatus() {
  decayStats();
  updateMood();
  updateStatus(`Hunger: ${pet.hunger} | Happiness: ${pet.happiness}`);
}

function updateMood() {
  let mood = "neutral";
  if (pet.happiness >= 80 && pet.hunger <= 30) {
    mood = "happy";
  } else if (pet.happiness <= 30 || pet.hunger >= 80) {
    mood = "sad";
  }
  document.getElementById("pet").textContent = getPetEmoji(mood);
}

function updateStatus(msg) {
  document.getElementById("status").innerText = msg;
}

function savePet() {
  localStorage.setItem("petStats", JSON.stringify(pet));
}

function loadPet() {
  const saved = localStorage.getItem("petStats");
  if (saved) pet = JSON.parse(saved);
  document.getElementById("pet-name-title").textContent = petName;
  decayStats();
  updateMood();
  checkStatus();
}

function resetGame() {
  localStorage.clear();
  location.reload();
}

window.onload = () => {
  if (selectedPet && petName) {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("pet-interface").style.display = "block";
    document.getElementById("pet-name-title").textContent = petName;
    document.getElementById("pet").textContent = getPetEmoji("neutral");
    loadPet();
  }
};
