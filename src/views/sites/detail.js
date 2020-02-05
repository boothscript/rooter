const layout = require("../layout");
const sitesRepo = require("../../Repos/sitesRepo");
const { displayDate, calcCollectionStats } = require("../helpers");

module.exports = ({ site, messages }) => {
  const { allTimeSum, thisYearSum } = calcCollectionStats(site);
  const tableBody = site.history.collections
    .map(row => {
      const date = displayDate(new Date(row.date));

      return `
        <tr>
            <td>${date}</td>
            <td>${row.comment}</td>
            <td>${new Intl.NumberFormat("en-GB", {
              style: "currency",
              currency: "GBP"
            }).format(row.amount)}</td>
        </tr>
    `;
    })
    .join("");
  const main = `
        <div class="level>
            <div class="level-left"></div>
            <div class="level-right">
                <div class="level-item">
                    <div>
                        <button class="button is-primary">Edit Site</button>
                    </div>
                </div>
                <div class="level-item">
                    <div>
                        <button class="button is-danger" id="del-button">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div class="columns">
            <div class="column">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title">${site.boxNumber}</p>
                    </div>
                    <div class="card-content">
                        <p class="title is-4">${site.name}</p>
                        <p class="subtitle is-6"></p>
                        <p>${site.address.line1}</p>
                        <p>${site.address.line2}</p>
                        <p>${site.address.town}</p>
                        <p>${site.address.postcode}</p>
                    </div>
                </div>
                <br>
                <div class="card">
                    <div class="card-content">
                        <div class="level">
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">Latitude</p>
                                    <p class="title is-6">${
                                      site.coords.latitude
                                    }</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">Longitude</p>
                                    <p class="title is-6">${
                                      site.coords.longitude
                                    }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title">Contact</p>
                    </div>
                    <div class="card-content">
                        <p class="title is-4">${site.contact.name}</p>
                        <p class="subtitle is-6">${site.contact.number}</p>
                    </div>
                </div>
                <br>
                <div class="card">
                    <div class="card-content">
                        <div class="level">
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">Last Collection</p>
                                    <p class="title">${
                                      site.lastCollectionString
                                    }</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">Collection Fequency</p>
                                    <p class="title">${
                                      site.collectionFrequency
                                    }</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">Collection Due</p>
                                    <p class="title">${
                                      site.nextCollectionString
                                    }</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                
            </div>
            <div class="column">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title">Notes</p>
                    </div>
                    <div class="card-content">
                        <p >${site.notes}</p>
                    </div>
                </div>
                <br>
                <div class="card">
                    <div class="card-content">
                        <div class="level">
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">Collected This Year</p>
                                    <p class="title">${new Intl.NumberFormat(
                                      "en-GB",
                                      {
                                        style: "currency",
                                        currency: "GBP"
                                      }
                                    ).format(thisYearSum)}</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">Total Collected</p>
                                    <p class="title">${new Intl.NumberFormat(
                                      "en-GB",
                                      {
                                        style: "currency",
                                        currency: "GBP"
                                      }
                                    ).format(allTimeSum)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title">History</p>
                    </div>
                    <div class="card-content">
                        <table class="table is-fullwidth">
                            <thead>
                                <th>Date</th>
                                <th>Comments</th>
                                <th>Amount</th>
                            </thead>
                            <tbody>
                                ${tableBody}
                            </tbody>
                        </table>
                    </div>
                </div>
                <br>
                
            </div>
        </div>
        <div class="modal" id="del-modal">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Are you sure?<p>
                </header>
                <section class="modal-card-body">
                    <p class="has-text-danger">This action can not be undone.</p>
                </section>
                <footer class="modal-card-foot">
                    <form method="POST" action="/sites/${site.id}/delete">
                        <button class="button" id="cancel-delete">Cancel</button>
                        <button class="button is-danger">Delete</button>
                    </form>
                </footer>
            </div>
        </div>
    `;

  return layout(main, messages);
};
