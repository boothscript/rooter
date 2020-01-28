module.exports = class site {
  id = "";
  boxNumber = "";
  name = "";
  address = {
    firstLine: "",
    secondLine: "",
    city: "",
    postcode: ""
  };
  contact = {
    name: "",
    number: ""
  };
  collectionFrequency = 1;
  lastCollection = "DATETIME";
  notes = "";
};
