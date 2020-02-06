const layout = require("../layout");

module.exports = ({ route, messages = [] }) => {
  const main = `
        <div id="route-map"></div>
    
    `;

  return layout(main, messages);
};
