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
  }
};
