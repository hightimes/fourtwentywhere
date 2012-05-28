var geocoder;
  var map;
	var service;
	var infowindow;

	
  function codeAddress() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var myOptions = {
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
		
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		
		
    var address = document.getElementById("address").value;
    geocoder.geocode( { 'address': address}, function(results, status) {
		 
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map, 
            position: results[0].geometry.location
        });
      } else {
        alert("No donuts for you: please enter your zip code or city and try again");
      }
		  var request = {
		    location: results[0].geometry.location,
		    radius: '4000',
		    keyword: ['donuts']
		  };
			
			function callback(results, status) {
			  if (status == google.maps.places.PlacesServiceStatus.OK) {
			    for (var i = 0; i < results.length; i++) {
			      var place = results[i];
			      createMarker(results[i]);
			    }
			  }
			}
			infowindow = new google.maps.InfoWindow();
			service = new google.maps.places.PlacesService(map);
			service.search(request, callback);
			
    });
	  
		function createMarker(place) {
		    var placeLoc = place.geometry.location;
		    var marker = new google.maps.Marker({
		      map: map,
		      position: place.geometry.location
		    });
				google.maps.event.addListener(marker, 'click', function() {
				          infowindow.setContent(place.name);
				          infowindow.open(map, this);
				        });
				
			}
			
  }