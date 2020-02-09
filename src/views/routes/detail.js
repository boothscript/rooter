const mapLayout = require("./mapLayout");

module.exports = async ({ route, messages = [] }) => {
  const main = `
        <div id="route-map"></div>
    
    `;

  return await mapLayout(main, route, messages);
};
