let products = [];
const productsPerPage = 10;
let currentPage = 1;

async function fetchProducts() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  products = data.products;

  renderProducts();
  updatePaginationControls();
}

// Render only products for current page
function renderProducts() {
  const productGrid = document.querySelector(".product-grid");
  productGrid.innerHTML = '';  // Clear current products

  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const productsToShow = products.slice(start, end);

  productsToShow.forEach(product => {
    const card = `
            <div class="card">
                <img src="${product.thumbnail}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button>Add to Cart</button>
            </div>
        `;
    productGrid.innerHTML += card;
  });
}

// Update pagination text and button state
function updatePaginationControls() {
  const totalPages = Math.ceil(products.length / productsPerPage);

  document.getElementById('page-info').textContent = `Page ${currentPage} of ${totalPages}`;

  document.getElementById('prev-page').disabled = (currentPage === 1);
  document.getElementById('next-page').disabled = (currentPage === totalPages);
}

// Attach event listeners once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderProducts();
      updatePaginationControls();
    }
  });

  document.getElementById('next-page').addEventListener('click', () => {
    const totalPages = Math.ceil(products.length / productsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      renderProducts();
      updatePaginationControls();
    }
  });

  // Initial load
  fetchProducts();
});
