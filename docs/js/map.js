mapAttribution = '<a href="http://cccruzr.github.io" target="blank">Camilo Cruz</a>, Datos de &copy;<a href="pacifista.co" target="blank">Pacifista</a>';

//OSM tiles attribution and URL
var osmLink = '<a href="http://openstreetmap.org">OSM</a>',
	osmURL = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	osmBWURL = 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
	osmAttrib = '©' + osmLink;

//Carto tiles attribution and URL
var cartoLink = '<a href="http://cartodb.com/attributions">CARTO</a>',
	cartoDarkURL = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png',
	cartoLightURL = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
	cartoAttrib = mapAttribution + ' | ©' + osmLink + ' ©' + cartoLink;

//Stamen Toner tiles attribution and URL
var stamenURL = 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}',
	stamenAttrib = 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> — Map data © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

//Carto Voyager
var cartoVoyager = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
	attribution: cartoAttrib,
	subdomains: 'abcd',
	maxZoom: 19
});


//Creation of map tiles
var osmMap = L.tileLayer(osmURL, {attribution: osmAttrib}),
	osmMapBW = L.tileLayer(osmBWURL, {attribution: osmAttrib}),
	cartoDark = L.tileLayer(cartoDarkURL, {attribution: cartoAttrib}),
	cartoLight = L.tileLayer(cartoLightURL, {attribution: cartoAttrib}),
	stamenMap = L.tileLayer(stamenURL,{
		attribution: stamenAttrib,
		subdomains: 'abcd',
		minZoom: 0,
		maxZoom: 20,
		ext: 'png'
	});

//Basemaps layers definition
var baseLayers = {
	"Voyager": cartoVoyager,
    "DarkMatter": cartoDark,
    "Positron": cartoLight,
};

var coordBogota = [4.711, -74.072];

// Map Creation
var map = L.map('map', {
	center: coordBogota,
	zoomControl: false,
	zoom: 6,
	layers: [cartoVoyager]
});

// map.attributionControl.addAttribution('| <a href="http://cccruzr.github.io" target="blank">Camilo Cruz</a>, Datos de <a href="pacifista.co" target="blank">Pacifista &copy;</a>');
L.control.zoom({position: "bottomright"}).addTo( map );


// Sidebar example
var sidebar = L.control.sidebar('sidebar').addTo(map);

//Add control layers to map
L.control.layers(baseLayers).addTo(map);

$("#defaultViewButton").click(function(event){
	map.setView(coordBogota, 6);
});