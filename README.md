osrc-widget
===========

![alt text](http://imgur.com/NiRRRWu.png?1 "Likethemammal's chart")

A widget version of the graphs that get generated from the [Open Source Report Card](http://osrc.dfm.io/Likethemammal) site.

Live Demo: http://jsfiddle.net/Likethemammal/B2s4q/

##Usage

In a `script` tag, before the tag for this library, create an `osrc` object on `window`. These will be the settings used for the widget.

```html
<script>

    window.osrc = {
        id: 'widget-container',
        username: 'Likethemammal',
        width: 400,
        height: 200
    }

</script>

<script src="js/osrc-widget.js"></script>
```

 * `id` defines what element the widget's container will be. If none is set it will use `#widget-container` by default.
 * `username` is the user for which the data will be displayed.

The `examples` directory has sample code.

##Options 

####Completely scalable!

![alt text](http://imgur.com/UsPeJVT.png?1 "Scaling example. [500, 300]")

The `height` and `width` of the chart can be scaled to any size in pixels or percentages. Just set the properties on the `osrc` object before you drop in the script.

```javascript

    // If these aren't set it will default to [200, 204]
    window.osrc.width = 500;
    window.osrc.height = 300;

    // Percentages can also be used, but the '%' suffix must be included.
    window.osrc.width = "80%";
    window.osrc.height = "100%";
    
```
