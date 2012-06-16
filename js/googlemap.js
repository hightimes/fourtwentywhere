

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
String.prototype.singularize = function() {
		if ((this.substr(-1) == "s") && !(this.substr(-3) == "ies")){
			return this.substring(0, this.length-1);
		}
		else if ((this.substr(-2) == "es") && !(this.substr(-3) == "ies")){
			return this.substring(0, this.length-2);
		}
		else if ((this.substr(-3) == "ies")){
			return this.substring(0, this.length-3) + "y";			
		}
		else { return this; }
}

var geocoder;
  var map;
	var service;
	var infowindow;
	var searchterms = ['donuts','candy','snacks','pizza','pastries','dispensary'];
	var searchterm = searchterms[Math.floor(Math.random()*searchterms.length)];
	var searchtext = searchterm;
	document.getElementById('search-title').innerHTML = searchterm.capitalize().singularize() + " Finder:";
	document.getElementById('search-button').setAttribute("value","Get " + searchterm.capitalize() + "!");

	
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
        
      }
			
			console.log(searchterm);
		  var request = {
		    location: results[0].geometry.location,
		    radius: '4000',
		    keyword: [searchterm]
		  };
			
			function callback(results, status) {
			  if (status == google.maps.places.PlacesServiceStatus.OK) {
			    for (var i = 0; i < results.length; i++) {
			      var place = results[i];
			      createMarker(results[i]);
			    }
			  }
			   else {
        			alert("No " + searchterm + " for you: please enter your zip code or city and try again");
     			}
			}
			infowindow = new google.maps.InfoWindow();
			service = new google.maps.places.PlacesService(map);
			service.search(request, callback);
			
    });
	  
		function createMarker(place) {
		    var placeLoc = place.geometry.location;
		    var potleaf = "../img/leaf-marker.png";
		    var marker = new google.maps.Marker({
		      map: map,
		      position: place.geometry.location,
		      icon: potleaf
		    });
				google.maps.event.addListener(marker, 'click', function() {
				          infowindow.setContent(place.name);
				          infowindow.open(map, this);
				        });
				
			}
			
  }