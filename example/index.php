<?php

require('../server/fetch-json.php');

?>

<html>
<head>
    <title></title>
    <style>

        g, svg {
            -webkit-transition: all 500ms ease-in;
            -moz-transition: all 500ms ease-in;
            -ms-transition: all 500ms ease-in;
            -o-transition: all 500ms ease-in;
            transition: all 500ms ease-in;
        }

        /*.anim {*/
            /*-webkit-animation-name: glow-blue;*/
            /*-webkit-animation-duration: 1s;*/
            /*-webkit-animation-iteration-count: infinite;*/
            /*-webkit-animation-timing-function: ease-in-out;*/
            /*-webkit-animation-direction: alternate;*/

            /*animation-name: glow-blue;*/
            /*animation-duration: 1s;*/
            /*animation-iteration-count: 1;*/
            /*animation-timing-function: ease-in-out;*/
            /*animation-direction: alternate;*/

            /*-moz-animation: none;*/
        /*}*/

        @-webkit-keyframes hide {
            0% {
                -webkit-transform: scale(1) translateY(5px);
                transform: scale(1) translateY(5px);
            }
            100% {
                -moz-transform: scale(0) translateY(165px);
                -webkit-transform: scale(0) translateY(165px);
                -o-transform: scale(0) translateY(165px);
                -ms-transform: scale(0) translateY(165px);
                transform: scale(0) translateY(165px)
            }
        }

    </style>
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