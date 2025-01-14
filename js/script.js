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

      // Initialize zoom functionality after products are loaded
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

    // Reinitialize zoom functionality for the newly added images
    initImageZoom();
  }

  // Function to add zoom functionality
  function initImageZoom() {
    const productImages = document.querySelectorAll(".product-card img");

    productImages.forEach((image) => {
      // Hover effect for desktop
      image.addEventListener("mouseenter", () => {
        image.classList.add("active"); // Add zoom effect
      });

      image.addEventListener("mouseleave", () => {
        image.classList.remove("active"); // Remove zoom effect
      });

      // Touch events for mobile devices
      image.addEventListener("touchstart", () => {
        image.classList.add("active"); // Add zoom effect
      });

      image.addEventListener("touchend", () => {
        image.classList.remove("active"); // Remove zoom effect
      });
    });
  }
});
