// Jeremy: javascript for form validation and page behavior

// shopper array and edit tracker
var shopperCollection = [];
var editIndex = -1;

// handle registration/update submit
document.getElementById("shopperForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var isValid = true;

  var email = document.getElementById("email").value.trim();
  var pw = document.getElementById("password").value;
  var name = document.getElementById("name").value.trim();
  var phone = document.getElementById("phone").value.trim();
  var age = document.getElementById("age").value.trim();
  var addr = document.getElementById("address").value.trim();

  // clear out old error messages
  document.getElementById("emailError").innerHTML = "";
  document.getElementById("passwordError").innerHTML = "";
  document.getElementById("nameError").innerHTML = "";
  document.getElementById("ageError").innerHTML = "";
  document.getElementById("addressError").innerHTML = "";

  // check required fields
  if (email === "" || email.indexOf("@") === -1) {
    document.getElementById("emailError").innerHTML = "Valid email is required.";
    isValid = false;
  }

  if (pw === "") {
    document.getElementById("passwordError").innerHTML = "Password is required.";
    isValid = false;
  }

  if (name === "") {
    document.getElementById("nameError").innerHTML = "Name is required.";
    isValid = false;
  }

  if (age === "" || isNaN(age) || age <= 0) {
    document.getElementById("ageError").innerHTML = "Valid age is required.";
    isValid = false;
  }

  if (addr === "") {
    document.getElementById("addressError").innerHTML = "Address is required.";
    isValid = false;
  }

  if (isValid) {

    var shopper = {
      shopperEmail: email,
      shopperPassword: pw,
      shopperName: name,
      shopperPhone: phone,
      shopperAge: age,
      shopperAddress: addr
    };

    if (editIndex === -1) {
      // new shopper
      shopperCollection.push(shopper);
    } else {
      // updating existing one
      shopperCollection[editIndex] = shopper;
      editIndex = -1;
      document.getElementById("formTitle").innerHTML = "New Shopper Registration";
      document.getElementById("submitBtn").innerHTML = "SAVE SHOPPER";
      document.getElementById("cancelBtn").style.display = "none";
    }

    // output the shopper collection as JSON
    document.getElementById("jsonOutput").style.display = "block";
    document.getElementById("jsonOutput").textContent = JSON.stringify(shopperCollection, null, 2);

    // refresh table
    rebuildTable();

    document.getElementById("shopperForm").reset();
  }

});

// handle login submit
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var loginEmail = document.getElementById("loginEmail").value.trim();
  var loginPw = document.getElementById("loginPassword").value;

  document.getElementById("loginEmailError").innerHTML = "";
  document.getElementById("loginPasswordError").innerHTML = "";
  document.getElementById("loginMessage").innerHTML = "";

  if (loginEmail === "" || loginEmail.indexOf("@") === -1) {
    document.getElementById("loginEmailError").innerHTML = "Valid email is required.";
    return;
  }

  if (loginPw === "") {
    document.getElementById("loginPasswordError").innerHTML = "Password is required.";
    return;
  }

  // look through shoppers for a match
  var found = false;
  for (var i = 0; i < shopperCollection.length; i++) {
    if (shopperCollection[i].shopperEmail === loginEmail && shopperCollection[i].shopperPassword === loginPw) {
      found = shopperCollection[i];
      break;
    }
  }

  if (found) {
    document.getElementById("loginMessage").innerHTML =
      '<div class="alert alert-success">Welcome back, ' + found.shopperName + '!</div>';
  } else {
    document.getElementById("loginMessage").innerHTML =
      '<div class="alert alert-danger">Invalid email or password.</div>';
  }

  document.getElementById("loginForm").reset();
});

// rebuild the table with current shoppers
function rebuildTable() {
  var tbody = document.getElementById("shopperTableBody");
  tbody.innerHTML = "";

  if (shopperCollection.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center">No shoppers registered yet.</td></tr>';
    return;
  }

  for (var i = 0; i < shopperCollection.length; i++) {
    var s = shopperCollection[i];
    var row = document.createElement("tr");
    row.innerHTML =
      "<td>" + s.shopperEmail + "</td>" +
      "<td>" + s.shopperName + "</td>" +
      "<td>" + s.shopperPhone + "</td>" +
      "<td>" + s.shopperAge + "</td>" +
      "<td>" + s.shopperAddress + "</td>" +
      '<td><button class="btn btn-signup btn-sm" onclick="editShopper(' + i + ')">Edit</button></td>';
    tbody.appendChild(row);
  }
}

// fill in the form with a shoppers info so you can edit it
function editShopper(index) {
  var s = shopperCollection[index];
  editIndex = index;

  document.getElementById("email").value = s.shopperEmail;
  document.getElementById("password").value = s.shopperPassword;
  document.getElementById("name").value = s.shopperName;
  document.getElementById("phone").value = s.shopperPhone;
  document.getElementById("age").value = s.shopperAge;
  document.getElementById("address").value = s.shopperAddress;

  document.getElementById("formTitle").innerHTML = "Update Shopper Details";
  document.getElementById("submitBtn").innerHTML = "UPDATE SHOPPER";
  document.getElementById("cancelBtn").style.display = "block";

  window.scrollTo(0, document.getElementById("shopperForm").offsetTop);
}

// cancel out of editing
function cancelEdit() {
  editIndex = -1;
  document.getElementById("shopperForm").reset();
  document.getElementById("formTitle").innerHTML = "New Shopper Registration";
  document.getElementById("submitBtn").innerHTML = "SAVE SHOPPER";
  document.getElementById("cancelBtn").style.display = "none";
}
