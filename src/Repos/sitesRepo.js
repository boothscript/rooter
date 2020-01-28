const Repo = require("./repo");

class SitesRepo extends Repo {}

module.exports = new SitesRepo("data/sites.json");
