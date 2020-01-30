const express = require("express");
const { validationResult } = require("express-validator");

const sitesRepo = require("../Repos/sitesRepo");
const { addCollectionDates } = require("./siteDataProcessor");
const sortFunctions = require("./sortFunctions");
const filterFunctions = require("./filterFunctions");
const indexTemplate = require("../views/sites/index.js");
const addTemplate = require("../views/sites/add");
const {
  checkBoxNumber,
  checkSiteName,
  checkAddressLine1,
  checkAddressLine2,
  checkPostCode,
  checkTown,
  checkContactName,
  checkContactNumber,
  checkCollectionFequency,
  checkPreviousCollectionAmount,
  checkNotes,
  checkCollectionDate
} = require("./validatiors");

const router = express.Router();

router.get("/", async (req, res) => {
  const sitesData = addCollectionDates(await sitesRepo.getAll());
  const totalNumOfSites = sitesData.length;
  if (req.query.sort) {
    const sortedData = sitesData.sort(sortFunctions[req.query.sort]);
    return res.send(indexTemplate({ sitesData: sortedData, totalNumOfSites }));
  }
  if (req.query.filter) {
    const filteredData = sitesData.filter(filterFunctions[req.query.filter]);
    return res.send(
      indexTemplate({ sitesData: filteredData, totalNumOfSites })
    );
  }

  res.send(indexTemplate({ sitesData, totalNumOfSites }));
});

router.get("/sites/add", (req, res) => {
  res.send(addTemplate({}));
});

router.post(
  "/sites/add",
  [
    checkBoxNumber,
    checkSiteName,
    checkAddressLine1,
    checkAddressLine2,
    checkPostCode,
    checkTown,
    checkContactName,
    checkContactNumber,
    checkCollectionFequency,
    checkPreviousCollectionAmount,
    checkNotes,
    checkCollectionDate
  ],
  (req, res) => {
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      res.send(addTemplate({ errors }));
    } else {
      sitesRepo.create({
        boxNumber: req.body.boxNumber,
        route: "",
        name: req.body.siteName,
        address: {
          line1: req.body.addressLine1,
          line2: req.body.addressLine2,
          town: req.body.town,
          postcode: req.body.postCode
        },
        contact: {
          name: req.body.contactName,
          number: req.body.contactNumber
        },
        collectionFrequency: req.body.collectionFrequency,
        initalYearTotal: req.body.previousCollectionAmount,
        notes: req.body.notes,
        history: {
          collections: [
            {
              id: sitesRepo.randomId(),
              date: req.body.collectionDate,
              amount: req.body.previousCollectionAmount,
              note: "added to system"
            }
          ]
        }
      });
      return res.redirect("/");
    }
  }
);

module.exports = router;
