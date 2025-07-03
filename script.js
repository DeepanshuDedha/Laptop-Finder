const laptops = [
  {
    name: "Dell Inspiron",
    image: "https://via.placeholder.com/300x200?text=Dell+Inspiron",
    processor: "i5",
    ram: "8",
    storage: "256",
    graphics: "integrated",
    price: 49000,
    display: "15.6'' FHD",
    battery: "6 hours",
    os: "Windows 11",
    weight: "1.8 kg",
    highlight: "Great for students"
  },
  {
    name: "HP Pavilion Gaming",
    image: "https://via.placeholder.com/300x200?text=HP+Pavilion",
    processor: "i7",
    ram: "16",
    storage: "512",
    graphics: "gtx1650",
    price: 68999,
    display: "15.6'' 144Hz",
    battery: "5 hours",
    os: "Windows 11",
    weight: "2.2 kg",
    highlight: "Good for gaming and editing"
  },
  {
    name: "Lenovo Legion 5",
    image: "https://via.placeholder.com/300x200?text=Lenovo+Legion+5",
    processor: "ryzen7",
    ram: "16",
    storage: "1tb",
    graphics: "rtx3050",
    price: 78000,
    display: "16'' 120Hz",
    battery: "6.5 hours",
    os: "Windows 11",
    weight: "2.4 kg",
    highlight: "Best for ML and gamers"
  },
  {
    name: "MacBook Pro M1",
    image: "https://via.placeholder.com/300x200?text=MacBook+Pro",
    processor: "i9",
    ram: "32",
    storage: "512",
    graphics: "integrated",
    price: 120000,
    display: "13'' Retina",
    battery: "18 hours",
    os: "macOS",
    weight: "1.4 kg",
    highlight: "Top choice for creators"
  },
  {
    name: "Asus TUF A15",
    image: "https://via.placeholder.com/300x200?text=Asus+TUF",
    processor: "ryzen5",
    ram: "16",
    storage: "512",
    graphics: "radeon",
    price: 62000,
    display: "15.6'' FHD",
    battery: "7 hours",
    os: "Windows 11",
    weight: "2.3 kg",
    highlight: "Balanced performance"
  }
];

let selectedForCompare = [];

function filterLaptops() {
  const processor = document.getElementById("processor").value;
  const ram = document.getElementById("ram").value;
  const storage = document.getElementById("storage").value;
  const graphics = document.getElementById("graphics").value;
  const price = parseInt(document.getElementById("price").value);

  const results = laptops.filter(laptop => {
    return (!processor || laptop.processor === processor) &&
           (!ram || laptop.ram === ram) &&
           (!storage || laptop.storage === storage) &&
           (!graphics || laptop.graphics === graphics) &&
           (!price || laptop.price <= price);
  });

  displayResults(results);
}

function displayResults(laptops) {
  const container = document.getElementById("results");
  const compareBtn = document.getElementById("compareBtn");
  container.innerHTML = "";
  compareBtn.style.display = "none";
  selectedForCompare = [];

  if (laptops.length === 0) {
    container.innerHTML = "<p>No laptops match your criteria.</p>";
    return;
  }

  laptops.forEach((laptop, index) => {
    const card = document.createElement("div");
    card.className = "card";
    const bestDeal = laptop.price < 70000 ? "<span style='color:green;'>🔥 Best Deal</span>" : "";

    card.innerHTML = `
      <img src="${laptop.image}" alt="${laptop.name}" />
      <h3>${laptop.name} ${bestDeal}</h3>
      <p><strong>Processor:</strong> ${laptop.processor.toUpperCase()}</p>
      <p><strong>RAM:</strong> ${laptop.ram} GB</p>
      <p><strong>Storage:</strong> ${formatStorage(laptop.storage)}</p>
      <p><strong>Graphics:</strong> ${formatGraphics(laptop.graphics)}</p>
      <p><strong>Display:</strong> ${laptop.display}</p>
      <p><strong>Battery:</strong> ${laptop.battery}</p>
      <p><strong>OS:</strong> ${laptop.os}</p>
      <p><strong>Weight:</strong> ${laptop.weight}</p>
      <p><strong>Price:</strong> ₹${laptop.price.toLocaleString()}</p>
      <div class="highlight">💡 ${laptop.highlight}</div>
      <label><input type="checkbox" onchange="toggleCompare(${index})" /> Compare</label>
    `;
    container.appendChild(card);
  });
}

function toggleCompare(index) {
  const laptop = laptops[index];
  const compareBtn = document.getElementById("compareBtn");

  if (selectedForCompare.includes(laptop)) {
    selectedForCompare = selectedForCompare.filter(l => l !== laptop);
  } else {
    if (selectedForCompare.length >= 3) {
      alert("You can only compare up to 3 laptops.");
      return;
    }
    selectedForCompare.push(laptop);
  }

  compareBtn.style.display = selectedForCompare.length >= 2 ? "inline-block" : "none";
}

function compareLaptops() {
  let compareHTML = `
    <h2>🔍 Laptop Comparison</h2>
    <div class="comparison">
  `;

  selectedForCompare.forEach(laptop => {
    compareHTML += `
      <div class="card">
        <img src="${laptop.image}" alt="${laptop.name}" />
        <h3>${laptop.name}</h3>
        <p><strong>Processor:</strong> ${laptop.processor.toUpperCase()}</p>
        <p><strong>RAM:</strong> ${laptop.ram} GB</p>
        <p><strong>Storage:</strong> ${formatStorage(laptop.storage)}</p>
        <p><strong>Graphics:</strong> ${formatGraphics(laptop.graphics)}</p>
        <p><strong>Display:</strong> ${laptop.display}</p>
        <p><strong>Battery:</strong> ${laptop.battery}</p>
        <p><strong>Weight:</strong> ${laptop.weight}</p>
        <p><strong>Price:</strong> ₹${laptop.price.toLocaleString()}</p>
      </div>
    `;
  });

  compareHTML += "</div>";
  document.getElementById("results").innerHTML = compareHTML;
}

function formatStorage(code) {
  return code === "1tb" ? "1 TB HDD" : `${code} GB SSD`;
}

function formatGraphics(code) {
  switch(code) {
    case "integrated": return "Integrated";
    case "gtx1650": return "NVIDIA GTX 1650";
    case "rtx3050": return "NVIDIA RTX 3050";
    case "radeon": return "AMD Radeon";
    default: return code;
  }
}