const sortFunctions = require("./sortFunctions");
const filterFunctions = require("./filterFunctions");

module.exports = (sitesData, req) => {
  let tableData;
  // reset is pressed
  if (req.query.reset) {
    req.session.sort = null;
    req.session.filter = null;
  }
  // Sort is selected
  if (req.query.sort) {
    req.session.sort = req.query.sort;
    // check for filter
    if (req.session.filter) {
      tableData = sitesData
        .filter(filterFunctions[req.session.filter])
        .sort(sortFunctions[req.session.sort]);
    } else {
      tableData = sitesData.sort(sortFunctions[req.session.sort]);
    }
  }
  // Filter is selected
  if (req.query.filter) {
    req.session.filter = req.query.filter;
    // check for sort
    if (req.session.sort) {
      tableData = sitesData
        .filter(filterFunctions[req.session.filter])
        .sort(sortFunctions[req.session.sort]);
    } else {
      tableData = sitesData.filter(filterFunctions[req.session.filter]);
    }
  }
  return tableData || sitesData;
};
