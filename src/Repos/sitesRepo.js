const axios = require("axios");

const Repo = require("./repo");

class SitesRepo extends Repo {
  async getCoords(id, postcode) {
    try {
      const response = await axios.get(
        `http://api.getthedata.com/postcode/${postcode}`
      );
      const coords = {
        longitude: response.data.data.longitude,
        latitude: response.data.data.latitude
      };
      console.log("got coords", coords);
      console.log("updating ", id);
      this.update(id, { coords });
    } catch (err) {}
  }
  async updateCollection(siteId, collectionId, updatedCollection) {
    console.log("new", updatedCollection);
    const site = await this.getOne(siteId);
    console.log("found site", site);
    let targetCollection = site.history.collections.find(
      col => col.id === collectionId
    );
    targetCollection = updatedCollection;
    targetCollection.id = collectionId;
    console.log("after collectionList", site.history);
    await this.update(siteId, { history: site.history });
  }
}

module.exports = new SitesRepo("data/sites.json");
