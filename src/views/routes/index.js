const layout = require("../layout");
const { displayDate } = require("../helpers");

module.exports = ({ routes, messages = [] }) => {
  const tableRows = routes
    .map(route => {
      return `
            <tr>
                <td><i class="fas fa-${route.start.icon}"></i></td>
                <td>${route.name}</td>
                <td>${route.start.postcode.toUpperCase()}</td>
                <td>${route.finish.postcode.toUpperCase()}</td>
                <td>${route.sites.length}</td>
                <td>${displayDate(new Date(route.date))}</td>
                <td><a href="/routes/${
                  route.id
                }/detail" class="button is-small">Veiw</a></td>
            </tr>

        `;
    })
    .join("");

  const table = `
        <table class="table is-striped is-fullwidth">
            <thead>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Start</th>
                    <th>Finish</th>
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
