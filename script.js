const bikes = [
  {name:"Classic 350", price:1.9, engine:"349cc", mileage:"35", img: "images/RE.jpg"},
  {name:"Super Mete 350", price:1.7, engine:"346cc", mileage:"38", img: "images/meteor.jpg"},
  {name:"Hunter 350", price:1.5, engine:"349cc", mileage:"36", img: "images/hunter.jpg"},
  {name:"Yamaha R15", price:1.8, engine:"155cc", mileage:"40", img: "images/R15.jpg"},
  {name:"MT 15", price:1.7, engine:"155cc", mileage:"48", img: "images/mt15.jpg"},
  {name:"Duke 390", price:3.1, engine:"373cc", mileage:"28",img: "images/duke.jpg"},
  {name:"Pulsar NS200", price:1.6, engine:"199cc", mileage:"36", img: "images/ns200.jpg"},
  {name:"Apache RTR 200", price:1.4, engine:"197cc", mileage:"38", img: "images/rtr.jpg"},
];

// duplicate to reach 30+
while (bikes.length < 32) bikes.push(...bikes.slice(0,4));

const grid = document.getElementById("bikeGrid");
const details = document.getElementById("details");
const cartModal = document.getElementById("cartModal");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const search = document.getElementById("search");
const priceFilter = document.getElementById("priceFilter");

let cart = [];

function render(list) {
  grid.innerHTML = "";
  list.forEach(b => {
    const card = document.createElement("div");
    card.className = "bike-card";
    card.innerHTML = `<img src="${b.img}"><h3>${b.name}</h3>`;
    card.onclick = () => showBike(b);
    grid.appendChild(card);
  });
}

function showBike(b) {
  details.innerHTML = `
    <img src="${b.img}">
    <h2>${b.name}</h2>
    <p>Engine: ${b.engine}</p>
    <p>Mileage: ${b.mileage} kmpl</p>
    <p>Price: ₹${b.price} Lakh</p>
    <button onclick='addToCart("${b.name}")'>Add to Cart</button>
  `;
}

function addToCart(name) {
  cart.push(name);
  cartCount.innerText = cart.length;
}

document.getElementById("viewCartBtn").onclick = () => {
  cartItems.innerHTML = cart.map(i => `<li>${i}</li>`).join("");
  cartModal.style.display = "block";
};

function closeCart() {
  cartModal.style.display = "none";
}

function applyFilters() {
  let filtered = bikes.filter(b =>
    b.name.toLowerCase().includes(search.value.toLowerCase())
  );

  const p = priceFilter.value;
  if (p !== "all") {
    filtered = filtered.filter(b =>
      p == 1 ? b.price < 1 :
      p == 2 ? b.price >=1 && b.price <=2 :
      p == 3 ? b.price >2 && b.price <=3 :
      b.price >3
    );
  }
  render(filtered);
}

search.oninput = applyFilters;
priceFilter.onchange = applyFilters;

render(bikes);
