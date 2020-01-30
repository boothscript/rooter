// SELECT ALL CHECKBOXES
// const datepicker = require("js-datepicker");

const selectAllBox = document.querySelector(".select-all");
const tableSelectBoxes = document.querySelectorAll(".row-select");

if (selectAllBox) {
  selectAllBox.addEventListener("change", e => {
    tableSelectBoxes.forEach(checkbox => {
      checkbox.checked = e.target.checked;
    });
  });
}

// FORM INPUT VALIDATION
const formFields = document.querySelectorAll("form .field");

if (formFields) {
  formFields.forEach(field => {
    if (field.querySelector("p").innerHTML !== "") {
      field.querySelector(".control input").classList.add("is-danger");
    }
  });
}

// DATE PICKER
// const picker = datepicker(".datepicker", { alwaysShow: true });
