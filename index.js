// let accountData = [
//   {
//     id: 1,
//     email: "winterny0802@gmail.com",
//     username: "Tam",
//     password: "123",
//   },
// ];

// localStorage.setItem("account", JSON.stringify(accountData));

function checkEmail(email, password, type) {
  event.preventDefault();

  let dataUser = JSON.parse(localStorage.getItem("account"));
  console.log("🚀 ~ file: index.js:26 ~ getValue ~ dataUser:", dataUser);

  let exists = false;

  for (let i = 0; i < dataUser.length; i++) {
    if (email === dataUser[i].email) {
      if (type === "login") {
        if (password === dataUser[i].password) {
          return (exists = true);
        } else {
          return exists;
        }
      }
      return (exists = true);
    }
  }
  return exists;
}

// function checkValue () {
//     if (getValue()){
//         alert('Email already exists')
//     }
//     else {
//         alert('Email OK')
//     }
// }

let dataUser = JSON.parse(localStorage.getItem("account")); // đọc dữ liệu tài khoản dưới localStorage
function handleRegister() {
  event?.preventDefault(); // ngăn load trang web
  let valueEmail = document.getElementById("exampleInputEmail1").value;
  let valuePassword = document.getElementById("exampleInputPassword1").value;
  let valueConfPassword = document.getElementById(
    "exampleInputPassword2"
  ).value;
  if (valueEmail !== "" && valuePassword !== "") {
    if (checkEmail(valueEmail)) {
      Swal.fire({
        title: "Error!",
        text: "Email already exists",
        icon: "error",
      });
    } else {
      if (valuePassword === valueConfPassword) {
        dataUser.push({
          id: dataUser.length + 1,
          email: valueEmail,
          password: valuePassword,
        });
        localStorage.setItem("account", JSON.stringify(dataUser));
        // alert("Register success"); // ngược lại thông báo email hợp lệ

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Register success",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1500);
      } else {
        // alert("Confirm Password fail"); // ngược lại thông báo email hợp lệ
        Swal.fire({
          title: "Error!",
          text: "Confirm Password fail",
          icon: "error",
        });
      }
    }
  } else {
    // alert("Please enter your email and password");
    Swal.fire({
      title: "Warning!",
      text: "Please enter your email and password",
      icon: "warning",
    });
  }
}

function handleLogin() {
  event?.preventDefault();
  let valueEmail = document.getElementById("exampleInputEmail1-login").value;
  let valuePassword = document.getElementById(
    "exampleInputPassword1-login"
  ).value;
  if (valueEmail !== "" && valuePassword !== "") {
    if (checkEmail(valueEmail, valuePassword.toString(), "login")) {
      // alert("Login successful");
      localStorage.setItem("isLogin", "true");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login successful",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
    } else {
      Swal.fire({
        title: "Error!",
        text: "Account not found",
        icon: "error",
      });
    }
  } else {
    Swal.fire({
      title: "Warning!",
      text: "Please enter email and password",
      icon: "warning",
    });
  }
}

let data = [];
const url =
  "https://sephora.p.rapidapi.com/products/list?categoryId=cat150006&pageSize=60&currentPage=1";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "3b763d44e2mshcb391044d2f2585p1f7711jsnf8c717263f09",
    "X-RapidAPI-Host": "sephora.p.rapidapi.com",
  },
};
async function getData() {
  let htmlProduct = "";
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log("🚀 ~ getData ~ result:", result);

    for (let i = 0; i < result.products.slice(0, 30).length; i++) {
      htmlProduct += `
      <div class="card" 
      style="width: 250px; font-size: 15px; margin: 20px 10px 25px 0">
    
            <img class="card-img-top" src='${result.products[i].heroImage}'>
            <div class="card-body card-content">
              <h5 class="card-title">${result.products[i].brandName}</h5>
              <p class="card-text">
              <span class="card-description">
              Description: ${result.products[i].currentSku.imageAltText}
              </span><br>
              <span class="card-price">
              Price: ${result.products[i].currentSku.listPrice}
              </span>
              </p>
              <button class="btn btn-primary btn-buy" data-id="${result.products[i].productId}" data-Name="${result.products[i].brandName}" data-img="${result.products[i].heroImage}" data-price="${result.products[i].currentSku.listPrice}" role="button">Add to cart</button>
            </div>
    </div>
    `;
    }
    document.getElementById("product-panel").innerHTML = htmlProduct;
  } catch (error) {
    console.error(error);
  }

  document.getElementById("product-panel").innerHTML = htmlProduct;
  let addToCartButtons = document.getElementsByClassName("btn-primary");
  for (let button of addToCartButtons) {
    button.addEventListener("click", addToCart);
  }
  function addToCart(event) {
    let productId = event.target.getAttribute("data-id");
    let brandName = event.target.getAttribute("data-Name");
    let heroImage = event.target.getAttribute("data-img");
    console.log("🚀 ~ addToCart ~ heroImage:", heroImage);
    let listPrice = event.target.getAttribute("data-price");
    console.log("🚀 ~ addToCart ~ listPrice:", listPrice);
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let existingItem = cartItems.find(
      (item) => item.id === productId,
      (item) => item.name === brandName,
      (item) => item.img === heroImage,
      (item) => item.price === listPrice
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({
        id: productId,
        quantity: 1,
        name: brandName,
        img: heroImage,
        price: listPrice,
      });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Cart added successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
getData();
console.log(data);

if (localStorage.getItem("isLogin") == "true") {
  document.getElementById("login-re").style.display = "none";
  document.getElementById("logout").classList.remove("logout");
}

function logout() {
  localStorage.setItem("isLogin", false);
  window.location.reload();
}
