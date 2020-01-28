const parse = require("csv-parse");
const fs = require("fs");

const run = async () => {
  const data = fs.readFileSync("data.csv").toString("utf-8");
  let count = 1;
  await parse(data, { columns: true }, (err, output) => {
    const result = output.map(site => {
      const {
        boxNumber,
        route,
        name,
        address,
        postcode,
        contactNumber,
        contactName,
        collectionFrequency,
        currentYearTotal,
        notes
      } = site;
      return {
        boxNumber,
        route,
        name,
        address: {
          line1: address.split(",")[0],
          line2: "",
          town: address.split(",")[1],
          postcode: postcode
        },
        contact: {
          name: contactName,
          number: contactNumber
        },
        collectionFrequency,
        initalYearTotal: currentYearTotal,
        notes
      };
    });
    console.log(result);
  });
};

run();
