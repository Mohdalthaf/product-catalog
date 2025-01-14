document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("productList");
  const categoryFilter = document.getElementById("categoryFilter");

  // Fetch products from the JSON file
  fetch("data/products.json")
    .then((response) => response.json())
    .then((products) => {
      displayProducts(products);

      categoryFilter.addEventListener("change", () => {
        const selectedCategory = categoryFilter.value;
        const filteredProducts =
          selectedCategory === "all"
            ? products
            : products.filter(
                (product) => product.category === selectedCategory
              );
        displayProducts(filteredProducts);
      });

      initImageZoom();
    });

  // Function to display products
  function displayProducts(products) {
    productList.innerHTML = products
      .map(
        (product) => `
                      <div class="product-card">
                          <img src="${product.image}" alt="${product.name}">
                          <h2>${product.name}</h2>
                          <p>${product.description}</p>
                          <p>Price: ₹${product.price}</p>
                          <p>Category: ${product.category}</p>
                      </div>
                  `
      )
      .join("");

    initImageZoom();
  }

  // Function to add zoom functionality
  function initImageZoom() {
    const productImages = document.querySelectorAll(".product-card img");

    productImages.forEach((image) => {
      image.addEventListener("mouseenter", () => {
        image.classList.add("active");
      });

      image.addEventListener("mouseleave", () => {
        image.classList.remove("active");
      });

      image.addEventListener("touchstart", () => {
        image.classList.add("active");
      });

      image.addEventListener("touchend", () => {
        image.classList.remove("active");
      });
    });
  }
});
