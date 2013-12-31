(function(window) {
    var githubWidget = window.githubWidget,
        stats = githubWidget.stats,
        events = stats.usage.events,
        days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
        colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'],

        defaults = {
            graphHeight: 210,
            graphWidth: 200,
            id: 'github-container'
        },

        svgHeight = githubWidget.height || defaults.graphHeight,
        svgWidth = githubWidget.width || defaults.graphWidth,
        bottomOffset = 21,
        yOffset = svgHeight - bottomOffset,
        xOffset,
        rectHeight,
        rectWidth = svgWidth/8.75,
        textOffset = parseInt(rectWidth, 10)/ 2,

        svgDOMFragment = document.createDocumentFragment(),
        gDOMFragment = document.createDocumentFragment(),
        svgNode, lineNode, gNode, textNode, rectNode,

        $githubContainer = (githubWidget.id) ? $('#' + githubWidget.id) : $('#' + defaults.id),
        $svg, $line, $g, $text, $rect;

    svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    $svg = $(svgNode).attr({
        width: svgWidth,
        height: svgHeight
    });

    lineNode = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    $line = $(lineNode).attr({x1: 0, x2: svgWidth, y1: yOffset, y2: yOffset + 1}).css({
        stroke: '#222',
        strokeWidth: '1px'
    });

    svgDOMFragment.appendChild($line[0]);

    for (var i = 0; i < days.length; i++) {
        yOffset = svgHeight - bottomOffset;
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
            rectHeight = events[j].week[i]*(svgHeight/42);
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
        svgDOMFragment.appendChild($g[0]);
    }

    $svg[0].appendChild(svgDOMFragment);
    $githubContainer.append($svg);

})(this);