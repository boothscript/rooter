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

//  DELETE SITE MODAL TOGGLE
const delButton = document.querySelector("#del-button");
const delModal = document.querySelector("#del-modal");

if (delButton && delModal) {
  delButton.addEventListener("click", () => {
    delModal.classList.add("is-active");
  });
  delModal.querySelector(".modal-background").addEventListener("click", () => {
    delModal.classList.remove("is-active");
  });
  delModal.querySelector(".cancel").addEventListener("click", e => {
    e.preventDefault();
    delModal.classList.remove("is-active");
  });
}

// ADD COLLECTION MODAL TOGGLE
const addColButton = document.querySelector("#add-col-button");
const addColModal = document.querySelector("#add-col-modal");

if (addColButton && addColModal) {
  addColButton.addEventListener("click", () => {
    addColModal.classList.add("is-active");
  });
  addColModal
    .querySelector(".modal-background")
    .addEventListener("click", () => {
      addColModal.classList.remove("is-active");
    });
  addColModal.querySelector(".cancel").addEventListener("click", e => {
    e.preventDefault();
    addColModal.classList.remove("is-active");
  });
}

// CLOSE ALERT MESSAGES
const message = document.querySelector(".message");
if (message) {
  message.querySelector(".delete").addEventListener("click", () => {
    message.classList.add("is-hidden");
  });

  setTimeout(() => {
    message.classList.add("transition");
  }, 3500);
}
