const routeMap = L.map("route-map").setView([51.505, -0.09], 13);
L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    accessToken: mapBoxKey
  }
).addTo(routeMap);

calculateRoutes = (start, finish, siteList) => {
  fetch(
    `http://127.0.0.1:5000/trip/v1/driving/${start};${siteList.join(
      ";"
    )};${finish}?source=first&destination=last&steps=true&geometries=geojson&annotations=true`
  )
    .then(response => response.json())
    .then(jsonData => {
      console.log(jsonData);
      L.geoJSON(Object.assign(jsonData.trips[0], { type: "Feature" })).addTo(
        routeMap
      );
      jsonData.waypoints.forEach(waypoint => {
        const marker = L.marker([
          waypoint.location[1],
          waypoint.location[0]
        ]).addTo(routeMap);
        marker.bindPopup(waypoint.name);
      });
    });
};

showRoute = (pointA, pointB, travelMethod, map) => {
  fetch(
    `http://127.0.0.1:5000/route/v1/${travelMethod}/${pointA};${pointB}?steps=true&geometries=geojson`
  )
    .then(response => response.json())
    .then(jsonData => {
      jsonData.routes.forEach(route => {
        L.geoJSON(Object.assign(route, { type: "Feature" })).addTo(map);
      });
    });
};
