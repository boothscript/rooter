const layout = require("../layout");

module.exports = ({ sitesData }) => {
  const tableRows = sitesData
    .map(site => {
      return `
            <tr>
                <td><input type="checkbox" /></td>
                <td>${site.boxNumber}</td>
                <td>${site.name}</td>
                <td>${site.address.town}</td>
                <td> ${site.lastCollectionString}</td>
                <td> ${site.nextCollectionString} </td>
                <td><button class="button is-small is-secondary">View</button></td>
            </tr>
        `;
    })
    .join("");
  const table = `
        <table class="table is-striped is-fullwidth ">
            <thread >
                <tr >
                    <th><input type="checkbox" /></th>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Town</th>
                    <th>Last</th>
                    <th><abbr>Next</abbr></th>
                    <th></th>

                </tr>
            </thread>
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
                    <div class="level-left">
                    </div>
                    <div class="level-right">
                        <div class="level-item">
                            <button class="button is-primary">Add Site</button>      
                        </div>
                        <div class="level-item">
                            <button class="button is-primary"><span>Create Route</span><span class=icon is-small><i class="fas fa-plus" ></i></span></button>      
                        </div>
                    </div>
                </div>
                    <section class="level">
                        <div class="level-left">
                            <div class="level-item">
                                <p class="subtitle is-7">Showing <strong>134</strong> of <strong>134</strong> sites.</p>
                            </div>
                        </div>
                        <div class="level-right">
                            <div class="level-item">
                                <div class="dropdown">
                                    <button class="button is-small">
                                        <span>Filter By </span>
                                        <span class="icon is-small"><i class="fas fa-angle-down"></i></span>
                                    </button>
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
                        </div>
                    </section>
                    <div class="">
                        ${table}
                    </div>
                </div>
                <div class="column"></div>
            </div>

            `;

  return layout(main);
};
