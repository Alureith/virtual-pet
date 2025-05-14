let pet = {
  hunger: 100,
  happiness: 100,
  lastUpdated: Date.now()
};

let selectedPet = localStorage.getItem("selectedPet");
let petName = localStorage.getItem("petName") || "Your Pet";

function choosePet(type, element) {
  selectedPet = type;
  localStorage.setItem("selectedPet", selectedPet);

  // Highlight selected
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

  pet = {
    hunger: 100,
    happiness: 100,
    lastUpdated: Date.now()
  };
  savePet();

  document.getElementById("start-screen").style.display = "none";
  document.getElementById("pet-interface").style.display = "block";
  document.getElementById("pet-name-title").textContent = petName;
  updateMood();
  updateStatus();
}

function updateMood() {
  let mood = "neutral";

  if (pet.happiness >= 80 && pet.hunger >= 60) {
    mood = "happy";
  } else if (pet.happiness <= 30 || pet.hunger <= 30) {
    mood = "sad";
  }

  const petImg = `images/${selectedPet}-${mood}.png`;
  document.getElementById("pet").innerHTML = `<img src="${petImg}" alt="${selectedPet} ${mood}">`;
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
  pet.hunger = Math.min(100, pet.hunger + 15); // Gain fullness
  updateMood();
  updateStatus();
  savePet();
}


function playWithPet() {
  decayStats();
  pet.happiness = Math.min(100, pet.happiness + 10); // Get happier
  pet.hunger = Math.max(0, pet.hunger - 10);         // Burn calories
  updateMood();
  updateStatus();
  savePet();
}


function updateStatus() {
  document.getElementById("status").innerText =
    `Hunger: ${pet.hunger} | Happiness: ${pet.happiness}`;
}

function savePet() {
  localStorage.setItem("petStats", JSON.stringify(pet));
}

function loadPet() {
  const saved = localStorage.getItem("petStats");
  if (saved) pet = JSON.parse(saved);
  decayStats();
  updateMood();
  updateStatus();
}

function resetGame() {
  localStorage.clear();
  pet = {
    hunger: 100,
    happiness: 100,
    lastUpdated: Date.now()
  };
  location.reload();
}

window.onload = () => {
  if (selectedPet && petName) {
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("pet-interface").style.display = "block";
    document.getElementById("pet-name-title").textContent = petName;
    updateMood();
    loadPet();
  }
};
