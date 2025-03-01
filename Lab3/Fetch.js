//fetch
async function fetchProducts() {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();

    document.querySelector(".product-grid").innerHTML = data.products.map(product => `
    <div class="card">
      <img src="${product.thumbnail}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button>Add to Cart</button>
    </div>
  `).join("");
}
fetchProducts();