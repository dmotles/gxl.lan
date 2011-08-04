/*
Author: Robert Hashemian
http://www.hashemian.com/

You can use this code in any manner so long as the author's
name, Web address and this disclaimer is kept intact.
********************************************************
Usage Sample:

<script language="JavaScript">
TargetDate = "12/31/2020 5:00 AM";
BackColor = "palegreen";
ForeColor = "navy";
CountActive = true;
CountStepper = -1;
LeadingZero = true;
DisplayFormat = "%%D%% Days, %%H%% Hours, %%M%% Minutes, %%S%% Seconds.";
FinishMessage = "It is finally here!";
</script>
<script language="JavaScript" src="http://scripts.hashemian.com/js/countdown.js"></script>
*/

runtime = 172800;
DisplayFormat = "<div id=\"clock_normal\">%%H%%:%%M%%:%%S%%</div>";
TargetDate = "5/8/2011 5:00 PM";
//datereg = new RegExp("^[^,]+","g");dd

function convertSecs(secs, convert, max) {
  
	var s = ( ( Math.floor(secs/convert) ) % max ).toString();

	debuginfo = debuginfo + "<br>secs:" + secs + " con:" + convert + " max:" + max + "<br>s:" + s + "<br>"; 

	document.getElementById("debug").innerHTML = debuginfo;
 
  if (s.length < 2)
    s = "0" + s;
  return s;

}

function updateClock(timeleft) {
  
	//debuginfo = debuginfo + "<br>timeleft less than 0:" + (timeleft < 0); 
	//document.getElementById("debug").innerHTML = debuginfo;

	if (timeleft < 0) {

		document.getElementById("clock").innerHTML = "<div id=\"clock_timeup\">00:00:00</div>";
		return;
	}
	
	if (timeleft < 18000)
		DisplayFormat = DisplayFormat.replace(/normal/g, "timeup");

	var total;

	if (timeleft > runtime)
		total = runtime;
	else 
		total = timeleft;

	var hours = Math.floor(total/3600);
	var mins = Math.floor((total-(hours*3600))/60);
	var secs = (total-(hours*3600)-(mins*60));
	if (hours.toString().length < 2) hours = "0" + hours.toString();
	if (mins.toString().length < 2) mins = "0" + mins.toString();
	if (secs.toString().length < 2) secs = "0" + secs.toString();

  //DisplayStr = DisplayFormat.replace(/%%H%%/g, convertSecs(secs,3600,24));
  //DisplayStr = DisplayStr.replace(/%%M%%/g, convertSecs(secs,60,60));
  //DisplayStr = DisplayStr.replace(/%%S%%/g, convertSecs(secs,1,60));
  DisplayStr = DisplayFormat.replace(/%%H%%/g, hours);
  DisplayStr = DisplayStr.replace(/%%M%%/g, mins);
  DisplayStr = DisplayStr.replace(/%%S%%/g, secs);
	
  document.getElementById("clock").innerHTML = DisplayStr;
 	writeSchedule(); 
  setTimeout("updateClock(" + (timeleft-1) + ")", 1000);
}


//NOTICE: I don't know what the fuck im doing in javascript
//so the efficiency of this thing SUCKS.
function writeSchedule() {
	schedout = "";
	var now = new Date();
	var i;
	for ( i = 0 ; i < SCHEDULE.length ; i++ ) {
		var e = SCHEDULE[i].toString().split(/,/);
		var edate = e[0].toString();
		var ename = e[1].toString();
		var etype = e[2].toString();
		var expired = "now";
		var timediff = new Date( (new Date(edate)) - now );
		if (timediff.valueOf() < -3600000) {
			expired = "after";
		} else if (timediff.valueOf() > 900000) {
			expired = "before";
		}

		edate = edate.replace(/05\/06\/2011/,"Fri");
		edate = edate.replace(/05\/07\/2011/,"Sat");
		edate = edate.replace(/05\/08\/2011/,"Sun");
		ename = ename.substring(0,45);
		//var eventspantag = "<span class=\"event_before\">";
		//var edate = new Date(e[0]);
		//var ediff = new Date(edate - now);
		//if ( ediff.valueOf() < 0 )
			//eventspantag = "<span class=\"event_after\">"; 
		//schedout = schedout + "\n<div id=\"event"+"\" class=\"" + e[1] + "\">"
		//	+ eventspantag + "\n\t<span class=\"event_start\">" + e[0] +
		//	"</span>\n\t<a href=\"" + e[3] + "\">" + e[2] + "</a></span></div>"; 
		schedout = schedout + "<div id=\"event" + i + "\" class=\"" + etype + "\">" +
			"<span class=\"event_" + expired + "\">" +
			"<span class=\"event_start\">" + edate + "</span> " +
			"<span class=\"event_name\">" + ename + "</span>" + 
			"</span></div>";
	}

	document.getElementById("Schedule").innerHTML = schedout;
	return;
}
writeSchedule();
var dend = new Date(TargetDate);
var dnow = new Date();
ddiff = new Date(dend-dnow);
dsecs = Math.floor(ddiff.valueOf()/1000);

debuginfo = "dend: " + dend + "<br>dnow:" + dnow + "<br>ddiff:" + ddiff + " Valueof:" + ddiff.valueOf() + "<br>dsecs: " + dsecs;
//document.getElementById("debug").innerHTML = debuginfo;

updateClock(dsecs);
