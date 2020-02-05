// const datepicker = require("js-datepicker");

// SELECT ALL CHECKBOXES
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

//  DELETE MODAL TOGGLE
const delButton = document.querySelector("#del-button");
const delModal = document.querySelector("#del-modal");

delButton.addEventListener("click", () => {
  delModal.classList.add("is-active");
  delModal.querySelector(".modal-background").addEventListener("click", () => {
    delModal.classList.remove("is-active");
  });
  delModal.querySelector("#cancel-delete").addEventListener("click", () => {
    delModal.classList.remove("is-active");
  });
});
