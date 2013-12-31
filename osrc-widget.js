(function(window) {

var githubInfo = window.githubJSON,
    days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    colors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd'],
    events = githubInfo.usage.events,
    svgHeight = 210,
    svgWidth = 200,
    bottomOffset = 21,
    yOffset = svgHeight - bottomOffset,
    xOffset,
    rectHeight,
    rectWidth = '24.285714285714285',
    textOffset = parseInt(rectWidth, 10)/ 2,

    $githubContainer = $('#github-container'),
    $svg, $line, $g, $text, $rect;


$svg = $('<svg></svg>').attr({
    width: svgWidth,
    height: svgHeight
});

var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');

$line = $(line).attr({x1: 0, x2: svgWidth, y1: yOffset, y2: yOffset + 1}).css({
    stroke: '#222',
    strokeWidth: '1px'
});

$svg.append($line);

for (var i = 0; i < days.length; i++) {
    yOffset = svgHeight - bottomOffset;
    xOffset = ((i*2)+1)*12+(i*2);

    var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');

    $g = $(g).attr('transform', 'translate(' + xOffset + ')');

    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    $text = $(text)
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

    $svg.append($g);
    $g.append($text);

    for (var j = 0; j < colors.length; j++) {
        rectHeight = events[j].week[i]*5;
        yOffset -= rectHeight;

        var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        $rect = $(rect)
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

        $g.append($rect);
    }
}

$githubContainer.append($svg);

})(this);