const { validationResult } = require("express-validator");

module.exports = {
  getErrors: (errors, param) => {
    if (errors) {
      console.log(errors);
      for (let error of errors) {
        if (error.param === param) {
          console.log("true");
          return error.msg;
        }
      }
    }
    return "";
  },
  displayDate: date => {
    const monthArr = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const day = date.getDate();
    const month = monthArr[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  }
};
