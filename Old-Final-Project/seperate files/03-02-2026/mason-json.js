// Mason: JSON shopper document collection, login, and shopper table

// ---- Shopper Collection (JSON) ----

let shopperCollection = [];

// ---- Registration Form Handler ----

document.getElementById("shopperForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let isValid = true;

  let email    = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value;
  let name     = document.getElementById("name").value.trim();
  let phone    = document.getElementById("phone").value.trim();
  let age      = document.getElementById("age").value.trim();
  let address  = document.getElementById("address").value.trim();

  document.getElementById("emailError").innerHTML    = "";
  document.getElementById("passwordError").innerHTML = "";
  document.getElementById("nameError").innerHTML     = "";
  document.getElementById("ageError").innerHTML      = "";
  document.getElementById("addressError").innerHTML  = "";

  if (!email || !email.includes("@")) {
    document.getElementById("emailError").innerHTML = "Valid email is required.";
    isValid = false;
  }
  if (!password) {
    document.getElementById("passwordError").innerHTML = "Password is required.";
    isValid = false;
  }
  if (!name) {
    document.getElementById("nameError").innerHTML = "Name is required.";
    isValid = false;
  }
  if (!age || isNaN(age) || age <= 0) {
    document.getElementById("ageError").innerHTML = "Valid age is required.";
    isValid = false;
  }
  if (!address) {
    document.getElementById("addressError").innerHTML = "Address is required.";
    isValid = false;
  }

  if (!isValid) return;

  let shopper = {
    shopperEmail:    email,
    shopperPassword: password,
    shopperName:     name,
    shopperPhone:    phone,
    shopperAge:      age,
    shopperAddress:  address
  };

  shopperCollection.push(shopper);

  // Mason: output the shopper collection as JSON
  let jsonEl = document.getElementById("jsonOutput");
  jsonEl.style.display = "block";
  jsonEl.textContent = JSON.stringify(shopperCollection, null, 2);

  renderTable();

  document.getElementById("shopperForm").reset();
});

// ---- Login Form Handler ----

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let email    = document.getElementById("loginEmail").value.trim();
  let password = document.getElementById("loginPassword").value;
  let msgEl    = document.getElementById("loginMessage");

  document.getElementById("loginEmailError").innerHTML    = "";
  document.getElementById("loginPasswordError").innerHTML = "";

  if (!email || !email.includes("@")) {
    document.getElementById("loginEmailError").innerHTML = "Valid email is required.";
    return;
  }
  if (!password) {
    document.getElementById("loginPasswordError").innerHTML = "Password is required.";
    return;
  }

  let match = shopperCollection.find(function(s) {
    return s.shopperEmail === email && s.shopperPassword === password;
  });

  if (match) {
    msgEl.innerHTML = '<div class="alert alert-success">Welcome back, ' + match.shopperName + '!</div>';
  } else {
    msgEl.innerHTML = '<div class="alert alert-danger">Invalid email or password.</div>';
  }

  document.getElementById("loginForm").reset();
});

// ---- Render Shoppers Table ----

function renderTable() {
  let tbody = document.getElementById("shopperTableBody");
  tbody.innerHTML = "";
  shopperCollection.forEach(function(s) {
    let tr = document.createElement("tr");
    tr.innerHTML =
      "<td>" + s.shopperName    + "</td>" +
      "<td>" + s.shopperEmail   + "</td>" +
      "<td>" + (s.shopperPhone || "—") + "</td>" +
      "<td>" + s.shopperAge     + "</td>" +
      "<td>" + s.shopperAddress + "</td>";
    tbody.appendChild(tr);
  });
}
