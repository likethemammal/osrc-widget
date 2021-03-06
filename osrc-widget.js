(function(window) {
    window.jsonCallback = function(json) {
        window.osrc.stats = json;
        var graph = new Graph();
    }
    
    function parsePercent(string) {
        return parseInt(string.substring(0, string.length-1, 10)) / 100;
    }

    function isPercent(string) {
        return (string === string + '') ? string.indexOf('%') === string.length - 1 : false;
    }
    
    var script = document.createElement('script'),
        head = document.getElementsByTagName('head')[0];
        
        script.src = "http://osrc.dfm.io/" + window.osrc.username + ".json?callback=jsonCallback";
        head.appendChild(script);

    function Graph() {
        
        var widget = window.osrc,
            events = widget.stats.usage.events,
            days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'],
            titles = ['Push', 'Watch', 'Create', 'Follow', 'Pull Request'],
            svgNamespace = 'http://www.w3.org/2000/svg',
    
            defaults = {
                graphWidth: 200,
                graphHeight: 204,
                id: 'widget-container'
            },
    
            legendDOMFragment = document.createDocumentFragment(),
            chartDOMFragment = document.createDocumentFragment(),
            gDOMFragment = document.createDocumentFragment(),
            legendNode, chartNode, lineNode, gNode, titleNode, textNode, rectNode,
    
            $widgetContainer = (widget.id) ? $('#' + widget.id) : $('#' + defaults.id),
            $legend, $chart, $line, $g, $title, $text, $rect,
    
            height = widget.height,
            width = widget.width,
            chartHeight = (height) ? (isPercent(height)) ? $widgetContainer.outerHeight() * parsePercent(height): height : defaults.graphHeight,
            chartWidth = (width) ? (isPercent(width)) ? $widgetContainer.outerWidth() * parsePercent(width) : width : defaults.graphWidth,
            legendHeight = chartHeight/6,
            legendWidth = chartWidth,
            chartHeight = chartHeight - legendHeight, //Reset chartHeight to include legend
            legendSectionSize = (legendHeight/3 < (legendWidth/3)/titles.length) ? legendHeight/3 : (legendWidth/3)/titles.length,
            eventHeight,
    
            bottomOffset = 21,
            yOffsetOriginal = chartHeight - bottomOffset,
            yOffset = yOffsetOriginal,
            xOffset,
            rectHeight,
            rectWidth = chartWidth/8.75,
            textOffset = parseInt(rectWidth, 10)/ 2;
            
        (function analyzeData() {
            var days = [0,0,0,0,0,0,0],
                mostEvents = 0;
            
            for (var i = 0; i < days.length; i++) {

                for (var j = 0; j < events.length; j++) {                    
                    days[i] += events[j].week[i];
                }
                
                if (days[i] > mostEvents) {
                    mostEvents = days[i];
                }
                
            }
            
            eventHeight = chartHeight / mostEvents;
        })();
        
        (function setup() {
            
            legendNode = document.createElementNS(svgNamespace, 'svg');
            $legend = $(legendNode).attr({
                width: legendWidth,
                height: legendHeight
            });
        
            chartNode = document.createElementNS(svgNamespace, 'svg');
            $chart = $(chartNode).attr({
                width: chartWidth,
                height: chartHeight
            });
        
            lineNode = document.createElementNS(svgNamespace, 'line');
            $line = $(lineNode).attr({x1: 0, x2: chartWidth, y1: yOffset, y2: yOffset + 1}).css({
                stroke: '#222',
                strokeWidth: '1px'
            });
        
            chartDOMFragment.appendChild($line[0]);
    
            for (var q = 0; q < titles.length; q++) {
                gNode = document.createElementNS(svgNamespace, 'g');
                $g = $(gNode)
                    .attr({
                        transform: 'translate(' + legendWidth*(q/titles.length) + ',' + legendSectionSize + ')'
                    });
        
                titleNode = document.createElementNS(svgNamespace, 'title');
                $title = $(titleNode).text(titles[q]);
        
                rectNode = document.createElementNS(svgNamespace, 'rect');
                $rect = $(rectNode)
                    .attr({
                        width: legendSectionSize,
                        height: legendSectionSize,
                        x: ((legendWidth/3)/titles.length)/2
                    }).css({
                        fillOpacity: .8,
                        fill: colors[q],
                        cursor: 'pointer'
                    });
        
                $g.append($title);
                $g.append($rect);
        
                legendDOMFragment.appendChild($g[0]);
            }
        
            $legend[0].appendChild(legendDOMFragment);
            $widgetContainer.append($legend);
            
        })();
            
        (function histogram() {
            
            for (var i = 0; i < days.length; i++) {
                yOffset = yOffsetOriginal;
                xOffset = ((i*2) + 1) * rectWidth/2 + (i*2);
        
                gNode = document.createElementNS(svgNamespace, 'g');
                $g = $(gNode).attr('transform', 'translate(' + xOffset + ')');
        
                textNode = document.createElementNS(svgNamespace, 'text');
                $text = $(textNode)
                    .text(days[i])
                    .attr({
                        y: yOffset + 2,
                        x: textOffset,
                        'text-anchor': 'middle',
                        dy: '12'
                    }).css({
                        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                        fontSize: '11px',
                        color: '#222'
                    });
    
                gDOMFragment.appendChild($text[0]);
    
                for (var j = 0; j < colors.length; j++) {
                    rectHeight = events[j].week[i]*eventHeight;
                    yOffset -= rectHeight;
        
                    rectNode = document.createElementNS(svgNamespace, 'rect');
                    $rect = $(rectNode)
                        .attr({
                            width: rectWidth,
                            height: rectHeight,
                            y: yOffset,
                            x: 0
                        })
                        .css({
                            fillOpacity: .8,
                            fill: colors[j]
                        });
        
                    gDOMFragment.appendChild($rect[0]);
                }
    
                $g[0].appendChild(gDOMFragment);
                chartDOMFragment.appendChild($g[0]);
            }
    
            $chart[0].appendChild(chartDOMFragment);
            $widgetContainer.append($chart);
            
        })();  
    }
})(this);