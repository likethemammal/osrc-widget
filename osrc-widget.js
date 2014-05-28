(function(window) {        
    
    function parsePercent(string) {
        return parseFloat(string.substring(0, string.length-1)) / 100;
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
    
            legendDOMFragment = document.createDocumentFragment(),
            chartDOMFragment = document.createDocumentFragment(),
            gDOMFragment = document.createDocumentFragment(),
            graphNode, svgNode,
            legendNode, chartNode, lineNode, gNode, titleNode, textNode, rectNode,
    
            $widgetContainer = $('#' + username + '-widget-container'),            
            $innerContainer = $(document.createElement('div')),
            $svg,
            $legend, $chart, $line, $g, $title, $text, $rect,
    
            legendHeight = '13%',
            legendSectionSize = 34/3,
            chartHeightPercentage = 100 - parseFloat(legendHeight),
            chartWidthPercentage = 100,
            eventHeightPercent,
    
            bottomOffset = '8.5%',
            yOffsetOriginal = 100 - parseFloat(bottomOffset) + '%',
            yOffset = yOffsetOriginal,
            xOffset,
            rectHeight,
            rectWidth = '12%',
            textOffset = '6%';
                                    
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
            
            eventHeightPercent = parseFloat(yOffset) / mostEvents;
        })();
        
        (function setup() {
            
            $innerContainer.addClass('svg-container');
            
            legendNode = document.createElementNS(svgNamespace, 'svg');
            $legend = $(legendNode).attr({
                width: '100%',
                height: legendHeight
            });
        
            chartNode = document.createElementNS(svgNamespace, 'svg');
            $chart = $(chartNode).attr({
                width: '100%',
                height: chartHeightPercentage + '%'
            });
        
            lineNode = document.createElementNS(svgNamespace, 'line');
            $line = $(lineNode).attr({x1: 0, x2: '100%', y1: yOffset, y2: yOffset}).css({
                stroke: '#222',
                strokeWidth: '1px'
            });
        
            chartDOMFragment.appendChild($line[0]);
    
            for (var q = 0; q < titles.length; q++) {
                        
                gNode = document.createElementNS(svgNamespace, 'g');
                $g = $(gNode);
                
                svgNode = document.createElementNS(svgNamespace, 'svg');
                $svg = $(svgNode).attr('x', 100*(q/titles.length) + '%');                    
        
                titleNode = document.createElementNS(svgNamespace, 'title');
                $title = $(titleNode).text(titles[q]);
        
                rectNode = document.createElementNS(svgNamespace, 'rect');
                $rect = $(rectNode)
                    .attr({
                        width: legendSectionSize,
                        height: legendSectionSize,
                        x: ((100/3)/titles.length)/2 + 5 + '%'
                    }).css({
                        fillOpacity: .8,
                        fill: colors[q],
                        cursor: 'pointer'
                    });
        
                $svg.append($title);
                $svg.append($rect);
                $g[0].appendChild($svg[0]);
        
                legendDOMFragment.appendChild($g[0]);
            }
        
            $legend[0].appendChild(legendDOMFragment);
            $innerContainer.append($legend);
            
        })();
            
        (function histogram() {
            
            for (var i = 0; i < days.length; i++) {
                yOffset = yOffsetOriginal;
                xOffset = (i*2) * parseFloat(rectWidth)/2 + (i*2) + 2 + '%';
                        
                gNode = document.createElementNS(svgNamespace, 'g');
                $g = $(gNode);
                
                svgNode = document.createElementNS(svgNamespace, 'svg');
                $svg = $(svgNode).attr('x', xOffset);
                        
                textNode = document.createElementNS(svgNamespace, 'text');
                $text = $(textNode)
                    .text(days[i])
                    .attr({
                        y: parseFloat(yOffset) + 1 + '%',
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
                    
                    if (events[j]) {
                        rectHeight = events[j].week[i] * eventHeightPercent + '%';
                        yOffset = parseFloat(yOffset) - parseFloat(rectHeight) +'%';

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

                }
    
                $svg[0].appendChild(gDOMFragment);
                $g[0].appendChild($svg[0]);
                chartDOMFragment.appendChild($svg[0]);
            }
    
            $chart[0].appendChild(chartDOMFragment);
            $innerContainer.append($chart);
            $widgetContainer.html($innerContainer[0]);
            
        })(); 
                
    }
    
    window.Graph = graph;    
    
})(this);
