osrc-widget
===========

![alt text](http://imgur.com/gn2evFv.png?1 "Likethemammal's chart")

A widget version of the graphs that get generated from the [Open Source Report Card](http://osrc.dfm.io/Likethemammal) site.

Live Demo: http://jsfiddle.net/Likethemammal/B2s4q/

##Usage

The [json object](http://osrc.dfm.io/Likethemammal.json) from the Open Source Report Card site must be sent over through some sort of backend. The browser isn't allowed access to an external json object by using either a `script` tag or using AJAX.

In the `server` directory there is a setup for a PHP backend but really any backend can be used as long as it can send the json blob from the `http://osrc.dfm.io/[your user name here].json` link to the `window` object. This should be stored at `window.osrc.stats`.

#####PHP example: 
```php


$url = "http://osrc.dfm.io/Likethemammal.json";
$JSON = file_get_contents($url);

echo "<script>  window.osrc = { stats: $JSON };  </script>";

```

The `id` property needs to be set on the `osrc` object as well to define what element the widget's container will be. If none is set it will use `#widget-container` by default. The `examples` directory has sample code.

##Options 

####Completely scalable!

![alt text](http://imgur.com/UsPeJVT.png?1 "Scaling example. [500, 300]")

The `height` and `width` of the chart can be scaled to any size in pixels or percentages. Just set the properties on the `osrc` object before you drop in the script.

```html
<script>

    window.osrc.id = 'widget-container';

    // If these aren't set it will default to [200, 210]
    window.osrc.width = 500;
    window.osrc.height = 300;

    // Percentages can also be used, but the '%' suffix must be included.
//    window.osrc.width = "80%";
//    window.osrc.height = "100%";

</script>

<script src="js/osrc-widget.js"></script>

```