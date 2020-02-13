module.exports = (content, route, mapView, messages) => {
  // get map view

  console.log(mapView);

  const alerts = messages
    .map(alert => {
      return `
      <article class="message is-${alert.style}">
      <div class="message-header"><button class="delete"></button></div>
      <div class="message-body">
          ${alert.msg}
      </div>
  </article>
        `;
    })
    .join("");

  console.log("hello");

  return `
      <html>
          <head>

          <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.8.0/css/bulma.min.css" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" integrity="sha256-+N4/V/SbAFiW1MPBCXnfnP9QSN3+Keu+NlB+0ev/YKQ=" crossorigin="anonymous" />
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css" integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ==" crossorigin=""/>
          <link rel="stylesheet" href="/css/leaflet-routing-machine.css" />
          <link rel="stylesheet" href="/css/layout.css"/>
          <link rel="stylesheet" href="/css/main.css" />
          </head>
          <body>

              <header>
                  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
                      <div class="navbar-brand ">
                          <a class="navbar-item" href="/">
                              <b>ROOTER</b>
                          </a>
                      </div>
                  </nav>
              </header>
              <main class="section has-background-light">
                  ${content}
                  ${alerts}
              </main>
              <script src="/js/config.js"></script>
          <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew==" crossorigin=""></script>
          <script src="/js/leaflet-routing-machine.js"></script>
          <script src="/js/app.js"></script>
          <script src="/js/map.js"></script>
          <script>
              const markers = {}
              routeMap.setView([${mapView}], 10)
              const trip = ${JSON.stringify(route.routeData)}
              const waypoints = ${JSON.stringify(route.waypoints)}
              L.geoJSON(Object.assign(trip, { type: "Feature" })).addTo(routeMap);
              waypoints.forEach(waypoint => {
                  markers[waypoint.siteId] = L.marker([
                      waypoint.location[1],
                      waypoint.location[0]
                  ], {opacity:0.5}).addTo(routeMap);
              });
              

              const waypointEls = document.querySelectorAll('.waypoint')
              for (let el of waypointEls){
                  el.addEventListener("mouseenter", e => {
                      console.log(e.target.id)
                    markers[e.target.id].setOpacity(1)
                  })
                  el.addEventListener("mouseleave", e => {
                    console.log(e.target.id)
                  markers[e.target.id].setOpacity(0.5)
                })

              }
          </script>
          </body>
      </html>
  `;
};
