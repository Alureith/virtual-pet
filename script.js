let pet = {
    hunger: 50,
    happiness: 50,
    lastUpdated: Date.now()
  };
  
  // Apply decay over time
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
    updateStatus("You fed your pet!");
    savePet();
  }
  
  function playWithPet() {
    decayStats();
    pet.happiness = Math.min(100, pet.happiness + 10);
    updateStatus("You played with your pet!");
    savePet();
  }
  
  function checkStatus() {
    decayStats();
    updateStatus(`Hunger: ${pet.hunger} | Happiness: ${pet.happiness}`);
  }
  
  function updateStatus(message) {
    document.getElementById("status").innerText = message;
  }
  
  function savePet() {
    localStorage.setItem("myVirtualPet", JSON.stringify(pet));
  }
  
  function loadPet() {
    const saved = localStorage.getItem("myVirtualPet");
    if (saved) {
      pet = JSON.parse(saved);
    }
    decayStats();
    checkStatus();
  }
  
  // Run on page load
  loadPet();
  