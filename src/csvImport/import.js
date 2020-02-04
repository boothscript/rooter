const parse = require("csv-parse");
const fs = require("fs");
const axios = require("axios");
const Repo = require("../Repos/repo");

const repo = new Repo("testing.json");

// const addCoords = async formattedSite => {
//   try {
//     const response = await axios.get(
//       `http://api.getthedata.com/postcode/${formattedSite.postcode}`
//     );

//     return {
//       formattedSite,
//       coords: {
//         longitude: response.data.data.longitude,
//         latitude: response.data.data.latitude
//       }
//     };
//   } catch {
//     return { formattedSite };
//   }
// };

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
  const data = fs.readFileSync("data.csv").toString("utf-8");
  const sites = await parseCsv(data, { columns: true });

  for (let site of sites) {
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
    console.log(initCollectionDate);
    const record = await repo.create({
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
    });
    console.log(record);
  }
};

run();

// // add lat and long
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
