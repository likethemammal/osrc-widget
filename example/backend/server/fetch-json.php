<?php

$username = "Likethemammal"; // <-- Your username here
$url = "http://osrc.dfm.io/$username.json";
$JSON = file_get_contents($url);

echo "<script>  window.osrc = { stats: $JSON };  </script>";

?>