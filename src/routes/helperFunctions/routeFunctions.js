const sitesRepo = require("../../Repos/sitesRepo");

module.exports = {
  extractCoords: async route => {
    const startCoords = [
      route.start.coords.longitude,
      route.start.coords.latitude
    ];
    const finishCoords = [
      route.finish.coords.longitude,
      route.finish.coords.latitude
    ];

    const siteList = [route.start];
    const siteCoordsList = await Promise.all(
      route.sites.map(async siteId => {
        const site = await sitesRepo.getOne(siteId);
        Object.assign(site, { icon: "map-marker" });
        siteList.push(site);
        if (site.coords) {
          return `${site.coords.longitude},${site.coords.latitude}`;
        }
      })
    );
    siteList.push(route.finish);

    return { startCoords, finishCoords, siteCoordsList, siteList };
  }
};
