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
  },
  calcCollectionStats: site => {
    const thisYearSum = site.history.collections
      .filter(collection => {
        const colDate = new Date(collection.date);
        const todaysDate = new Date();

        return colDate.getFullYear() === todaysDate.getFullYear();
      })
      .reduce((totalValue, currentValue) => {
        return totalValue + currentValue.amount;
      }, 0);
    const allTimeSum = site.history.collections.reduce(
      (totalValue, currentValue) => {
        return totalValue + currentValue.amount;
      },
      0
    );

    return { thisYearSum, allTimeSum };
  }
};
