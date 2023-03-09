var emailInput = document.getElementById("emailInput");
var passwordInput = document.getElementById("passwordInput");
var submitBtn = document.getElementById("submitBtn");

function validateFields() {
  console.log("hi");
  let inputs = document.querySelectorAll("form input");
  console.log(inputs);
  inputs.forEach((element) => {
    if (!element.value) {
      element.classList.add("error");
      element.classList.remove("success");
    } else {
      element.classList.remove("error");
      element.classList.add("success");
    }
  });
}

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  validateFields();
});
