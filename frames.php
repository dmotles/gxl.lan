<?php

if ( !isset($_GET["page"] ) ){
	header("Location: http://gxl.lan/"); 
	exit;
}

$int = $_GET["page"];
$array = array("http://chan.gxl.lan","http://files.gxl.lan");
if( !isset( $array[$int] ) ) {
  $int = 0;
}

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN"
   "http://www.w3.org/TR/html4/frameset.dtd">
<HTML>
<HEAD>
<meta http-equiv="Content-type" content="text/html;charset=UTF-8">
<TITLE>TheGXL | East Coast LANs that ROCK!</TITLE>
</HEAD>
<FRAMESET rows="30, *" noresize="noresize" FRAMEBORDER=NO FRAMESPACING=0 BORDER=0>
  <FRAME src="menu.html">
  <FRAME src="<?php echo $array[$int]; ?>" name="contentframe">
</FRAMESET>
</HTML>
