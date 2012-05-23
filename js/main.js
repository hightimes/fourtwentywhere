/* Author:

*/








(function(window,document){
    
    //private parts
    var timeout,
    hours = {
    	"13" : 1,
    	"14" : 2,
    	"15" : 3,
    	"16" : 4,
    	"17" : 5,
    	"18" : 6,
    	"19" : 7,
    	"20" : 8,
    	"21" : 9,
    	"22" : 10,
    	"23" : 11,
    };

	function timeCheck(){
		message(new Date());
		timeout = setTimeout(timeCheck,60000);
		console.log("timeout = " + timeout);
	}

	function formatTime(date){
       var 
       hour = hours[date.getHours()] ? hours[date.getHours()] : date.getHours(),
       minutes = (date.getMinutes().toString().length > 1)  ? date.getMinutes() : ("0" + date.getMinutes()),
       time = [hour,":",minutes].join("");		 	
       return time;
	}
	var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	var geocoder = new google.maps.Geocoder()
	geocoder.geocode({location:latlng},function(result){
	                    console.log(resul.address_components.long_name)
	});
	 
	function message(date){
		
		var
		puffid = document.getElementById('time-to-puff'),
		currtimeid = document.getElementById('current-time'),
		msg = [],
		sorry =  "Sorry, not time to puff",
		msg1 =  "It's 4:20 in face",
		time = formatTime(date);
		msg.push(time);
		msg = (date.getMinutes() == 20) ? msg1 : sorry;
		// print(msg);
		currtimeid.innerHTML = time;
		puffid.innerHTML = msg;
	}

	function print(msg){
	    console.log(msg);
	}

	function render(msg){
	    console.log(msg);
	}

	function stop(){
		clearTimeout(timeout);
		console.log("timeout = "+timeout);
	}

	//Class constructor
    function FourTwenty(){

    }

    //pubic API
    FourTwenty.prototype = {
        bake   : timeCheck,
        jones  : stop
    }
    
    //name space that ish
    window.fourtwenty = FourTwenty;

})(window,document);

var x = new fourtwenty();
x.bake();
