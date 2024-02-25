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
      alert("Email already exists");
    } else {
      if (valuePassword === valueConfPassword) {
        dataUser.push({
          id: dataUser.length + 1,
          email: valueEmail,
          password: valuePassword,
        });
        localStorage.setItem("account", JSON.stringify(dataUser));
        alert("Register success"); // ngược lại thông báo email hợp lệ
        window.location.href = "login.html";
      } else {
        alert("Confirm Password fail"); // ngược lại thông báo email hợp lệ
      }
    }
  } else {
    alert("Please enter your email and password");
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
      alert("Login successful");
      localStorage.setItem("isLogin", "true");
      window.location.href = "index.html";

      // window.location.href = 'theBand.html'
    } else {
      alert("Account not found");
    }
  } else {
    alert("Please enter email and password");
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

    for (let i = 0; i < result.products.slice(0, 30).length; i++) {
      htmlProduct += `
      <div class="card" 
      style="width: 350px; height:350px; margin:100px 40px;font-size: 15px;">
    
            <img class="card-img-top" src='${result.products[i].heroImage}'>
            <div class="card-body">
              <h5 class="card-title">${result.products[i].brandName}</h5>
              <p class="card-text">
              <span class="card-description">
              Description: ${result.products[i].description}
              </span>
              <span class="card-price">
              Price: ${result.products[i].price}
              </span>
              </p>
              <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
    </div>
    `;
    }
    document.getElementById("product-panel").innerHTML = htmlProduct;
  } catch (error) {
    console.error(error);
  }
}
getData();
console.log(data);

if (localStorage.getItem("isLogin") == "true") {
  document.getElementById("login-re").style.display = "none";
  document.getElementById("logout").style.display = "block !important";
  console.log("🚀 ~ handleLogin ~ valueEmail:");
}
function logout() {
  localStorage.setItem("isLogin", "false");
}
