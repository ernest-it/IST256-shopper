<script>

function checkForm() {

    var email = document.getElementById("email").value;
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;

    if (email == "") {
        alert("Please enter an email");
        return false;
    }

    if (name == "") {
        alert("Please enter a name");
        return false;
    }

    if (age == "") {
        alert("Please enter an age");
        return false;
    }

    if (address == "") {
        alert("Please enter an address");
        return false;
    }

    if (isNaN(age)) {
        alert("Age must be a number");
        return false;
    }

    var shopper = {
        email: email,
        name: name,
        phone: phone,
        age: age,
        address: address
    };

    console.log(shopper);

    alert("Welcome!");

    return false;
}

</script>