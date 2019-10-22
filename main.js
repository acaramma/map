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
		//marker
		new mapboxgl.Marker()
		.setLngLat([9.144366, 45.398647])
		.setPopup(new mapboxgl.Popup({ offset: 25 })
    		.setHTML("<strong>Battle Symphony</strong><p>I hear my battle symphony, All the world in front of me, If my armor breaks, I\'ll fuse it back together, Battle symphony, Please just don\'t give up on me, And my eyes are wide awake.</p>"))
		.addTo(map);


		new mapboxgl.Marker()
		.setLngLat([9.148171, 45.399315])
		.setPopup(new mapboxgl.Popup({ offset: 25 })
    		.setHTML("<strong>Sharp Edges</strong><p>Sharp edges have consequences, I guess that I had to find out for myself, Sharp edges have consequences, Now every scar is a story I can tell.</p>"))
		.addTo(map);



		new mapboxgl.Marker()
		.setLngLat([9.147715, 45.397865])
		.setPopup(new mapboxgl.Popup({ offset: 25 })
    		.setHTML("<strong>One More Light</strong><p>Who cares if one more light goes out? In a sky of a million stars, It flickers, flickers, Who cares when someone's time runs out?, If a moment is all we are, We're quicker, quicker, Who cares if one more light goes out? Well I do.</p>"))
		.addTo(map);

		map.on('mouseenter', 'places', function () {
			map.getCanvas().style.cursor = 'pointer';
		});

		map.on('mouseleave', 'places', function () {
			map.getCanvas().style.cursor = '';
		});

		//cerchio 
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
              			[15, 250]
            		],
            		base: 2
          		},
          		"circle-color": "blue",
          		"circle-opacity": 0.2
        	}
      	});
    });
});