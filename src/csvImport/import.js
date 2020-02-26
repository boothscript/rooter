const parse = require("csv-parse");
const fs = require("fs");
const axios = require("axios");
const Repo = require("../Repos/repo");

const repo = new Repo("fullinitdata.json");

const addCoords = async postcode => {
  try {
    const response = await axios.get(
      `http://api.getthedata.com/postcode/${postcode}`
    );

    return {
      longitude: response.data.data.longitude,
      latitude: response.data.data.latitude
    };
  } catch {
    console.log(error);
    return {};
  }
};

const parseCsv = (data, options) => {
  return new Promise((resolve, reject) => {
    parse(data, { columns: true }, (err, output) => {
      if (err) {
        reject(err);
      }
      resolve(output);
    });
  });
};

const run = async () => {
  //  read csv and parse
  const data = fs.readFileSync("all_sites.csv").toString("utf-8");
  const sites = await parseCsv(data, { columns: true });
  console.log(sites);
  for (let site of sites) {
    const { boxNumber, name, address1, address2, town, postcode, notes } = site;

    const record = await repo.create({
      boxNumber: boxNumber.replace("Box no ", "").replace(" ", ""),
      name,
      address: {
        line1: address1,
        line2: address2,
        town,
        postcode
      },
      coords: await addCoords(postcode),
      contact: {
        name: "",
        number: ""
      },
      collectionFrequency: "",
      notes,
      history: {
        collections: [
          {
            id: repo.randomId(),
            date: new Date(),
            comment: "record created"
          }
        ]
      }
    });
    console.log(record);
  }
};

run();

// add lat and long
// const sitesWithCoords = sites.map(site => {
//   const { postcode } = site;
//   getLatLong(postcode).then(coords => {
//     site.coords = coords;
//   });

//   return site;
// });
// Promise.all(sitesWithCoords).then(console.log(sitesWithCoords[1]));

// const results = sites.map(async site => {
//   const {
//     boxNumber,
//     route,
//     name,
//     address,
//     postcode,
//     contactNumber,
//     contactName,
//     collectionFrequency,
//     currentYearTotal,
//     prevCollection,
//     notes
//   } = site;

//   // date processing on prev collection
//   let initCollectionDate;
//   if (prevCollection !== "") {
//     dateText = `2-${prevCollection}`;
//     console.log(dateText);
//     initCollectionDate = new Date(dateText);
//   }

//   // get latitude and longitude
//   const coords = await getLatLong(postcode);
//   console.log(coords);
//   return {
//     boxNumber,
//     route,
//     name,
//     address: {
//       line1: address.split(",")[0],
//       line2: "",
//       town: address.split(",")[1],
//       postcode: postcode
//     },
//     coords,
//     contact: {
//       name: contactName,
//       number: contactNumber
//     },
//     collectionFrequency: parseInt(collectionFrequency),
//     initalYearTotal: currentYearTotal,
//     notes,
//     history: {
//       collections: initCollectionDate
//         ? [
//             {
//               id: repo.randomId(),
//               date: initCollectionDate
//             }
//           ]
//         : []
//     }
//   };
// });
// const result = await Promise.all(results);
// fs.writeFileSync("testing.json", JSON.stringify(result, null, 2));
