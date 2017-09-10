// nav.js *** JS for the bar chart.

// Function for converting number to currency
function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return '$' + x1 + x2;
}

// Function used to detect whether a graph has been scrolled to
function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemTop <= docViewBottom) && (elemBottom >= docViewTop));
}

// Load required to allow HTML elements to appear on the page first
$(window).load(function() {

    // Function to create a horizonal bar chart.
    function createChart(chartParemeters, chartLabels, chartColors, toolTip, canvasSelection) {
        var ctx = document.getElementById(canvasSelection).getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: chartLabels,
                fillOpacity: .3,
                datasets: [{
                    label: toolTip,
                    data: chartParemeters,
                    backgroundColor: chartColors,
                    borderWidth: 1,
                    hoverBorderColor: "#ff0000"
                }]
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            beginAtZero: true,
                            userCallback: function(value, index, values) {
                                // Convert the number to a string and splite the string every 3 charaters from the end
                                value = value.toString();
                                value = value.split(/(?=(?:...)*$)/);

                                // Convert the array to a string and format the output
                                value = value.join('.');
                                return '$' + value;
                            }
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            display: false
                        },
                        barThickness: 30
                    }]
                },
                title: {
                    display: false,
                },
                tooltips: {
                    callbacks: {
                        // Convert tooltip to currency. 
                        label: function(tooltipItems, chart) {
                            return addCommas(tooltipItems.xLabel);
                        }
                    }
                }
            },
            scaleOverride: true,
            scaleSteps: .1,
            scaleStepWidth: 3,
            scaleStartValue: 0
        });
    }

    // Initialize on load call to show chart in case it's loaded into view
    $(".hoirizontal-bar-graph").each(function() {

    	// Collect html interiers of the char
        var canvasLocation = $(this).children('canvas');
        var canvasId = canvasLocation.attr('id');

        var chartTitle = $(this).children('.chart-main-title').text();
        var chartSubtitle = $(this).children('.chart-sub-title').text();

        var enteredLabels = $(this).children('.labels').text();
        var arrayLabels = enteredLabels.split(",");

        var enteredData = $(this).children('.data').text();
        var arrayData = enteredData.split(',').map(Number);

        var enteredColors = $(this).children('.chart-colors').text();
        var arrayColors = enteredColors.replace(/\s+/g, '').split(",");

        var textToolTip = $(this).children('.chart-tooltip-label').text();

        // Create legend markup and append it to the char area
        var legend = "";
        for (var i = 0; i < arrayColors.length; i++) {
            legend += '<div class="legend-label">' + arrayLabels[i] + ': ' + '<span class="legend-bar" ' + 'style=' + '"' + 'background-color: ' + arrayColors[i] + '"' + '>' + '</span>' + '</div>';
        }
        $(this).children('.legend').append(legend);

        // Create title markup and append it to the char area
        var titleMarkup = '<span class="main-title">' + chartTitle + '</span>' + '<span class="sub-title">' + chartSubtitle + '</span>';
        $(this).children('.chart-title').append(titleMarkup);

        //Execute chart display
        createChart(arrayData, arrayLabels, arrayColors, textToolTip, canvasId);

        // Animate chart if scrolled to
    	var inView = false;
        $(window).scroll(function() {
            if (isScrolledIntoView(canvasLocation)) {
                if (inView) { return; }
                inView = true;
                createChart(arrayData, arrayLabels, arrayColors, textToolTip, canvasId);
            } else {
                inView = false;
            }
        });
    });
});

// main-section.js *** JS for the main section of the page.

window.addEventListener("load", mainSectionJavscript);
	
	
function mainSectionJavscript() {
	
	
}
// nav.js *** JS for the nav section of the page.
	
window.addEventListener("load", navJavscript);
	
	
function navJavscript() {
	
}