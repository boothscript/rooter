const parse = require("csv-parse");
const fs = require("fs");
const Repo = require("../Repos/repo");

const repo = new Repo("none.json");

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
        prevCollection,
        notes
      } = site;

      // date processing on prev collection
      let initCollectionDate;
      if (prevCollection !== "") {
        dateText = `2-${prevCollection}`;
        console.log(dateText);
        initCollectionDate = new Date(dateText);
      }

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
        collectionFrequency: parseInt(collectionFrequency),
        initalYearTotal: currentYearTotal,
        notes,
        history: {
          collections: initCollectionDate
            ? [
                {
                  id: repo.randomId(),
                  date: initCollectionDate
                }
              ]
            : []
        }
      };
    });
    fs.writeFileSync("testing.json", JSON.stringify(result, null, 2));
  });
};

run();
