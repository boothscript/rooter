const sitesRepo = require("./src/Repos/sitesRepo");

const run = async () => {
  const records = await sitesRepo.getAll();
  console.log(records);
  console.log("running");
  for (let site of records) {
    console.log(site.id);
    console.log("looking at ", site.name);
    if (site.address.postcode) {
      await sitesRepo.getCoords(site.id, site.address.postcode);
    }
  }
};

run();
