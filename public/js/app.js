// SELECT ALL CHECKBOXES
const selectAllBox = document.querySelector(".select-all");
const tableSelectBoxes = document.querySelectorAll(".row-select");

selectAllBox.addEventListener("change", e => {
  tableSelectBoxes.forEach(checkbox => {
    checkbox.checked = e.target.checked;
  });
});
