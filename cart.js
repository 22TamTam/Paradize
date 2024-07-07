var cart = JSON.parse(localStorage.getItem("cartItems"));
let htmlCart = "";
console.log("🚀 ~ cart:", cart);
for (let i = 0; i < cart?.length; i++) {
  console.log("🚀 ~ i:", cart[i].price.split("$"));
}
// const displayCart = () => {
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];
//   let tbody = document.getElementById("tbodyGioHang");
//   tbody.innerHTML = "";
//   cart.forEach((product, index) => {
//     let row = document.createElement("tr");
//     let sttCell = document.createElement("td");
//     sttCell.innerText = index + 1;
//     let imgCell = document.createElement("td");
//     let img = document.createElement("img");
//     img.setAttribute("src", product.heroImage);
//     img.setAttribute("alt", product.brandName);
//     imgCell.appendChild(img);
//   });
// };

for (let i = 0; i < cart.length; i++) {
  htmlCart += `
  <tr>
            <td><span>${i + 1}</span></td>
            <td><img class="card-img-top" src='${cart[i].img}'></td>
            <td><span class="card-price"> ${cart[i].price}</span></td>
            <td><span class="quantity"> ${cart[i].quantity}</span></td>
            <td><h5 class="card-title">${cart[i].name}</h5></td>
            <td><span class="total-price">$ ${
              convertPriceStringToNumber(cart[i].price) * cart[i].quantity
            }</span></td></td>
            <td><button data-id="${cart[i].id}" data-name="${
    cart[i].name
  }" class = "delete-btn" role="button">Xóa</button></td>
          </tr>
`;
}

document.getElementById("tbodyGioHang").innerHTML = htmlCart;

//xóa sản phẩm khỏi giỏ hàng
let deleteItem = document.getElementsByClassName("delete-btn");
for (let button of deleteItem) {
  button.addEventListener("click", deleteItemInCart);
}
function deleteItemInCart(event) {
  let productId = event.target.getAttribute("data-id");
  let productName = event.target.getAttribute("data-name");

  Swal.fire({
    title: "Are you sure?",
    text: `Are you sure you want to delete ${productName}?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
      let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      let newCart = cartItems.filter((item) => item.id !== productId);

      localStorage.setItem("cartItems", JSON.stringify(newCart));
      window.location.reload();
    }
  });

  // if (confirm(`Are you sure you want to delete ${productName}?`)) {
  //   console.log("🚀 ~ addToCart ~ productId:", productId);
  //   let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  //   let newCart = cartItems.filter((item) => item.id !== productId);

  //   localStorage.setItem("cartItems", JSON.stringify(newCart));
  //   window.location.reload();
  // }
}

function convertPriceStringToNumber(priceString) {
  const cleanedString = priceString.replace(/\$/g, "");

  const priceParts = cleanedString.split(" - ").map(parseFloat);

  const averagePrice =
    priceParts.length > 1 ? (priceParts[0] + priceParts[1]) / 2 : priceParts[0];

  return averagePrice;
}
