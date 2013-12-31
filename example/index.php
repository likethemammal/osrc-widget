<?php

require('../server/fetch-json.php');

?>

<html>
<head>
    <title></title>
</head>
<body>

<div id="github-container">

</div>

</body>

<script>

    if (!window.githubWidget) {
        console.warn('The `window.githubWidget` gets created on the server.');
        console.log('Set the json data to `window.githubWidget.stats`.');
    }

    // If these aren't set it will default to [200, 210]
    window.githubWidget.width = 500;
    window.githubWidget.height = 300;
    window.githubWidget.id = 'github-container';

</script>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<script src="../osrc-widget.js"></script>

</html>