function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

var map = L.map('map', {
    zoomControl:false, maxZoom:19, minZoom:6
}).fitBounds([[1.3502390361,103.728959122],[1.50558503756,103.966248283]]);
var hash = new L.Hash(map);
var additional_attrib = '<a href="https://github.com/tomchadwin/qgis2web" target ="_blank">qgis2web</a>';
var feature_group = new L.featureGroup([]);
var bounds_group = new L.featureGroup([]);
var basemap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: additional_attrib + ' &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
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
// function restackLayers() {
//     for (index = 0; index < layerOrder.length; index++) {
//         layerOrder[index].bringToFront();
//     }
// }
//
// map.on('overlayadd', restackLayers);

map.on('overlayadd', function(e) {
  console.log(e.name + 'is added.');
  if (e.name === 'Number of Student Care Centers in Area') {
    studentCareLegend.addTo(map);
  }
});

map.on('overlayremove', function(e) {
  console.log(e.name + 'is removed.');
  if (e.name === 'Number of Student Care Centers in Area') {
    studentCareLegend.removeFrom(map);
  }
})

layerControl = L.control.layers({},{},{collapsed:false});
function pop_HouseholdsIncome(feature, layer) {
  var popupContent = toTitleCase(Autolinker.link(String(feature.properties['PLN_AREA_N'])));
  layer.bindPopup(popupContent);
}

// Households with more than 5000 a month income

function getColor(d) {
  return d === null ? 'transparent':
         d > 0.667126 ? '#006d2c' :
         d > 0.543947 ? '#2ca25f' :
         d > 0.444079 ? '#66c2a4' :
         d > 0.236194 ? '#b2e2e2' :
                        '#edf8fb';
}
function doStyleHouseholdsIncome(feature) {
  return {
        fillColor: getColor(feature.properties.p_mt_5000),
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
layerOrder[layerOrder.length] = json_HouseholdsIncomeJSON;
bounds_group.addLayer(json_HouseholdsIncomeJSON);
feature_group.addLayer(json_HouseholdsIncomeJSON);

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
feature_group.addLayer(json_NumberofStudentCareCentersinAreaJSON);
feature_group.addTo(map);

var studentCareLegend = L.control({position: 'bottomright'})

studentCareLegend.onAdd = function (map) {
  var div = L.DomUtil.create('table', 'student-care legend'), number = [5, 10, 20, 30, 40];
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

function doStylemrthublines(feature) {
	if (feature.properties.nearestM_1 >= 142.822241908 && feature.properties.nearestM_1 <= 552.482282308) {
		return {
			color: '#1a9641',
			weight: '3',
			opacity: '1.0',
		}
	}
	if (feature.properties.nearestM_1 >= 552.482282308 && feature.properties.nearestM_1 <= 962.142322709) {
		return {
			color: '#a6d96a',
			weight: '3',
			opacity: '1.0',
		}
	}
	if (feature.properties.nearestM_1 >= 962.142322709 && feature.properties.nearestM_1 <= 1371.80236311) {
		return {
			color: '#ffffc0',
			weight: '3',
			opacity: '1.0',
		}
	}
	if (feature.properties.nearestM_1 >= 1371.80236311 && feature.properties.nearestM_1 <= 1781.46240351) {
		return {
			color: '#fdae61',
			weight: '3',
			opacity: '1.0',
		}
	}
	if (feature.properties.nearestM_1 >= 1781.46240351 && feature.properties.nearestM_1 <= 2192.0) {
		return {
			color: '#d7191c',
			weight: '3',
			opacity: '1.0',
		}
	}
}
var exp_mrthublinesJSON = new L.geoJson(exp_mrthublines,{
	onEachFeature: pop_mrthublines,
	style: doStylemrthublines
});
//add comment sign to hide this layer on the map in the initial view.
feature_group.addLayer(exp_mrthublinesJSON);
function pop_secondaryschwmrt(feature, layer) {
	var popupContent = '<table><tr><th scope="row">School Name</th><td>' + toTitleCase(Autolinker.link(String(feature.properties['all_sch_15']))) + '</td></tr><tr><th scope="row">Address</th><td>' + toTitleCase(Autolinker.link(String(feature.properties['address']))) + '</td></tr><tr><th scope="row">Postal Code</th><td>' + Autolinker.link(String(feature.properties['postal_cod'])) + '</td></tr><tr><th scope="row">Integrated Program?</th><td>' + Autolinker.link(String(feature.properties['int_prog'])) + '</td></tr><tr><th scope="row">Independent School?</th><td>' + Autolinker.link(String(feature.properties['ind_prog'])) + '</td></tr><tr><th scope="row">Autonomous School?</th><td>' + Autolinker.link(String(feature.properties['auto_sch'])) + '</td></tr><tr><th scope="row">Special Assistance Plan School?</th><td>' + Autolinker.link(String(feature.properties['sp_a_prog'])) + '</td></tr><tr><th scope="row">Distinctive Programmes</th><td>' + Autolinker.link(String(feature.properties['dist_prog'])) + '</td></tr><tr><th scope="row">Awards Score</th><td>' + Autolinker.link(String(feature.properties['awards_2_4'])) + '</td></tr><tr><th scope="row">Nearest Train Station</th><td>' + toTitleCase(Autolinker.link(String(feature.properties['nearestMRT']))) + '</td></tr><tr><th scope="row">Meters to Train Station</th><td>' + Autolinker.link(String(feature.properties['nearestM_1'])) + '</td></tr></table>';
	layer.bindPopup(popupContent);
}

// Secondary schools

function getSchColor(num) {
  return num >= 0.625 ? '#1a9641' :
         num >= 0.5 ? '#a6d96a' :
         num >= 0.4 ? '#ffffc0' :
         num >= 0.3 ? '#fdae61' :
         num >= 0.15 ? '#d7191c' :
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
feature_group.addLayer(exp_secondaryschwmrtJSON);
function pop_TrainStations(feature, layer) {
	var popupContent = toTitleCase(Autolinker.link(String(feature.properties['STN_NAM'])))
	layer.bindPopup(popupContent);
}

var trainMarker = L.ExtraMarkers.icon({
  icon: 'fa-subway',
  markerColor: 'red',
  shape: 'square',
  prefix: 'fa'
});

var exp_TrainStationsJSON = new L.geoJson(exp_TrainStations,{
	onEachFeature: pop_TrainStations,
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {
			icon: trainMarker
		})
	}
});
//add comment sign to hide this layer on the map in the initial view.
feature_group.addLayer(exp_TrainStationsJSON);

var baseMaps = {

};
L.control.layers(baseMaps,{"Train Stations": exp_TrainStationsJSON,"Secondary Schools": exp_secondaryschwmrtJSON,"Nearest Mrt from School": exp_mrthublinesJSON,'Number of Student Care Centers in Area': json_NumberofStudentCareCentersinAreaJSON, '% of Households earning > $5000/month': json_HouseholdsIncomeJSON},{collapsed:false, position: 'topleft'}).addTo(map);

L.control.scale({options: {position: 'bottomright', maxWidth: 100, metric: true, imperial: false, updateWhenIdle: false}}).addTo(map);

// stackLayers();

L.control.pan({
  position: 'bottomleft'
}).addTo(map);

L.control.zoom({
  position: 'bottomleft'
}).addTo(map);

// Search Address plugin
new L.Control.GeoSearch({
    provider: new L.GeoSearch.Provider.Google(),
    position: 'topcenter',
    showMarker: true,
    retainZoomLevel: false,
}).addTo(map);
