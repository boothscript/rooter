const express = require("express");

const sitesRepo = require("../Repos/sitesRepo");
const { addCollectionDates } = require("./siteDataProcessor");
const sortFunctions = require("./sortFunctions");
const filterFunctions = require("./filterFunctions");
const indexTemplate = require("../views/sites/index.js");

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

module.exports = router;
