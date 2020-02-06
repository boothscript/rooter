const layout = require("../layout");

module.exports = ({ sitesData, totalNumOfSites, messages }) => {
  const tableRows = sitesData
    .map(site => {
      return `
            <tr>
                <td><input type="checkbox" class="row-select" /></td>
                <td>${site.boxNumber}</td>
                <td>${site.name}</td>
                <td>${site.address.town}</td>
                <td> ${site.lastCollectionString}</td>
                <td> ${site.nextCollectionString} </td>
                <td><a href="/sites/${site.id}/detail" class="button is-small is-secondary">View</a></td>
            </tr>
        `;
    })
    .join("");
  const table = `
        <table class="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th><input type="checkbox" class="select-all" /></th>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Town</th>
                    <th>Last</th>
                    <th><abbr>Next</abbr></th>
                    <th></th>

                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>
    `;

  const main = `
            <div>
                <div class="columns">
                    <div class="column"></div>
                    <div class="column is-four-fifths has-background-light">
                        <div class="level">
                            <div class="level-left"></div>
                            <div class="level-right">
                                <div class="level-item">
                                    <a href="/sites/add" class="button is-primary">Add Site</a>      
                                </div>
                                <div class="level-item">
                                    <button class="button is-primary"><span>Create Route</span><span class=icon is-small><i class="fas fa-plus" ></i></span></button>      
                                </div>
                            </div>
                        </div>
                        <section class="level">
                            <div class="level-left">
                                <div class="level-item">
                                    <p class="subtitle is-7">Showing <strong>${sitesData.length}</strong> of <strong>${totalNumOfSites}</strong> sites.</p>
                                </div>
                            </div>
                            <div class="level-right">
                                <div class="level-item">
                                    <div class="dropdown is-hoverable">
                                        <div class="dropdown-trigger">
                                            <button class="button is-small">
                                                <span>Filter By </span>
                                                <span class="icon is-small"><i class="fas fa-angle-down"></i></span>
                                            </button>
                                        </div>
                                        <div id="filterby-dropdown" class="dropdown-menu">
                                            <div class="dropdown-content">
                                                <a class="dropdown-item" href="/?filter=overdue">Collection Overdue</a>
                                                <a class="dropdown-item" href="/?filter=dueThisMonth">Due This Month</a>
                                                <a class="dropdown-item" href="/?filter=dueNextMonth">Due Next Month</a>
                                                <hr class="dropdown-divider">
                                                <a class="dropdown-item" href="/?filter=collectedLastMonth">Collected Last Month</a>
                                                <a class="dropdown-item" href="/?filter=collectedThisMonth">Collected This Month</a>
                                                <hr class="dropdown-divider">
                                                <a class="dropdown-item" href="/?filter=noCollections">No Collections</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="level-item">
                                    <div class="dropdown is-hoverable">
                                        <div class="dropdown-trigger">
                                            <button class="button is-small">
                                                <span>Sort By </span>
                                                <span class="icon is-small"><i class="fas fa-angle-down"></i></span>
                                            </button>
                                        </div>
                                        <div id="sortby-dropdown" class="dropdown-menu">
                                            <div class="dropdown-content">
                                                <a class="dropdown-item" href="/?sort=nextSortDesc">Next Collection (desc)</a>
                                                <a class="dropdown-item" href="/?sort=nextSortAsc">Next Collection (asc)</a>
                                                <hr class="dropdown-divider">
                                                <a class="dropdown-item" href="/?sort=lastSortDesc">Last Collection (desc)</a>
                                                <a class="dropdown-item" href="/?sort=lastSortAsc">Last Collection (asc)</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="level-item>
                                    <button class="button is-small"><a class="button is-small" href="/?reset=true">Reset</a></button>
                                </div>
                            </div>
                        </section>
                        <div >
                            ${table}
                        </div>
                    </div>
                    <div class="column"></div>
                </div>
            </div>

            `;

  return layout(main, messages);
};
