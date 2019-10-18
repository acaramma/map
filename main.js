navigator.geolocation.getCurrentPosition(function(position) {
	var lat = position.coords.latitude;
    var long = position.coords.longitude;
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWNhcmFtbWEiLCJhIjoiY2sxdzA1ODgxMDkxbzNucDBkNTlnbjlqdSJ9.25isL_da_uHyJGiG2Mdr6A';
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center: [long, lat],
		zoom: 15,
		enableHighAccuracy: true,
		trackUserLocation: true
	});	

	// bottone per ritornare alla pos dell'utente
	map.addControl(new mapboxgl.GeolocateControl({
	positionOptions: {
		enableHighAccuracy: true
		},
		trackUserLocation: true
	}));
});