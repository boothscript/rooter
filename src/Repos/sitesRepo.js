const Repo = require("./repo");

class SitesRepo extends Repo {}

module.exports = new SitesRepo("sites.json");
