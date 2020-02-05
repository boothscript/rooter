const express = require("express");
const { validationResult } = require("express-validator");

const sitesRepo = require("../Repos/sitesRepo");
const { addCollectionDates } = require("./helperFunctions/siteDataProcessor");
const sortFunctions = require("./helperFunctions/sortFunctions");
const filterFunctions = require("./helperFunctions/filterFunctions");
const indexTemplate = require("../views/sites/index.js");
const addTemplate = require("../views/sites/add");
const detailTemplate = require("../views/sites/detail");
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
  checkAmount,
  checkNotes,
  checkCollectionDate,
  checkComments
} = require("./helperFunctions/validatiors");

const router = express.Router();

router.get("/", async (req, res) => {
  let tableData;
  const sitesData = addCollectionDates(await sitesRepo.getAll());
  const totalNumOfSites = sitesData.length;
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
      tableData = sitesData.sort(sortFunction[req.session.sort]);
    }

    return res.send(
      indexTemplate({
        sitesData: tableData || sitesData,
        totalNumOfSites
      })
    );
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
  const messages = req.session.messages || [];
  req.session.messages = null;
  res.send(
    indexTemplate({
      sitesData: tableData || sitesData,
      totalNumOfSites,
      messages
    })
  );
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
    checkAmount,
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
              comment: "added to system"
            }
          ]
        }
      });
      return res.redirect("/");
    }
  }
);

router.get("/sites/:id/detail", async (req, res) => {
  const site = await sitesRepo.getOne(req.params.id);
  // add collection dates
  siteWithColDates = addCollectionDates([site]);
  res.send(detailTemplate({ site: siteWithColDates[0] }));
});

router.post("/sites/:id/delete", async (req, res) => {
  // await sitesRepo.delete(req.params.id);
  if (!req.session.messages) {
    req.session.messages = [];
  }
  req.session.messages.push({
    msg: `Site ID ${req.params.id} has been deleted`,
    style: "danger"
  });
  res.redirect("/");
});

router.post(
  "/sites/:id/collection",
  [checkCollectionDate, checkComments, checkAmount],
  async (req, res) => {
    const { errors } = validationResult(req);
    if (errors) {
      const site = await sitesRepo.getOne(req.params.id);
      // add collection dates
      siteWithColDates = addCollectionDates([site]);
      res.send(detailTemplate({ site: siteWithColDates[0], errors }));
    }
    const record = await sitesRepo.getOne(req.params.id);
    record.history.collections.push({
      id: sitesRepo.randomId(),
      date: req.body.collectionDate,
      amount: req.body.amount,
      comment: req.body.collectionComment
    });
    await sitesRepo.update(req.params.id, { history: record.history });
    res.redirect(`/sites/${req.params.id}/detail`);
  }
);

module.exports = router;
