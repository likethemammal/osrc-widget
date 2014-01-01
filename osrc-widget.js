(function(window) {
    function parsePercent(string) {
        return parseInt(string.substring(0, string.length-1, 10)) / 100;
    }

    function isPercent(string) {
        return (string === string + '') ? string.indexOf('%') === string.length - 1 : false;
    }

    var widget = window.osrc,
        stats = widget.stats,
        events = stats.usage.events,
        days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'],
        titles = ['Push', 'Watch', 'Create', 'Follow', 'Pull Request'],

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

        bottomOffset = 21,
        yOffsetOriginal = chartHeight - bottomOffset,
        yOffset = yOffsetOriginal,
        xOffset,
        rectHeight,
        rectWidth = chartWidth/8.75,
        textOffset = parseInt(rectWidth, 10)/ 2;

    legendNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    $legend = $(legendNode).attr({
        width: legendWidth,
        height: legendHeight
    });

    chartNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    $chart = $(chartNode).attr({
        width: chartWidth,
        height: chartHeight
    });

    lineNode = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    $line = $(lineNode).attr({x1: 0, x2: chartWidth, y1: yOffset, y2: yOffset + 1}).css({
        stroke: '#222',
        strokeWidth: '1px'
    });

    chartDOMFragment.appendChild($line[0]);

    for (var q = 0; q < titles.length; q++) {
        gNode = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        $g = $(gNode)
            .attr({
                transform: 'translate(' + legendWidth*(q/titles.length) + ',' + legendSectionSize + ')'
            });

        titleNode = document.createElementNS('http://www.w3.org/2000/svg', 'title');
        $title = $(titleNode).text(titles[q]);

        rectNode = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
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

    for (var i = 0; i < days.length; i++) {
        yOffset = yOffsetOriginal;
        xOffset = ((i*2) + 1) * rectWidth/2 + (i*2);

        gNode = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        $g = $(gNode).attr('transform', 'translate(' + xOffset + ')');

        textNode = document.createElementNS('http://www.w3.org/2000/svg', 'text');
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
            rectHeight = events[j].week[i]*(chartHeight/42);
            yOffset -= rectHeight;

            rectNode = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
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

})(this);