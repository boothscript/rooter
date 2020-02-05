const layout = require("../layout");
const sitesRepo = require("../../Repos/sitesRepo");
const { displayDate } = require("../helpers");

module.exports = ({ site }) => {
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
  console.log(site);
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
                        <button class="button is-danger">Delete</button>
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
                                    <p class="title is-6">${site.coords.latitude}</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">Longitude</p>
                                    <p class="title is-6">${site.coords.longitude}</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading"></p>
                                    <button class="button is-small ">Calculate Coords</button>
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
                                    <p class="title">FEB</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">Collection Fequency</p>
                                    <p class="title">${site.collectionFrequency}</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">Collection Due</p>
                                    <p class="title">AUG</p>
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
                                    <p class="title">£20.52</p>
                                </div>
                            </div>
                            <div class="level-item has-text-centered">
                                <div>
                                    <p class="heading">Total Collected</p>
                                    <p class="title">£923.08</p>
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
    
    `;

  return layout(main);
};
