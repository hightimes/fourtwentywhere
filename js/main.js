/* Author:
boom.face.done
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
    },

    //doc elements
    //moved it out of the message function
    puffid = document.getElementById('time-to-puff'),
	currtimeid = document.getElementById('current-time'),
	amdtimeid = document.getElementById('amd-current-time');
    

	function timeCheck(){
		var 
		date = new Date(),
        //pass in the Date object and make message
		msg = message(date);
		//render to DOM
		render(msg);
        timeout = setTimeout(timeCheck,1000);
		//console.log("timeout = " + timeout);
	}

	function formatTime(date){
       var 
       hour = hours[date.getHours()] ? hours[date.getHours()] : date.getHours(),
       minutes = (date.getMinutes().toString().length > 1)  ? date.getMinutes() : ("0" + date.getMinutes()),
			 seconds = (date.getSeconds() < 10) ? ("0" + date.getSeconds()) : date.getSeconds(),
       ampm = (date.getHours() >= 0) && (date.getHours() <= 11) ? "am" : "pm";
			 time = [hour,":",minutes,":",seconds," "+ampm].join("");		 	

       return time;
	}

	function formatAmsterTime(date){
		var time = date,
		// ===========================================================================
		// = GMT +1 currently -- the + 3600000 ms at the end is for daylight savings =
		// ===========================================================================
		gmt = time.getTime() + (time.getTimezoneOffset() * 60000) + 3600000,
		gmtTime = new Date(gmt),
		hour = gmtTime.getHours(),
		minutes = gmtTime.getMinutes(),
		seconds = gmtTime.getSeconds(),
		hour = hours[gmtTime.getHours()] ? hours[gmtTime.getHours()] : gmtTime.getHours()
		ampm = (gmtTime.getHours() >= 0) || (gmtTime.getHours() <= 11) ? "am" : "pm";
		if (hour == 0){
			hour = "12"
		}
		if(minutes < 10){
		minutes = "0" + minutes
		}
		if(seconds < 10){
		seconds = "0" + seconds
		} 
		time2 = [hour,":",minutes,":",seconds," "+ampm].join("");		
		return time2;
	}

	function message(date){
		var
		msg = [],
		sorry =  "Sorry dude. ",
		msg1 =  "It's 4:20 in face",
		msg2 = "BOOM 4:20! Light that bitch up!",
		countdown = 80 - (date.getMinutes()) + " minutes til the next 4:20.", // Im not sure if the arithmetic is right on this.
		time = formatTime(date),
		time2 = formatAmsterTime(date),
		message = date.getMinutes() == 20 ? (date.getHours() == 4 ? msg2 : msg1) : sorry + countdown;

		msg.push(time);
		msg.push(time2);
		msg.push(message);

		return msg
	}

	function print(msg){
	    console.log(msg);
	}

	function render(msg){
		currtimeid.innerHTML = msg[0];
		amdtimeid.innerHTML = msg[1];
		puffid.innerHTML = msg[2];
	}

	function stop(){
		clearTimeout(timeout);
		console.log("timeout = "+timeout);
	}

	//Class constructor
    function FourTwenty(){
      
      //assing DOM els in the constructor
      //for easy access
      this.puffid = puffid;
      this.currtimeid = currtimeid;
      this.amdtimeid = amdtimeid;
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
