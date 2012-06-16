/* Author:
boom.face.done
*/
(function(window,document){
    
    //private parts
    var timeout,
    twenty = 20, //helpful for testing
    eighty = 80, //helpful for testing
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
    	"0"  : 12
    },
    // timezone data for 12 cities
    data = [
		[-10.0,"Honolulu","HST UTC-10",true],
		[-7.0,"San Francisco","PDT UTC-7",true],
		[-6.0,"Denver","MDT UTC-6",true],
		[-5.0,"Chicago","CDT UTC-5",true],
		[-4.0,"New York","EDT UTC-4",true],
		[-3.0,"Rio de Janeiro","BRT UTC-3",true],
		[1.0,"London","BST UTC+1",true],
		[2.0,"Vienna","CEST UTC+2",true],
		[5.5,"Mumbai","IST UTC+5.5",true],
		[8.0,"Singapore","SGT UTC+8",true],
		[9.0,"Tokyo","JST UTC+9",true],
		[10.0,"Sydney","EST UTC+10",true],
		[12.0,"Auckland","NZST UTC+12",true]
	],

    //doc elements
    //moved it out of the message function
    puffid = document.getElementById('time-to-puff'),
	currtimeid = document.getElementById('current-time'),
	amdtimeid = document.getElementById('amd-current-time');


	function timeCheck(){
		//make message
		var msg = message();
		
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
       ampm = (date.getHours() >= 0) && (date.getHours() <= 11) ? "am" : "pm",
	   time = [hour,":",minutes,":",seconds," "+ampm].join("");		 	

       return time;
	}

	function formatAmsterTime(date){
		var time = date,
		time2,
		// ===========================================================================
		// = GMT +1 currently -- the + 3600000 ms at the end is for daylight savings =
		// ===========================================================================
		gmt = time.getTime() + (time.getTimezoneOffset() * 60000) + 3600000,
		gmtTime = new Date(gmt),
		hour = gmtTime.getHours(),
		minutes = gmtTime.getMinutes(),
		seconds = gmtTime.getSeconds(),
		hour = hours[gmtTime.getHours()] ? hours[gmtTime.getHours()] : gmtTime.getHours(),
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

	function countDownMessage(date){
		
		var next420 = date.getMinutes() < twenty ? twenty - date.getMinutes() : eighty - date.getMinutes();
		next420 += (next420 < 2) ? " minute" : " minutes";
 
		return next420 + " til the next 4:20.";
	}

	function message(){
		var
		date = new Date(),
		msg = [],
		sorry =  "Sorry dude. ",
		msg1 =  "It's 4:20 in face",
		msg2 = "BOOM 4:20! Light that bitch up!",
		countdown = countDownMessage(date),
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
