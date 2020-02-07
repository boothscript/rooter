module.exports = {
  nextSortDesc: (a, b) => {
    a = a.nextCollectionDate;
    b = b.nextCollectionDate;

    if (a && b) {
      return a > b ? -1 : a < b ? 1 : 0;
    }

    return a ? -1 : 1;
  },
  nextSortAsc: (a, b) => {
    a = a.nextCollectionDate;
    b = b.nextCollectionDate;

    if (a && b) {
      return a > b ? 1 : a < b ? -1 : 0;
    }

    return a ? -1 : 1;
  },
  lastSortDesc: (a, b) => {
    a = a.lastCollectionDate;
    b = b.lastCollectionDate;

    if (a && b) {
      return a > b ? -1 : a < b ? 1 : 0;
    }

    return a ? -1 : 1;
  },
  lastSortAsc: (a, b) => {
    a = a.lastCollectionDate;
    b = b.lastCollectionDate;

    if (a && b) {
      return a > b ? 1 : a < b ? -1 : 0;
    }

    return a ? -1 : 1;
  },
  town: (a, b) => {
    a = a.address.town;
    b = b.address.town;
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  }
};
