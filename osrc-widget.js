(function(window) {        
    
    function parsePercent(string) {
        return parseInt(string.substring(0, string.length-1, 10)) / 100;
    }

    function isPercent(string) {
        return (string === string + '') ? string.indexOf('%') === string.length - 1 : false;
    }
    
    function graph(username, events) {
                                                        
        var widget = window.osrc,
            days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'],
            titles = ['Push', 'Watch', 'Create', 'Follow', 'Pull Request'],
            svgNamespace = 'http://www.w3.org/2000/svg',
    
            defaults = {
                graphWidth: 200 ,
                graphHeight: 204,
                id: 'widget-container'
            },
    
            legendDOMFragment = document.createDocumentFragment(),
            chartDOMFragment = document.createDocumentFragment(),
            gDOMFragment = document.createDocumentFragment(),
            graphNode,
            legendNode, chartNode, lineNode, gNode, titleNode, textNode, rectNode,
    
            $widgetContainer = $('#' + username + '-widget-container'),            
            $innerContainer = $(document.createElement('div')),
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
            $innerContainer.append($legend);
            
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
            $innerContainer.append($chart);
            $widgetContainer.html($innerContainer[0]);
            
        })(); 
                
    }
    
    window.Graph = graph;    
    
})(this);