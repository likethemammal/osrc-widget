osrc-widget
===========

![alt text](http://imgur.com/gn2evFv.png?1 "Likethemammal's chart")

A widget version of the graphs that gets generated from the [Open Source Report Card](http://osrc.dfm.io/Likethemammal) site.

Live Demo: http://jsfiddle.net/Likethemammal/B2s4q/

##Usage

The [json object](http://osrc.dfm.io/Likethemammal.json) from the Open Source Report Card site must be sent over through some sort of backend. The browser isn't allowed access to an external json object by using either a `script` tag or using AJAX.

In the `examples` directory there is a setup for a PHP backend but really any backend can be used as long as it can send the json blob from the `http://osrc.dfm.io/[your user name here].json` to the `window` object. This should be stored at `window.githubWidget.stats`.

#####PHP example: 
```php


$url = "http://osrc.dfm.io/Likethemammal.json";
$JSON = file_get_contents($url);

echo "<script>  window.githubWidget = {}; window.githubWidget.stats = $JSON;  </script>";

```

##Options 

####Completely scalable!

![alt text](http://imgur.com/UsPeJVT.png?1 "Scaling example. [500, 300]")

The `height` and `width` of the chart can be scaled to any size in px. Just set the properties on the `githubWidget` object before you drop in the script.

```html
<script>

    // If these aren't set it will default to [200, 210]
    window.githubWidget.width = 500;
    window.githubWidget.height = 300;

</script>

<script src="js/osrc-widget.js"></script>

```