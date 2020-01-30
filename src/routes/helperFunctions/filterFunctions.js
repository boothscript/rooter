module.exports = {
  overdue: site => {
    const todaysDate = new Date();
    return todaysDate > site.nextCollectionDate;
  },
  dueThisMonth: site => {
    if (!site.nextCollectionDate) {
      return false;
    }
    const todaysDate = new Date();
    return (
      site.nextCollectionDate.getMonth() === todaysDate.getMonth() &&
      site.nextCollectionDate.getYear() === todaysDate.getYear()
    );
  },
  dueNextMonth: site => {
    if (!site.nextCollectionDate) {
      return false;
    }
    const todaysDate = new Date();
    return (
      site.nextCollectionDate.getMonth() === todaysDate.getMonth() + 1 &&
      site.nextCollectionDate.getYear() === todaysDate.getYear()
    );
  },
  collectedThisMonth: site => {
    if (!site.lastCollectionDate) {
      return false;
    }
    const todaysDate = new Date();
    return (
      site.lastCollectionDate.getMonth() === todaysDate.getMonth() &&
      site.lastCollectionDate.getYear() === todaysDate.getYear()
    );
  },
  collectedLastMonth: site => {
    if (!site.lastCollectionDate) {
      return false;
    }
    const todaysDate = new Date();
    return (
      site.lastCollectionDate.getMonth() === todaysDate.getMonth() - 1 &&
      site.lastCollectionDate.getYear() === todaysDate.getYear()
    );
  },
  noCollections: site => {
    return !site.lastCollectionDate;
  }
};
