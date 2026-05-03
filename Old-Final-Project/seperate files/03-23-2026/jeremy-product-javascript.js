// Jeremy: javascript for product form validation and page behavior

// product array and edit tracker
var productCollection = [];
var editIndex = -1;

// handle add/update product submit
document.getElementById("productForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var isValid = true;

  var pid = document.getElementById("productId").value.trim();
  var desc = document.getElementById("productDesc").value.trim();
  var cat = document.getElementById("productCategory").value;
  var unit = document.getElementById("productUnit").value;
  var price = document.getElementById("productPrice").value.trim();
  var weight = document.getElementById("productWeight").value.trim();

  // clear old errors
  document.getElementById("productIdError").innerHTML = "";
  document.getElementById("productDescError").innerHTML = "";
  document.getElementById("productCategoryError").innerHTML = "";
  document.getElementById("productUnitError").innerHTML = "";
  document.getElementById("productPriceError").innerHTML = "";

  if (pid === "") {
    document.getElementById("productIdError").innerHTML = "Product ID is required.";
    isValid = false;
  }

  if (desc === "") {
    document.getElementById("productDescError").innerHTML = "Product description is required.";
    isValid = false;
  }

  if (cat === "") {
    document.getElementById("productCategoryError").innerHTML = "Please select a category.";
    isValid = false;
  }

  if (unit === "") {
    document.getElementById("productUnitError").innerHTML = "Please select a unit of measure.";
    isValid = false;
  }

  if (price === "" || isNaN(price) || price <= 0) {
    document.getElementById("productPriceError").innerHTML = "Valid price is required.";
    isValid = false;
  }

  if (isValid) {

    var product = {
      productId: pid,
      productDescription: desc,
      productCategory: cat,
      productUnit: unit,
      productPrice: price,
      productWeight: weight
    };

    if (editIndex === -1) {
      // adding new product
      productCollection.push(product);
    } else {
      // updating existing
      productCollection[editIndex] = product;
      editIndex = -1;
      document.getElementById("formTitle").innerHTML = "Add New Product";
      document.getElementById("submitBtn").innerHTML = "SAVE PRODUCT";
      document.getElementById("cancelBtn").style.display = "none";
    }

    // show the JSON
    document.getElementById("jsonOutput").style.display = "block";
    document.getElementById("jsonOutput").textContent = JSON.stringify(productCollection, null, 2);

    rebuildTable();

    document.getElementById("productForm").reset();
  }

});

// rebuild the product table
function rebuildTable() {
  var tbody = document.getElementById("productTableBody");
  tbody.innerHTML = "";

  if (productCollection.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center">No products added yet.</td></tr>';
    return;
  }

  for (var i = 0; i < productCollection.length; i++) {
    var p = productCollection[i];
    var row = document.createElement("tr");
    row.innerHTML =
      "<td>" + p.productId + "</td>" +
      "<td>" + p.productDescription + "</td>" +
      "<td>" + p.productCategory + "</td>" +
      "<td>" + p.productUnit + "</td>" +
      "<td>$" + p.productPrice + "</td>" +
      "<td>" + p.productWeight + "</td>" +
      '<td>' +
        '<button class="btn btn-signup btn-sm" onclick="editProduct(' + i + ')">Edit</button> ' +
        '<button class="btn btn-danger btn-sm" onclick="deleteProduct(' + i + ')">Delete</button>' +
      '</td>';
    tbody.appendChild(row);
  }
}

// load a product into the form for editing
function editProduct(index) {
  var p = productCollection[index];
  editIndex = index;

  document.getElementById("productId").value = p.productId;
  document.getElementById("productDesc").value = p.productDescription;
  document.getElementById("productCategory").value = p.productCategory;
  document.getElementById("productUnit").value = p.productUnit;
  document.getElementById("productPrice").value = p.productPrice;
  document.getElementById("productWeight").value = p.productWeight;

  document.getElementById("formTitle").innerHTML = "Update Product Details";
  document.getElementById("submitBtn").innerHTML = "UPDATE PRODUCT";
  document.getElementById("cancelBtn").style.display = "block";

  window.scrollTo(0, document.getElementById("productForm").offsetTop);
}

// remove a product
function deleteProduct(index) {
  productCollection.splice(index, 1);

  if (productCollection.length > 0) {
    document.getElementById("jsonOutput").textContent = JSON.stringify(productCollection, null, 2);
  } else {
    document.getElementById("jsonOutput").style.display = "none";
  }

  rebuildTable();
}

// cancel editing
function cancelEdit() {
  editIndex = -1;
  document.getElementById("productForm").reset();
  document.getElementById("formTitle").innerHTML = "Add New Product";
  document.getElementById("submitBtn").innerHTML = "SAVE PRODUCT";
  document.getElementById("cancelBtn").style.display = "none";
}
