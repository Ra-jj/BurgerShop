const cart = [];

document.getElementById("cart-icon").onclick = () => {
  document.querySelector(".cart").classList.add("visible");
};

document.getElementById("cart-close").onclick = () => {
  document.querySelector(".cart").classList.remove("visible");
};

document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);
    const img = button.dataset.img;
    addToCart(name, price, img);
  });
});

function addToCart(name, price, img) {
  const existing = cart.find((item) => item.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1, img });
  }
  updateCart();
}

function updateCart() {
  const content = document.querySelector(".cart-content");
  const totalEl = document.querySelector(".total-price");
  content.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <div class="cart-box">
        <img src="${item.img}" class="cart-img" alt="${item.name}" />
        <div class="cart-detail">
          <h2 class="cart-product-title">${item.name}</h2>
          <span class="cart-price">$${(item.price * item.qty).toFixed(2)}</span>
          <div class="cart-quantity">
            <button class="decrement" data-name="${item.name}">−</button>
            <span class="number">${item.qty}</span>
            <button class="increment" data-name="${item.name}">+</button>
          </div>
        </div>
      </div>
    `;
    content.appendChild(div);
    total += item.price * item.qty;
  });

  totalEl.textContent = `$${total.toFixed(2)}`;

  // Update cart item count badge
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const countEl = document.querySelector(".cart-item-count");
  if (cartCount > 0) {
    countEl.textContent = cartCount;
    countEl.style.display = "inline-block";
  } else {
    countEl.textContent = "";
    countEl.style.display = "none";
  }
}

// Event delegation for increment and decrement buttons
document.querySelector(".cart-content").addEventListener("click", (e) => {
  if (e.target.classList.contains("increment")) {
    const name = e.target.dataset.name;
    const item = cart.find((i) => i.name === name);
    if (item) item.qty += 1;
  } else if (e.target.classList.contains("decrement")) {
    const name = e.target.dataset.name;
    const item = cart.find((i) => i.name === name);
    if (item) {
      item.qty -= 1;
      if (item.qty === 0) {
        const index = cart.indexOf(item);
        cart.splice(index, 1);
      }
    }
  }
  updateCart();
});

document.getElementById("buy-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Bro your cart is empty, pls check...");
  } else {
    alert("Finally, Thanks for buying!");
    cart.length = 0; // clear the cart
    updateCart();
  }
});
