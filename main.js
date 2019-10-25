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

	//inserimento luogo
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
		//markers
		var descrizione = JSON.stringify(descrizioni.descrizione1);
		new mapboxgl.Marker()
		.setLngLat([9.144366, 45.398647])
		.setPopup(new mapboxgl.Popup({ offset: 25 })
    	.setHTML(descrizione))
		.addTo(map);

		descrizione = JSON.stringify(descrizioni.descrizione2);
		new mapboxgl.Marker()
		.setLngLat([9.148171, 45.399315])
		.setPopup(new mapboxgl.Popup({ offset: 25 })
    	.setHTML(descrizione))
		.addTo(map);

		descrizione = JSON.stringify(descrizioni.descrizione3);
		new mapboxgl.Marker()
		.setLngLat([9.147715, 45.397865])
		.setPopup(new mapboxgl.Popup({ offset: 25 })
    	.setHTML(descrizione))
		.addTo(map);

		descrizione = JSON.stringify(descrizioni.descrizione4);
		new mapboxgl.Marker()
		.setLngLat([9.149401, 45.456881])
		.setPopup(new mapboxgl.Popup({ offset: 25 })
    	.setHTML(descrizione))
		.addTo(map);

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
  			"id":"circle",
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