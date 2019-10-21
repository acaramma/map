/*navigator.geolocation.getCurrentPosition(function(position) {
	var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWNhcmFtbWEiLCJhIjoiY2sxdzA1ODgxMDkxbzNucDBkNTlnbjlqdSJ9.25isL_da_uHyJGiG2Mdr6A';
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [lng, lat],
		zoom: 15
	});	

	// bottone per ritornare alla pos dell'utente
	map.addControl(new mapboxgl.GeolocateControl({
	positionOptions: {
		enableHighAccuracy: true
		},
		trackUserLocation: true
	}));

	//marker per p.v
	var teatro = [9.147715, 45.397865];	 
	var marker = new mapboxgl.Marker()
	.setLngLat(teatro)
	.addTo(map);

	//marker per p.v
	var supermercato = [9.148171, 45.399315];	 
	var marker = new mapboxgl.Marker()
	.setLngLat(supermercato)
	.addTo(map);

	//marker per p.v
	var parco = [9.144366, 45.398647];	 
	var marker = new mapboxgl.Marker()
	.setLngLat(parco)
	.addTo(map);
});*/

mapboxgl.accessToken = 'pk.eyJ1IjoiYWNhcmFtbWEiLCJhIjoiY2sxdzA1ODgxMDkxbzNucDBkNTlnbjlqdSJ9.25isL_da_uHyJGiG2Mdr6A';
var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
});	

// bottone per ritornare alla pos dell'utente
map.addControl(new mapboxgl.GeolocateControl({
positionOptions: {
	enableHighAccuracy: true
	},
	trackUserLocation: true
}));

navigator.geolocation.getCurrentPosition(position => {
  const userCoordinates = [position.coords.longitude, position.coords.latitude];
  map.addSource("user-coordinates", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: userCoordinates
      }
    }
  });
  map.addLayer({
    id: "user-coordinates",
    source: "user-coordinates",
    type: "circle"
  });
  map.flyTo({
    center: userCoordinates,
    zoom: 15
  });
  this.setState({
    resolvingLocation: false,
    userCoordinates
  });
});