const fetch = require("node-fetch");

const monthToString = n => {
  const monthsShort = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "may",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
  return monthsShort[n];
};

module.exports = {
  addCollectionDates: sitesData => {
    return sitesData.map(site => {
      // add site.lastCollectionDate
      const siteCollections = site.history.collections.slice(-1);
      site.lastCollectionDate =
        siteCollections.length > 0
          ? new Date(siteCollections[0].date)
          : undefined;

      // add site.nextCollectionDate
      let nextDate;
      if (site.lastCollectionDate) {
        nextDate = new Date(site.lastCollectionDate.valueOf());
        month = site.lastCollectionDate.getMonth() + site.collectionFrequency;

        if (month > 11) {
          nextDate.setFullYear(nextDate.getFullYear() + 1);
          nextDate.setMonth(month % 12);
        } else {
          nextDate.setMonth(month);
        }
      }
      site.nextCollectionDate = nextDate || undefined;
      // add site.lastCollectionString
      if (site.lastCollectionDate) {
        site.lastCollectionString = [
          monthToString(site.lastCollectionDate.getMonth()),
          site.lastCollectionDate.getFullYear()
        ].join(" ");
      }

      // add site.nextCollectionString
      if (site.nextCollectionDate) {
        site.nextCollectionString = [
          monthToString(site.nextCollectionDate.getMonth()),
          site.nextCollectionDate.getFullYear()
        ].join(" ");
      }

      // add site.status

      //  create date 3 months ago
      const date = new Date();
      date.setMonth(date.getMonth() - 3);

      if (date < site.lastCollectionDate) {
        site.status = "success";
      }

      if (new Date() > site.nextCollectionDate) {
        site.status = "danger";
      }

      return site;
    });
  },
  getCoords: postcode => {
    console.log("in get coords");
    return fetch(
      `http://api.getthedata.com/postcode/${postcode.replace(" ", "")}`
    )
      .then(response => response.json())
      .then(jsonData => {
        if (jsonData.status === "match") {
          return {
            latitude: jsonData.data.latitude,
            longitude: jsonData.data.longitude
          };
        } else {
          return null;
        }
      });
  }
};
