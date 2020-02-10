const { validationResult } = require("express-validator");

const sitesRepo = require("../Repos/sitesRepo");

module.exports = {
  getErrors: (errors, param) => {
    if (errors) {
      console.log(errors);
      for (let error of errors) {
        if (error.param === param) {
          console.log("true");
          return error.msg;
        }
      }
    }
    return "";
  },
  displayDate: date => {
    const monthArr = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const day = date.getDate();
    const month = monthArr[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  },
  calcCollectionStats: site => {
    const thisYearSum = site.history.collections
      .filter(collection => {
        const colDate = new Date(collection.date);
        const todaysDate = new Date();

        return colDate.getFullYear() === todaysDate.getFullYear();
      })
      .reduce((totalValue, currentValue) => {
        return totalValue + currentValue.amount;
      }, 0);
    const allTimeSum = site.history.collections.reduce(
      (totalValue, currentValue) => {
        return totalValue + currentValue.amount;
      },
      0
    );

    return { thisYearSum, allTimeSum };
  },
  getTownList(sitesData) {
    return sitesData.reduce((resultArr, site) => {
      if (!resultArr.includes(site.address.town)) {
        resultArr.push(site.address.town);
      }
      return resultArr;
    }, []);
  },
  async getCoordList(route) {
    return await Promise.all(
      route.sites.map(async siteId => {
        const site = await sitesRepo.getOne(siteId);
        if (site.coords) {
          return `[${site.coords.longitude}, ${site.coords.latitude}]`;
        }
      })
    );
  },
  getStartCoords(route) {
    return [route.start.coords.longitude, route.start.coords.latitude];
  },
  getFinishCoords(route) {
    return [route.finish.coords.longitude, route.finish.coords.latitude];
  },
  async getMapView(route) {
    // create list of coords
    const coords = await Promise.all(
      route.sites.map(async siteId => {
        const site = await sitesRepo.getOne(siteId);
        if (site.coords) {
          return [site.coords.latitude, site.coords.longitude];
        }
      })
    );
    coords.push([route.start.coords.latitude, route.start.coords.longitude]);
    coords.push([route.finish.coords.latitude, route.finish.coords.longitude]);
    //  convert coords to floats
    coords.forEach(coord => {
      coord[0] = parseFloat(coord[0]);
      coord[1] = parseFloat(coord[1]);
    });

    // get average
    const sum = coords.reduce(
      (total, coords) => {
        console.log("total", total);
        console.log("coords", coords);
        total[0] += coords[0];
        total[1] += coords[1];
        return total;
      },
      [0, 0]
    );
    const center = [
      (sum[0] / coords.length).toFixed(6),
      (sum[1] / coords.length).toFixed(6)
    ];
    console.log("center", center);
    return center;
  },
  convertTime: time => {
    const totalmins = time / 60;
    const hours = Math.floor(totalmins / 60);
    const mins = Math.floor((totalmins / 60 - hours) * 60);
    return { hours, mins };
  },
  convertDistance: distance => {
    console.log(distance);
    return { miles: (distance / 1609).toFixed(1) };
  }
};
