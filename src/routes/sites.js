const express = require("express");
const { validationResult } = require("express-validator");

const sitesRepo = require("../Repos/sitesRepo");
const { addCollectionDates } = require("./helperFunctions/siteDataProcessor");
const handleTable = require("./helperFunctions/handleTableFunctions");
const indexTemplate = require("../views/sites/index.js");
const addTemplate = require("../views/sites/add");
const detailTemplate = require("../views/sites/detail");
const editTemplate = require("../views/sites/edit");
const routeMobileTemplate = require("../views/routes/mobile");
const {
  checkBoxNumber,
  checkSiteName,
  checkAddressLine1,
  checkAddressLine2,
  checkPostCode,
  checkTown,
  checkContactName,
  checkContactNumber,
  checkCollectionFrequency,
  checkAmount,
  checkNotes,
  checkCollectionDate,
  checkComments,
  adminAuth
} = require("./helperFunctions/validatiors");

const router = express.Router();

router.get("/", [adminAuth], async (req, res) => {
  console.log(req.query);
  const sitesData = addCollectionDates(await sitesRepo.getAll());
  const totalNumOfSites = sitesData.length;
  const messages = req.session.messages || [];
  req.session.messages = null;
  res.send(
    indexTemplate({
      sitesData: handleTable(sitesData, req),
      totalNumOfSites,
      messages
    })
  );
});

router.get("/sites/add", [adminAuth], (req, res) => {
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
    checkCollectionDate,
    adminAuth
  ],
  async (req, res) => {
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      res.send(addTemplate({ errors }));
    } else {
      await sitesRepo.create({
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

router.get("/sites/:id/detail", [adminAuth], async (req, res) => {
  const site = await sitesRepo.getOne(req.params.id);
  // add collection dates
  siteWithColDates = addCollectionDates([site]);
  res.send(detailTemplate({ site: siteWithColDates[0], errors: false }));
});

router.post("/sites/:id/delete", [adminAuth], async (req, res) => {
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
  [checkCollectionDate, checkComments, checkAmount, adminAuth],
  async (req, res) => {
    const { errors } = validationResult(req);
    console.log("errors at collection post", errors);
    if (errors.length > 0) {
      console.log("in error if");
      const site = await sitesRepo.getOne(req.params.id);
      // add collection dates
      siteWithColDates = addCollectionDates([site]);
      // add modal id to errors
      errors.addModal = true;
      return res.send(detailTemplate({ site: siteWithColDates[0], errors }));
    }
    const record = await sitesRepo.getOne(req.params.id);
    record.history.collections.push({
      id: sitesRepo.randomId(),
      date: req.body.date,
      amount: req.body.amount,
      comment: req.body.comment
    });
    await sitesRepo.update(req.params.id, { history: record.history });
    res.redirect(`/sites/${req.params.id}/detail`);
  }
);

router.get("/sites/:id/edit", [adminAuth], async (req, res) => {
  const site = await sitesRepo.getOne(req.params.id);
  res.send(editTemplate({ site }));
});

router.post(
  "/sites/:id/:collectionId/edit",
  [checkCollectionDate, checkComments, checkAmount, adminAuth],
  async (req, res) => {
    const { errors } = validationResult(req);
    if (errors.length > 0) {
      const site = await sitesRepo.getOne(req.params.id);
      // add collection dates
      siteWithColDates = addCollectionDates([site]);
      // add modal id to errors
      errors.editModal = true;
      return res.send(detailTemplate({ site: siteWithColDates[0], errors }));
    }
    await sitesRepo.updateCollection(
      req.params.id,
      req.params.collectionId,
      req.body
    );
    res.redirect(`/sites/${req.params.id}/detail`);
  }
);
router.post(
  "/sites/:id/:collectionId/delete",
  [adminAuth],
  async (req, res) => {
    await sitesRepo.deleteCollection(req.params.id, req.params.collectionId);

    // send message
    if (!req.session.messages) {
      req.session.messages = [];
    }
    req.session.messages.push({
      msg: `Collection ID: ${req.params.collectionId} has been deleted`,
      style: "danger"
    });
    res.redirect(`/sites/${req.params.id}/detail`);
  }
);

router.post(
  "/sites/:id/edit",
  [
    checkBoxNumber,
    checkSiteName,
    checkAddressLine1,
    checkAddressLine2,
    checkPostCode,
    checkTown,
    checkContactName,
    checkContactNumber,
    checkCollectionFrequency,
    checkNotes,
    adminAuth
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (errors.length > 0) {
      const site = await sitesRepo.getOne(req.params.id);
      return res.send(editTemplate({ site, errors }));
    } else {
      await sitesRepo.update(req.params.id, {
        boxNumber: req.body.boxNumber,
        name: req.body.siteName,
        address: {
          line1: req.body.addressLine1,
          line2: req.body.addressLine2,
          town: req.body.town,
          postcode: req.body.postCode
        },
        collectionFrequency: req.body.collectionFrequency,
        contact: {
          name: req.body.contactName,
          number: req.body.contactNumber
        },
        notes: req.body.notes
      });
      res.redirect(`/sites/${req.params.id}/detail`);
    }
  }
);

router.post("/sites/:id/addcomment", [adminAuth], async (req, res) => {
  const site = await sitesRepo.getOne(req.params.id);
  console.log(site);
  const collection = {
    id: sitesRepo.randomId(),
    date: new Date(),
    comment: req.body.comment,
    amount: null
  };
  site.history.collections.push(collection);
  await sitesRepo.update(req.params.id, { history: site.history });

  res.redirect(`/routes/${req.query.route}/mobile`);
});
module.exports = router;
