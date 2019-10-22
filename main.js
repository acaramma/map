navigator.geolocation.getCurrentPosition(function(position) {
	var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    mapboxgl.accessToken = config;
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [lng, lat],
		zoom: 14
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
							"description": "<strong>One More Light</strong><p>Who cares if one more light goes out? In a sky of a million stars, It flickers, flickers, Who cares when someone's time runs out?, If a moment is all we are, We're quicker, quicker, Who cares if one more light goes out? Well I do.</p>",
							"icon": "marker"
						},
						"geometry": {
							"type": "Point",
							"coordinates": [9.147715, 45.397865]
						}
					}, {
						"type": "Feature",
						"properties": {
							"description": "<strong>Sharp Edges</strong><p>Sharp edges have consequences, I guess that I had to find out for myself, Sharp edges have consequences, Now every scar is a story I can tell.</p>",
							"icon": "marker"
						},
						"geometry": {
							"type": "Point",
							"coordinates": [9.148171, 45.399315]
						}
					}, {
						"type": "Feature",
						"properties": {
							"description": "<strong>Battle Symphony</strong><p>I hear my battle symphony, All the world in front of me, If my armor breaks, I'll fuse it back together, Battle symphony, Please just don't give up on me, And my eyes are wide awake.</p>",
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

		map.addSource("source_circle", {
        	"type": "geojson",
        	"data": {
          		"type": "FeatureCollection",
          		"features": [{
            		"type": "Feature",
            		"geometry": {
              			"type": "Point",
              			"coordinates": [lng, lat]
            		}
          		}]
        	}
    	});

      	map.addLayer({
        	"id": "circle",
        	"type": "circle",
        	"source": "source_circle",
        	"paint": {
          		"circle-radius": {
            		stops: [
              			[3, 1],
              			[15, 500]
            		],
            		base: 2
          		},
          		"circle-color": "blue",
          		"circle-opacity": 0.2
        	}
      	});
    });
});