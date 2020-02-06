const layout = require("../layout");
const { displayDate } = require("../helpers");

module.exports = ({ routes, messages = [] }) => {
  const tableRows = routes
    .map(route => {
      return `
            <tr>
                <td>${route.name}</td>
                <td>${route.sites.length}</td>
                <td>${displayDate(new Date(route.date))}</td>
                <td><button class="button is-small">Veiw</button></td>
            </tr>

        `;
    })
    .join("");

  const table = `
        <table class="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Sites</th>
                    <th>Date Created</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
            </tbody>
        </table>
    `;
  return layout(table, messages);
};
