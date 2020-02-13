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

// CREATE ROUTE FUNCTIONALITY
const createRouteButton = document.querySelector("button.create-route");
if (createRouteButton) {
  createRouteButton.addEventListener("click", () => {
    const tableRows = document.querySelectorAll("tr");
    const selectedRows = Array.from(tableRows)
      .filter(row => {
        const select = row.querySelector(".row-select");
        return select && select.checked;
      })
      .map(row => {
        const select = row.querySelector(".row-select");
        return select.id;
      });
    document.querySelector("#site-list-input").value = selectedRows;
    document.querySelector("#create-route-modal").classList.add("is-active");
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

// MODAL JS
const modalButtons = document.querySelectorAll(".modal-button");
if (modalButtons) {
  modalButtons.forEach(button => {
    button.addEventListener("click", e => {
      console.log(e.target.id);
      document
        .querySelector(`#${e.target.id}-modal`)
        .classList.add("is-active");
    });
  });
}

const modals = document.querySelectorAll(".modal");
if (modals) {
  modals.forEach(modal => {
    modal.querySelector(".modal-background").addEventListener("click", e => {
      modal.classList.remove("is-active");
    });
    modal.querySelector(".cancel").addEventListener("click", e => {
      e.preventDefault();
      modal.classList.remove("is-active");
    });
  });
}

const addCollectionCommentButtons = document.querySelectorAll("#add-comment");
if (addCollectionCommentButtons) {
  addCollectionCommentButtons.forEach(button => {
    button.addEventListener("click", e => {
      console.log(e.target.dataset.route);
      document.querySelector(
        "#add-comment-modal form"
      ).action = `/sites/${e.target.parentNode.id}/addcomment?route=${e.target.dataset.route}`;
    });
  });
}
