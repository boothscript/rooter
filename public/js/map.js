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

L.Routing.control({
  waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)]
}).addTo(routeMap);

// waypoints: [
//     {
//       waypoint_index: 0,
//       trips_index: 0,
//       hint:
//         "8P4Qhln_EIYpAAAAKAAAAEcAAAAIAAAAQqiVQesxwEGtvftBqF-dQCkAAAAoAAAARwAAAAgAAADupQAA6rbb_3tlDQMZt9v_ZmUNAwEALwJsQYYI",
//       distance: 4.029788915048928,
//       name: "Church Street",
//       location: [-2.378006, 51.209595]
//     },
//     {
//       waypoint_index: 1,
//       trips_index: 0,
//       hint:
//         "V70Qhse9EIZSAAAAAAAAAHEGAABCIgAAI0qSQAAAAAD_ordC3r3zQxUAAAAAAAAAnQEAAI8IAADupQAAPnvc_0EhDgN6etz_AyEOAwkA_xNsQYYI",
//       distance: 15.3185758340668,
//       name: "",
//       location: [-2.327746, 51.257665]
//     },
//     {
//       waypoint_index: 2,
//       trips_index: 0,
//       hint:
//         "YsIQhsPCEIYZAAAAEQAAABMAAABTAAAARhnNQOHPKkHVUJdAf1JYQhkAAAARAAAAEwAAAFMAAADupQAAWerc_y6MDgOw6tz_RYwOAwEADxVsQYYI",
//       distance: 6.588437145697954,
//       name: "",
//       location: [-2.299303, 51.285038]
//     }
//   ]
