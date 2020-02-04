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
}

module.exports = new SitesRepo("data/sites.json");
