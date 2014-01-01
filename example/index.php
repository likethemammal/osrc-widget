<?php

require('../server/fetch-json.php');

?>

<html>
<head>
    <title></title>
</head>
<body>

<div id="widget-container" style="width: 100px; height: 100px;">

</div>

</body>

<script>

    if (!window.osrc) {
        console.warn('The `window.osrc` gets created on the server.');
        console.log('Set the json data to `window.osrc.stats`.');
    }

    window.osrc.id = 'widget-container';

    // If these aren't set it will default to [200, 204]
    window.osrc.width = 500;
    window.osrc.height = 300;

    // Widths can also be percentages but you have to include the suffix '%'.
//    window.osrc.width = "80%";
//    window.osrc.height = "100%";

</script>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="../osrc-widget.js"></script>

</html>