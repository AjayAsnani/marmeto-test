// Function to calculate discount percentage
function calculateDiscountPercentage(originalPrice, discountedPrice) {
  const discountPercentage =
    ((originalPrice - discountedPrice) / originalPrice) * 100;

  const roundedDiscountPercentage = discountPercentage.toFixed(0);

  const discountPercentageWithSymbol = roundedDiscountPercentage + "% Off";

  return discountPercentageWithSymbol;
}

// Function to handle button clicks and fetch data based on index
function handleButtonClick(button, index) {
  const buttons = document.querySelectorAll(".categories button");
  buttons.forEach((btn) => {
    btn.style.backgroundColor = "";
    btn.style.color = "";
  });

  button.style.backgroundColor = "black";
  button.style.color = "white";

  // Fetch data
  fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data.categories[index]);
      const itemsDiv = document.querySelector(".items-div");
      const categoryItems = data.categories[index].category_products;

      itemsDiv.innerHTML = "";

      categoryItems.forEach((item) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");
        if (item.badge_text !== null) {
          const pTag = document.createElement("p");
          pTag.classList.add("tag");
          pTag.textContent = item.badge_text;
          itemDiv.appendChild(pTag);
        }

        const img = document.createElement("img");
        img.src = item.image;

        const detailsDiv = document.createElement("div");
        detailsDiv.classList.add("details");

        const headingDiv = document.createElement("div");
        headingDiv.classList.add("heading");
        const headingH3 = document.createElement("h3");
        headingH3.innerHTML = `${item.title}&nbsp.  <span>${item.vendor}</span>`;

        const priceDiv = document.createElement("div");
        priceDiv.classList.add("price");
        priceDiv.innerHTML = `Rs ${item.price} <del>${
          item.compare_at_price
        }</del><span>${calculateDiscountPercentage(
          item.compare_at_price,
          item.price
        )}</span>`;

        const cartButton = document.createElement("button");
        cartButton.classList.add("cart");
        cartButton.textContent = "Add to cart";

        headingDiv.appendChild(headingH3);
        detailsDiv.appendChild(headingDiv);
        detailsDiv.appendChild(priceDiv);
        detailsDiv.appendChild(cartButton);
        itemDiv.appendChild(img);
        itemDiv.appendChild(detailsDiv);
        itemsDiv.appendChild(itemDiv);
      });
    })
    .catch((err) => console.log(err));
}

const menButton = document.getElementById("men");
const womenButton = document.getElementById("women");
const kidsButton = document.getElementById("kids");

menButton.addEventListener("click", function () {
  handleButtonClick(menButton, 0);
});

womenButton.addEventListener("click", function () {
  handleButtonClick(womenButton, 1);
});

kidsButton.addEventListener("click", function () {
  handleButtonClick(kidsButton, 2);
});

menButton.click();
