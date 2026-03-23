// Mason: JSON product document collection and jQuery search/filter

// ---- Product Collection (JSON) ----

// productCollection is declared in jeremy-product-javascript.js
// each product in the array looks like:
// {
//   "productId": "TV001",
//   "productDescription": "55 Inch 4K Smart TV",
//   "productCategory": "Consumer Electronics",
//   "productUnit": "Each",
//   "productPrice": "499.99",
//   "productWeight": "35.00"
// }

// ---- jQuery: Search and Filter ----

$(document).ready(function() {

  // when search button is clicked
  $("#searchBtn").on("click", function() {
    let category = $("#filterCategory").val();
    let keyword = $("#searchBox").val().trim().toLowerCase();

    let filtered = [];

    // go through all products and check if they match
    for (let i = 0; i < productCollection.length; i++) {
      let p = productCollection[i];

      // category check
      if (category !== "All" && p.productCategory !== category) {
        continue;
      }

      // keyword check against id and description
      if (keyword !== "") {
        if (!p.productId.toLowerCase().includes(keyword) &&
            !p.productDescription.toLowerCase().includes(keyword)) {
          continue;
        }
      }

      filtered.push(p);
    }

    // show filtered results in the table
    let tbody = $("#productTableBody");
    tbody.empty();

    if (filtered.length === 0) {
      tbody.html('<tr><td colspan="7" class="text-center">No products found.</td></tr>');
      return;
    }

    $.each(filtered, function(i, p) {
      // find which index this product is in the main array
      let idx = productCollection.indexOf(p);
      let row = "<tr>" +
        "<td>" + p.productId + "</td>" +
        "<td>" + p.productDescription + "</td>" +
        "<td>" + p.productCategory + "</td>" +
        "<td>" + p.productUnit + "</td>" +
        "<td>$" + p.productPrice + "</td>" +
        "<td>" + p.productWeight + "</td>" +
        '<td>' +
          '<button class="btn btn-signup btn-sm" onclick="editProduct(' + idx + ')">Edit</button> ' +
          '<button class="btn btn-danger btn-sm" onclick="deleteProduct(' + idx + ')">Delete</button>' +
        '</td>' +
        "</tr>";
      tbody.append(row);
    });
  });

  // also run search when dropdown changes
  $("#filterCategory").on("change", function() {
    $("#searchBtn").click();
  });

  // search as you type
  $("#searchBox").on("keyup", function() {
    $("#searchBtn").click();
  });

});
