navigator.geolocation.getCurrentPosition(function(position) {
	var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    mapboxgl.accessToken = config.mapboxgl.accessToken;
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [lng, lat],
		zoom: 15
	});

	map.addControl(new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		mapboxgl: mapboxgl
	}));	

	// bottone per localizzare utente
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
});