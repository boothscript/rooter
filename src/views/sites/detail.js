const layout = require("../layout");
const { getErrors, displayDate, calcCollectionStats } = require("../helpers");

module.exports = ({ site, messages, errors }) => {
  const { allTimeSum, thisYearSum } = calcCollectionStats(site);
  const tableBody = site.history.collections
    .map(row => {
      const date = displayDate(new Date(row.date));

      return `
        <tr>
            <td class="collectiondate">${date}</td>
            <td class="collectioncomment">${row.comment}</td>
            <td class="amount">${new Intl.NumberFormat("en-GB", {
              style: "currency",
              currency: "GBP"
            }).format(row.amount)}</td>
            <td><button class="is-small modal-button" id="edit-col" data-id="${
              row.id
            }">Edit</button></td>
        </tr>
    `;
    })
    .join("");
  const main = `
        <div class="level">
            <div class="level-left">
                <div class="level-item">
                    <div>
                        <button class="button is-primary modal-button" id="add-col">Add Collection</button>
                    </div>
                </div>
            </div>
            <div class="level-right">
                <div class="level-item">
                    <div>
                        <a href="/sites/${
                          site.id
                        }/edit" class="button">Edit Site</a>
                    </div>
                </div>
                <div class="level-item">
                    <div>
                        <button class="button is-danger modal-button" id="del">Delete</button>
                    </div>
                </div>
            </div>
        </div>
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
                                      site.coords ? site.coords.latitude : ""
                                    }</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">Longitude</p>
                                    <p class="title is-6">${
                                      site.coords ? site.coords.longitude : ""
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
                                <th></th>
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
                        <button class="button cancel">Cancel</button>
                        <button class="button is-danger">Delete</button>
                    </form>
                </footer>
            </div>
        </div>
        <div class="modal ${errors ? "is-active" : ""}" id="add-col-modal">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Add Collection<p>
                </header>
                <section class="modal-card-body">
                    <form method="POST" action="/sites/${site.id}/collection">
                    <div class="field">
                        <label class="label">Date</label>
                        <div class="control">
                        <input class="input" type="date" name="collectionDate">
                        <p class="help is-danger">${getErrors(
                          errors,
                          "collectionDate"
                        )}</p>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Comment</label>
                        <div class="control">
                        <input class="input" type="text" placeholder="Collection" name="collectionComment">
                        <p class="help is-danger">${getErrors(
                          errors,
                          "collectionComment"
                        )}</p>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Amount</label>
                        <div class="control">
                        <input class="input" type="currency" placeholder="£100.00" name="amount">
                        <p class="help is-danger">${getErrors(
                          errors,
                          "amount"
                        )}</p>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                        <button class="button cancel">Cancel</button>
                        <button class="button is-primary">Save</button>
                    </form>
                </footer>
            </div>
        </div>
        <div class="modal ${errors ? "is-active" : ""}" id="edit-col-modal">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Add Collection<p>
                </header>
                <section class="modal-card-body">
                    <form method="POST" action="/sites/${site.id}/">
                    <div class="field">
                        <label class="label">Date</label>
                        <div class="control">
                        <input class="input" type="date" name="collectionDate">
                        <p class="help is-danger">${getErrors(
                          errors,
                          "collectionDate"
                        )}</p>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Comment</label>
                        <div class="control">
                        <input class="input" type="text" placeholder="Collection" name="collectionComment">
                        <p class="help is-danger">${getErrors(
                          errors,
                          "collectionComment"
                        )}</p>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Amount</label>
                        <div class="control">
                        <input class="input" type="currency" placeholder="£100.00" name="amount">
                        <p class="help is-danger">${getErrors(
                          errors,
                          "amount"
                        )}</p>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                        <button class="button cancel">Cancel</button>
                        <button class="button is-primary">Save</button>
                    </form>
                </footer>
            </div>
        </div>
    `;

  return layout(main, messages);
};
