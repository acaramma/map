navigator.geolocation.getCurrentPosition(function(position) {
	var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    mapboxgl.accessToken = config;
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

	map.on('load', function () {
		map.addLayer({
			"id": "places",
			"type": "symbol",
			"source": {
				"type": "geojson",
				"data": {
					"type": "FeatureCollection",
					"features": [{
						"type": "Feature",
						"properties": {
							"description": "<strong>Make it Mount Pleasant</strong><p>is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>",
							"icon": "marker"
						},
						"geometry": {
							"type": "Point",
							"coordinates": [9.147715, 45.397865]
						}
					}, {
						"type": "Feature",
						"properties": {
							"description": "<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a Mad Men Season Five Finale Watch Party, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>",
							"icon": "marker"
						},
						"geometry": {
							"type": "Point",
							"coordinates": [9.148171, 45.399315]
						}
					}, {
						"type": "Feature",
						"properties": {
							"description": "<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a Big Backyard Beach Bash and Wine Fest on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>",
							"icon": "marker"
						},
						"geometry": {
							"type": "Point",
							"coordinates": [9.144366, 45.398647]
						}
					}]
				}
			},
			"layout": {
				"icon-image": "{icon}-15",
				"icon-size": 2,
				"icon-allow-overlap": true
			}
		});

		map.on('click', 'places', function (e) {
			var coordinates = e.features[0].geometry.coordinates.slice();
			var description = e.features[0].properties.description;
			while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
				coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
			}	 
			new mapboxgl.Popup()
			.setLngLat(coordinates)
			.setHTML(description)
			.addTo(map);
		});

		map.on('mouseenter', 'places', function () {
			map.getCanvas().style.cursor = 'pointer';
		});

		map.on('mouseleave', 'places', function () {
			map.getCanvas().style.cursor = '';
		});
	});
});