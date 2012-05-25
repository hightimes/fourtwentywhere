<!doctype html>
<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
  <meta charset="utf-8">
  <title>420where | The 420 worldclock service</title>
  <meta name="description" content="A world clock service which lets you know where in the world it is currently 4:20">
  <meta name="viewport" content="width=device-width">
  <link rel="stylesheet" href="css/style.css">
  <script src="js/vendor/modernizr-2.5.3.min.js"></script>
</head>
<body>
  <!--[if lt IE 7]><p class=chromeframe>Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]--> 
 <div class="weed-container">
 	<header>
 		<h1>boom. 420 worldclock service.</h1>
 	</header>
	<article>
		<section id="your-time">
			<h1>The current time in [your city] is:</h1>
			<div id="weed-clock">
				<div id="current-time"></div>
			</div>
		</section>
		<section id="awesome">
			<div id="time-to-puff"></div>
		</section>
	</article>
	<footer>
		<span>The 420 world clock is a free service brought to you by face.boom</span>
	</footer>
 </div>
 <?php
 include('ip2locationlite.class.php');
 
 //Load the class
 $ipLite = new ip2location_lite;
 $ipLite->setKey('19325862acf98e3dc45706835d54cfe1681f5c3c1d77106fb2d4704fcc47636d');
 
 //Get errors and locations
 $locations = $ipLite->getCity($_SERVER['REMOTE_ADDR']);
 $errors = $ipLite->getError();
 
 //Getting the result
 echo "<p>\n";
 echo "<strong>First result</strong><br />\n";
 if (!empty($locations) && is_array($locations)) {
   foreach ($locations as $field => $val) {
     echo $field . ' : ' . $val . "<br />\n";
   }
 }
 echo "</p>\n";
 
 //Show errors
 echo "<p>\n";
 echo "<strong>Dump of all errors</strong><br />\n";
 if (!empty($errors) && is_array($errors)) {
   foreach ($errors as $error) {
     echo var_dump($error) . "<br /><br />\n";
   }
 } else {
   echo "No errors" . "<br />\n";
 }
 echo "</p>\n";
 ?>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.7.2.min.js"><\/script>')</script>

  <!-- scripts concatenated and minified via build script -->
  <script src="js/plugins.js"></script>
  <script src="js/main.js"></script>
  <!-- end scripts -->

  <!-- Asynchronous Google Analytics snippet. Change UA-XXXXX-X to be your site's ID.
       mathiasbynens.be/notes/async-analytics-snippet -->
  <script>
    // var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
    // (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
    // g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
    // s.parentNode.insertBefore(g,s)}(document,'script'));
  </script>
</body>
</html>
