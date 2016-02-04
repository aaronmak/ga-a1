function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

var map = L.map('map', {
    zoomControl:false, maxZoom:19, minZoom:6
}).fitBounds([[1.3502390361,103.728959122],[1.50558503756,103.966248283]]);
var hash = new L.Hash(map);
var feature_group = new L.featureGroup([]);
var bounds_group = new L.featureGroup([]);
var basemap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: ' &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
    maxZoom: 19
});



basemap.addTo(map);
var layerOrder = new Array();
function stackLayers() {
    for (index = 0; index < layerOrder.length; index++) {
        map.removeLayer(layerOrder[index]);
        map.addLayer(layerOrder[index]);
    }
}

map.on('overlayadd', function(e) {
  if (e.name === 'Number of Student Care Centers in Area') {
    studentCareLegend.addTo(map);
  }
  if (e.name === 'Secondary Schools') {
    schoolLegend.addTo(map);
  }
  if (e.name === 'Distance of Nearest Train Station from School') {
    trainDistLegend.addTo(map);
  }
  if (e.name === '% of Households earning > $5000/month') {
    incomeLegend.addTo(map);
    choroplethControl.addTo(map);
  }
});

map.on('overlayremove', function(e) {
  if (e.name === 'Number of Student Care Centers in Area') {
    studentCareLegend.removeFrom(map);
  }
  if (e.name === 'Secondary Schools') {
    schoolLegend.removeFrom(map);
  }
  if (e.name === 'Distance of Nearest Train Station from School') {
    trainDistLegend.removeFrom(map);
  }
  if (e.name === '% of Households earning > $5000/month') {
    incomeLegend.removeFrom(map);
    choroplethControl.removeFrom(map);
  }
})

layerControl = L.control.layers({},{},{collapsed:false});
function pop_HouseholdsIncome(feature, layer) {
  var popupContent = toTitleCase(Autolinker.link(String(feature.properties['PLN_AREA_N'])));
  layer.bindPopup(popupContent);
}

// Households with more than 5000 a month income

function getIncomeColor(d) {
  return d === null ? 'transparent':
         d > 0.667 ? '#006d2c' :
         d > 0.543 ? '#2ca25f' :
         d > 0.444 ? '#66c2a4' :
         d > 0.236 ? '#b2e2e2' :
                        '#edf8fb';
}

// function getIncomeColor(colorbrewer,colorScheme,classes,d) {
//   return d === null ? 'transparent':
//          d > 0.667 ? colorbrewer.colorScheme[classes][classes-1] :
//          d > 0.543 ? colorbrewer.colorScheme[classes][classes-2] :
//          d > 0.444 ? colorbrewer.colorScheme[classes][classes-3] :
//          d > 0.236 ? colorbrewer.colorScheme[classes][classes-4] :
//                         colorbrewer.colorScheme[classes][classes-5];
// }

function doStyleHouseholdsIncome(feature) {
  return {
        fillColor: getIncomeColor(feature.properties.p_mt_5000),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '5',
        fillOpacity: 0.7
  }
}
var json_HouseholdsIncomeJSON = new L.geoJson(json_HouseholdsIncome, {
    onEachFeature: pop_HouseholdsIncome,
    style: doStyleHouseholdsIncome
});

var incomeLegend = L.control({position: 'bottomright'});

incomeLegend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'income legend'),
  percent = [0,0.236, 0.444, 0.543, 0.667];
  div.innerHTML += '<p>% of Households<br>earning >$5000/mth</p>'

  for (i=0;i<percent.length;i++) {
    div.innerHTML +=
    '<i style="background:' + getIncomeColor(percent[i]+0.01) + '"></i> ' +
          percent[i] + (percent[i + 1] ? '&ndash;' + percent[i + 1] + '<br>' : '+');
  }
  return div;
}

var choroplethControl = L.control({position: 'topleft'});

// choroplethControl.onAdd = function(map) {
//   var div = L.DomUtil.create('div', 'choropleth control')
//
//   div.innerHTML += '<h5>Map Control</h5><br>';
//
//   div.innerHTML += '<label>Color</label><div id="chForm"><select id="colorScheme"><option value="Greens">Green</option><option value="Reds">Red</option><option value="Oranges">Orange</option><option value="Blues">Blue</option></select></div>'
//
//   return div;
// }

// 
// var bindData = $("#chForm").my({ui:{
//   "#colorScheme": { bind: "colorScheme" }
// }},choloplethData);
//
// var choloplethData = {
//   colorScheme: "Greens"
// }

layerOrder[layerOrder.length] = json_HouseholdsIncomeJSON;
// bounds_group.addLayer(json_HouseholdsIncomeJSON);
// feature_group.addLayer(json_HouseholdsIncomeJSON);

// Student Care Centers in Area

function pop_NumberofStudentCareCentersinArea(feature, layer) {
    var popupContent = '<table><tr><th scope="row">Area Name: </th><td>' + '&nbsp;' + toTitleCase(Autolinker.link(String(feature.properties['PLN_AREA_N']))) + '<tr><th scope="row">Number of Student Care Centers:</th><td>' + '&nbsp;' + toTitleCase(Autolinker.link(String(feature.properties['count']))) + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

var colorOfProportionalSymbol = '#dc5d87';
var scaleFactor = 50.0;

function doStyleNumberofStudentCareCentersinArea(feature) {
    if (feature.properties.count === null) {
      return {
					radius: 4.0,
	        fillColor: 'transparent',
	        color: '#000000',
	        weight: 0.0,
	        opacity: 1.0,
	        dashArray: '',
	        fillOpacity: 0.75
			}
		} else {
      return {
        radius: Math.sqrt(scaleFactor * (feature.properties.count) / Math.PI),
        fillColor: colorOfProportionalSymbol,
        color: '#000000',
        weight: 0.0,
        opacity: 1.0,
        dashArray: '',
        fillOpacity: 0.75
      }
    }

}


function doPointToLayerNumberofStudentCareCentersinArea(feature, latlng) {
    return L.circleMarker(latlng, doStyleNumberofStudentCareCentersinArea(feature))
}
var json_NumberofStudentCareCentersinAreaJSON = new L.geoJson(json_NumberofStudentCareCentersinArea, {
    onEachFeature: pop_NumberofStudentCareCentersinArea,
    style: doStyleNumberofStudentCareCentersinArea,
    pointToLayer: doPointToLayerNumberofStudentCareCentersinArea
    });
layerOrder[layerOrder.length] = json_NumberofStudentCareCentersinAreaJSON;

bounds_group.addLayer(json_NumberofStudentCareCentersinAreaJSON);
// feature_group.addLayer(json_NumberofStudentCareCentersinAreaJSON);
feature_group.addTo(map);

var studentCareLegend = L.control({position: 'bottomright'});

studentCareLegend.onAdd = function (map) {
  var div = L.DomUtil.create('table', 'student-care legend'), number = [5, 10, 20, 30, 40];
  div.innerHTML += '<tr><td colspan="2" style="font-weight: 700;">Number of Student<br> Care Centers in Area</td></tr>'
  for (var i=0; i<number.length; i++ ) {
    var width = Math.sqrt(number[i]*scaleFactor/Math.PI)*2;
    div.innerHTML +=
      '<tr class="legend-container">' +
        '<td><i class="prop-symbol" style="background:' + colorOfProportionalSymbol + '; width:'+ width + 'px;' + ' height:'+ width + 'px;' + '"></i>' + '</td>'+
        '<td>' + number[i] + '</td>'+
      '</tr>'

  }
  return div;
};

// MRT Hub lines
function pop_mrthublines(feature, layer) {
	var popupContent = '<table><tr><th scope="row">School Name</th><td>' + toTitleCase(Autolinker.link(String(feature.properties['all_sch_15']))) + '</td></tr><tr><th scope="row">Nearest Train Station</th><td>' + toTitleCase(Autolinker.link(String(feature.properties['nearestMRT']))) + '</td></tr><tr><th scope="row">Meters from Train Station</th><td>' + Autolinker.link(String(feature.properties['nearestM_1'])) + '</td></tr></table>';
	layer.bindPopup(popupContent);
}

function getLineColor(num) {
  return num >= 1781.5 ? '#d7191c' :
         num >= 1371.8 ? '#fdae61' :
         num >= 962.2 ? '#ffffc0' :
         num >= 552.5 ? '#a6d96a' :
                '#1a9641';
}

function doStylemrthublines(feature) {
  return {
    color: getLineColor(feature.properties.nearestM_1),
    weight: '3',
    opacity: '1.0'
  }
}

var exp_mrthublinesJSON = new L.geoJson(exp_mrthublines,{
	onEachFeature: pop_mrthublines,
	style: doStylemrthublines
});
//add comment sign to hide this layer on the map in the initial view.
// feature_group.addLayer(exp_mrthublinesJSON);

//Train distance legend
var trainDistLegend = L.control ({
  position: 'bottomright'
});

trainDistLegend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'train legend'),
  distances = [0,552.5,962.2,1371.8,1781.5];

  div.innerHTML += '<p>Nearest Train Station<br>from School (m)</p>'

  for (i=0;i<distances.length;i++) {
    div.innerHTML +=
    '<i style="background:' + getLineColor(distances[i]+0.01) + '"></i> ' +
          distances[i] + (distances[i + 1] ? '&ndash;' + distances[i + 1] + '<br>' : '+');
  }
  return div;
}

// Secondary schools

function pop_secondaryschwmrt(feature, layer) {
	var popupContent = '<table><tr><th scope="row">School Name</th><td>' + toTitleCase(Autolinker.link(String(feature.properties['all_sch_15']))) + '</td></tr><tr><th scope="row">Address</th><td>' + toTitleCase(Autolinker.link(String(feature.properties['address']))) + '</td></tr><tr><th scope="row">Postal Code</th><td>' + Autolinker.link(String(feature.properties['postal_cod'])) + '</td></tr><tr><th scope="row">Integrated Program?</th><td>' + Autolinker.link(String(feature.properties['int_prog'])) + '</td></tr><tr><th scope="row">Independent School?</th><td>' + Autolinker.link(String(feature.properties['ind_prog'])) + '</td></tr><tr><th scope="row">Autonomous School?</th><td>' + Autolinker.link(String(feature.properties['auto_sch'])) + '</td></tr><tr><th scope="row">Special Assistance Plan School?</th><td>' + Autolinker.link(String(feature.properties['sp_a_prog'])) + '</td></tr><tr><th scope="row">Distinctive Programmes</th><td>' + Autolinker.link(String(feature.properties['dist_prog'])) + '</td></tr><tr><th scope="row">Awards Score</th><td>' + Autolinker.link(String(feature.properties['awards_2_4'])) + '</td></tr><tr><th scope="row">Nearest Train Station</th><td>' + toTitleCase(Autolinker.link(String(feature.properties['nearestMRT']))) + '</td></tr><tr><th scope="row">Meters to Train Station</th><td>' + Autolinker.link(String(feature.properties['nearestM_1'])) + '</td></tr></table>';
	layer.bindPopup(popupContent);
}

function getSchColor(num) {
  return num === null ? 'grey':
         num >= 0.625 ? '#1a9641' :
         num >= 0.5 ? '#a6d96a' :
         num >= 0.4 ? '#ffffc0' :
         num >= 0.3 ? '#fdae61' :
         num >= 0 ? '#d7191c' :
                       'grey';
}

function doStylesecondaryschwmrt(feature) {
  return {
    radius: '4.0',
    fillColor: getSchColor(feature.properties.awards_2_4),
    color: '#000000',
    weight: 1.0,
    fillOpacity: '1.0',
    opacity: '1.0'
  }
}
  var exp_secondaryschwmrtJSON = new L.geoJson(exp_secondaryschwmrt,{
	onEachFeature: pop_secondaryschwmrt,
	pointToLayer: function (feature, latlng) {
		return L.circleMarker(latlng, doStylesecondaryschwmrt(feature))
	}
});

//add comment sign to hide this layer on the map in the initial view.
// feature_group.addLayer(exp_secondaryschwmrtJSON);

// Secondary schoool legend
var schoolLegend = L.control ({
  position: 'bottomright'
});

schoolLegend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'school legend'),
  scores = [0,0.3,0.4,0.5,0.625]

  div.innerHTML += '<p>School Award Score</p>';
  div.innerHTML += '<i style="background:' + getSchColor(null) + '"></i> ' + 'Special Programme School<br>';

  for (i=0;i<scores.length;i++) {
    div.innerHTML +=
    '<i style="background:' + getSchColor(scores[i]+0.01) + '"></i> ' +
          scores[i] + (scores[i + 1] ? '&ndash;' + scores[i + 1] + '<br>' : '+<br><br>');
  }

  div.innerHTML += '<span>School Award Score is calculated based<br>on 2013 School Excellence Awards</span>'
  return div;
}

function pop_TrainStations(feature, layer) {
	var popupContent = toTitleCase(Autolinker.link(String(feature.properties['STN_NAM'])))
	layer.bindPopup(popupContent);
}



function trainMarker(feature) {
  var marker = L.ExtraMarkers.icon({
    icon: 'fa-subway',
    markerColor: feature.properties.color,
    shape: 'square',
    prefix: 'fa'
  });
  return marker;
}

var exp_TrainStationsJSON = new L.geoJson(exp_TrainStations,{
	onEachFeature: pop_TrainStations,
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: trainMarker(feature)
		})
	}
});
//add comment sign to hide this layer on the map in the initial view.
// feature_group.addLayer(exp_TrainStationsJSON);

var baseMaps = {

};
L.control.layers(baseMaps,{"Train Stations": exp_TrainStationsJSON,"Secondary Schools": exp_secondaryschwmrtJSON,"Distance of Nearest Train Station from School": exp_mrthublinesJSON,'Number of Student Care Centers in Area': json_NumberofStudentCareCentersinAreaJSON, '% of Households earning > $5000/month': json_HouseholdsIncomeJSON},{collapsed:false, position: 'topleft'}).addTo(map);

L.control.scale({options: {position: 'bottomright', maxWidth: 100, metric: true, imperial: false, updateWhenIdle: false}}).addTo(map);


L.control.pan({
  position: 'bottomleft'
}).addTo(map);

// Search Address plugin
new L.Control.GeoSearch({
    provider: new L.GeoSearch.Provider.Google(),
    position: 'topright',
    showMarker: true,
    retainZoomLevel: false,
}).addTo(map);

L.control.zoom({
  position: 'topright'
}).addTo(map);
