// Global dataset
var dataset;

// Categories
var categories  = ["Política", "Campesinos", "Indígenas", "Afro", "Paz", "Ambiente", "Tierras", "Víctimas", "Educación", "LGBTI"],
    colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"],
    filter = [true, true, true, true, true, true, true, true, true, true];

// Time parser
var parseTime = d3.timeParse("%Y-%m-%d");
var overlay = null;
drawMap();

// //Adding a custom layer from file
function drawMap(){
    if (overlay != null) { overlay.clearLayers() };
    var lideresLayer = L.geoJson(null, {
    
        filter: function(feature) {
            victimDate = new Date(feature.properties.YEAR, feature.properties.MONTH - 1, feature.properties.DAY);
            return (victimDate >= new Date(rangeStart) && victimDate <= new Date(rangeEnd));
        },

        pointToLayer: function(feature, latlng) {
            dataset = feature.properties;
            for (var i=0; i<=categories.length; i++){
                // console.log(feature.properties.CATEGORIA);

                if (feature.properties.CATEGORIA == categories[i] && filter[i] == true) {
                    // console.log(feature.properties.CATEGORIA, );
                    return circle = new L.CircleMarker(latlng, {
                        className: "circle-lider" + " circle-" + categories[i],
                        radius: 6,
                        color: colors[i],
                        // fillColor: colors[i],
                        opacity: 0.7,
                        fillOpacity: 0.4,
                        weight: 1.25,
                    });
                };
                
            }
        },

        onEachFeature: function(feature, layer) {
            var fecha = parseTime(feature.properties.FECHA);

            popupLayout = "<div class='popup-banner grid-container'>" +
                            "<div class='grid-50 mobile-grid-50 popup-counter-text'>"+feature.properties.COUNTER+"</div>" +
                            "<div class='popup-img-wrapper'><img class='popup-img' src='" +feature.properties.IMG_PATH + "'></div>" +
                          "</div>" +
                          "<div class='popup-content grid-container'>" + 
                            "<div class='grid-100 mobile-grid-100 popup-name'>"+feature.properties.NOMBRE+"</div>" +
                          "</div>" +
                          "<div class='grid-container'>" + 
                            "<div class='grid-10 mobile-grid-10 popup-text-small'><i class='fas fa-ribbon'></i></div>" +
                            "<div class='grid-90 mobile-grid-90 popup-text-small'>"+feature.properties.OCUPACION+"</div>" +
                          "</div>" + 
                          "<div class='grid-container'>" + 
                            "<div class='grid-10 mobile-grid-10 popup-text-small'><i class='far fa-calendar-alt'></i></i></div>" +
                            "<div class='grid-90 mobile-grid-90 popup-text-small'>"+feature.properties.FECHA_2+"</div>" +
                          "</div>" + 
                          "<div class='grid-container'>" + 
                            "<div class='grid-10 mobile-grid-10 popup-text-small'><i class='fas fa-map-marker-alt'></i></div>" +
                            "<div class='grid-90 mobile-grid-90 popup-text-small'>"+feature.properties.LOCACION+"</div>" +
                          "</div>" +
                          "<div class='popup-resena grid-container'>" + 
                            "<div class='grid-100 mobile-grid-100 popup-text-small'><b>Reseña</b></div>" +
                            "<div class='grid-100 mobile-grid-100 popup-text-small popup-resena-text'>"+feature.properties.TEXTO+"</div>" +
                          "</div>";


            layer.bindPopup(popupLayout, {
                    maxWidth: 300,
                    maxHeight: 400,
                    closeOnClick: true
                }
            );

            tooltipLayout = "<div class='tooltip-banner grid-container'>" +
                                "<div class='grid-100 mobile-grid-100 tooltip-text-small tooltip-counter'>"+feature.properties.COUNTER+"</div>" +
                                "<div class='grid-100 mobile-grid-100 tooltip-text-small tooltip-name'>"+feature.properties.NOMBRE+"</div>" +
                                // "<div class='grid-10 mobile-grid-10 tooltip-text-small'><i class='fas fa-map-marker-alt'></i></div>" +
                                "<div class='grid-100 mobile-grid-100 tooltip-text-small'><i class='fas fa-map-marker-alt'></i> "+feature.properties.LOCACION+"</div>" +
                            "</div>";

            layer.bindTooltip(tooltipLayout, {
                sticky: true,
                offset: [10, -10],
                direction: "top",
            });
        },
    });
    
    var myLayer = omnivore.csv('../data/data_lideres.csv', null, lideresLayer);
    overlay = L.layerGroup([lideresLayer]).addTo(map);
}


// Global variables for filtering groups
var checkbox1 = $("#check-cat1"),
    checkbox2 = $("#check-cat2"),
    checkbox3 = $("#check-cat3"),
    checkbox4 = $("#check-cat4"),
    checkbox5 = $("#check-cat5")
    checkbox6 = $("#check-cat6")
    checkbox7 = $("#check-cat7")
    checkbox8 = $("#check-cat8")
    checkbox9 = $("#check-cat9")
    checkbox10 = $("#check-cat10");

var toggleMasacresLayer = false;

// Configuration of checkboxes events
checkbox1.change(function(event) {
    var checkbox1 = event.target;
    if (checkbox1.checked) {
    filter[0] = true;
    } else {
    filter[0] = false;
    }
    drawMap();
});

checkbox2.change(function(event) {
    var checkbox2 = event.target;
    if (checkbox2.checked) {
      filter[1] = true;
    } else {
      filter[1] = false;
    }
    drawMap();
});

checkbox3.change(function(event) {
    var checkbox3 = event.target;
    if (checkbox3.checked) {
      filter[2] = true;
    } else {
      filter[2] = false;
    }
    drawMap();
});

checkbox4.change(function(event) {
    var checkbox4 = event.target;
    if (checkbox4.checked) {
      filter[3] = true;
    } else {
      filter[3] = false;
    }
    drawMap();
});

checkbox5.change(function(event) {
    var checkbox5 = event.target;
    if (checkbox5.checked) {
      filter[4] = true;
    } else {
      filter[4] = false;
    }
    drawMap();
});

checkbox6.change(function(event) {
    var checkbox6 = event.target;
    if (checkbox6.checked) {
      filter[5] = true;
    } else {
      filter[5] = false;
    }
    drawMap();
});

checkbox7.change(function(event) {
    var checkbox7 = event.target;
    if (checkbox7.checked) {
      filter[6] = true;
    } else {
      filter[6] = false;
    }
    drawMap();
});

checkbox8.change(function(event) {
    var checkbox8 = event.target;
    if (checkbox8.checked) {
      filter[7] = true;
    } else {
      filter[7] = false;
    }
    drawMap();
});

checkbox9.change(function(event) {
    var checkbox9 = event.target;
    if (checkbox9.checked) {
      filter[8] = true;
    } else {
      filter[8] = false;
    }
    drawMap();
});

checkbox10.change(function(event) {
    var checkbox10 = event.target;
    if (checkbox10.checked) {
      filter[9] = true;
    } else {
      filter[9] = false;
    }
    drawMap();
});

// Global time range variables
var rangeStart = new Date(2016, 11, 01).getTime(), 
    rangeEnd = new Date(Date.now()).getTime(),
    months = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

$(function() {
    $("#slider-range").slider({
      change: function() {
        rangeStart = $("#slider-range").slider("values", 0);
        rangeEnd = $("#slider-range").slider("values", 1);
        drawMap();
      },
      range: true,
      min: new Date(2016, 11, 01).getTime(),
      max: new Date(Date.now()).getTime(),
      step: 86400000,
      values: [new Date(2016, 11, 01).getTime(), new Date(Date.now()).getTime()],
      slide: function(event, ui) {
        var startDate = new Date(ui.values[0]).getDate() + "-" +  months[new Date(ui.values[0]).getMonth()] + "-" + new Date(ui.values[0]).getFullYear();
        var endDate = new Date(ui.values[1]).getDate() + "-" +  months[new Date(ui.values[1]).getMonth()] + "-" + new Date(ui.values[1]).getFullYear();
        // $("#slider-time-text").val(startDate + " --> " + endDate);
        $("#slider-text-start").text(startDate);
        $("#slider-text-end").text(endDate);
      }
    });
    
    var initStartDate = new Date($("#slider-range").slider("values", 0)).getDate() + "-" +  months[(new Date($("#slider-range").slider("values", 0)).getMonth())] + "-" + new Date($("#slider-range").slider("values", 0)).getFullYear();
    var initEndDate = new Date($("#slider-range").slider("values", 1)).getDate() + "-" +  months[(new Date($("#slider-range").slider("values", 1)).getMonth() + 1)] + "-" + new Date($("#slider-range").slider("values", 1)).getFullYear();

    $("#slider-text-start").text(initStartDate);
    $("#slider-text-end").text(initEndDate);
  });