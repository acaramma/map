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

	map.once('load', function () {
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

		//cerchio
		/*map.addSource("source_circle", {
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
      	});*/
      	var string = JSON.stringify(source_circle);
      	//var source = JSON.parse(source_circle)
      	//var parse_l = JSON.parse(source_circle).length
      	for (var i = 0; i < 8; i++){
      		var source_parse = string[i];
      		map.addSource(source_parse);
      	}

      	var stringcer = JSON.stringify(circle);
      	//var cerchio = JSON.parse(circle)
      	//var parse_lu = JSON.parse(circle).length
      	for (var i = 0; i < 9; i++){
      		var circle_parse = stringcer[i];
      		map.addLayer(circle_parse);
      	}
    });
});