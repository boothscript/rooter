document.addEventListener("DOMContentLoaded", () => {
  // NAVBAR
  const navbarBurger = document.querySelector(".navbar-burger");
  if (navbarBurger) {
    navbarBurger.addEventListener("click", e => {
      const targetId = e.target.dataset.target;
      const target = document.querySelector(`#${targetId}`);

      target.classList.toggle("is-active");
      navbarBurger.classList.toggle("is-active");
    });
  }

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
      modal.querySelectorAll(".cancel").forEach(element => {
        element.addEventListener("click", e => {
          e.preventDefault();
          modal.classList.remove("is-active");
        });
      });
    });
  }

  const editCollectionRowButtons = document.querySelectorAll("#edit-col");
  if (editCollectionRowButtons) {
    editCollectionRowButtons.forEach(button => {
      button.addEventListener("click", e => {
        console.log("clicked");
        const modalForm = document.querySelector("#edit-col-modal form");
        modalForm.action = modalForm.action + `${e.target.dataset.id}/edit`;
        document
          .querySelector("#col-del")
          .setAttribute("data-id", e.target.dataset.id);

        const inputs = modalForm.querySelectorAll("input");
        inputs.forEach(input => {
          console.log(input);
          console.log(e.target.parentNode.parentNode);
          const formField = e.target.parentNode.parentNode.querySelector(
            `td.${input.name.toLocaleLowerCase()}`
          );
          console.log(`td.${input.name.toLocaleLowerCase()}`);
          console.log(formField);
          if (input.name === "date") {
            const dateValue = new Date(formField.dataset.value);
            console.log(
              "date",
              `${dateValue.getFullYear()}-${dateValue.getMonth() +
                1}-${dateValue.getDate()}`
            );
            console.log(input);
            input.valueAsDate = dateValue;
            console.log(input);
          } else {
          }
          input.setAttribute("value", formField.dataset.value);
        });
        document.querySelector("#col-del").addEventListener("click", e => {
          const delForm = document
            .querySelector("#col-del-modal")
            .querySelector("form");
          delForm.action = delForm.action + `${e.target.dataset.id}/delete`;
        });
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
});
