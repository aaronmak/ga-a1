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
var raster_group = new L.LayerGroup([]);
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
function restackLayers() {
    for (index = 0; index < layerOrder.length; index++) {
        layerOrder[index].bringToFront();
    }
}
map.on('overlayadd', restackLayers);
layerControl = L.control.layers({},{},{collapsed:false});
function pop_HouseholdsIncome(feature, layer) {
}

// Households with more than 5000 a month income
function doStyleHouseholdsIncome(feature) {
	if (feature.properties.p_mt_5000 === null) {

	    return {
	        color: '#000000',
	        weight: '1.04',
	        dashArray: '',
	        fillColor: 'transparent',
	        opacity: '0.71',
	        fillOpacity: '0.71',
	    }
	}
	if (feature.properties.p_mt_5000 >= 0.236194 &&
	        feature.properties.p_mt_5000 <= 0.236194) {

	    return {
	        color: '#000000',
	        weight: '1.04',
	        dashArray: '',
	        fillColor: '#edf8fb',
	        opacity: '0.71',
	        fillOpacity: '0.71',
	    }
	}
	if (feature.properties.p_mt_5000 >= 0.236194 &&
	        feature.properties.p_mt_5000 <= 0.444079) {

	    return {
	        color: '#000000',
	        weight: '1.04',
	        dashArray: '',
	        fillColor: '#b2e2e2',
	        opacity: '0.71',
	        fillOpacity: '0.71',
	    }
	}
	if (feature.properties.p_mt_5000 >= 0.444079 &&
	        feature.properties.p_mt_5000 <= 0.543947) {

	    return {
	        color: '#000000',
	        weight: '1.04',
	        dashArray: '',
	        fillColor: '#66c2a4',
	        opacity: '0.71',
	        fillOpacity: '0.71',
	    }
	}
	if (feature.properties.p_mt_5000 >= 0.543947 &&
	        feature.properties.p_mt_5000 <= 0.667126) {

	    return {
	        color: '#000000',
	        weight: '1.04',
	        dashArray: '',
	        fillColor: '#2ca25f',
	        opacity: '0.71',
	        fillOpacity: '0.71',
	    }
	}
	if (feature.properties.p_mt_5000 >= 0.667126 &&
	        feature.properties.p_mt_5000 <= 0.759306) {

	    return {
	        color: '#000000',
	        weight: '1.04',
	        dashArray: '',
	        fillColor: '#006d2c',
	        opacity: '0.71',
	        fillOpacity: '0.71',
	    }
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
raster_group.addTo(map);
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

studentCareLegend.addTo(map);

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
function doStylesecondaryschwmrt(feature) {
  if (feature.properties.awards_2_4 === null) {
      return {
          radius: '4.0',
          fillColor: '#444',
          color: '#000000',
          weight: 0.0,
          fillOpacity: '1.0',
          opacity: '1.0',
          dashArray: ''
      }
  }
	if (feature.properties.awards_2_4 >= 0.15 && feature.properties.awards_2_4 <= 0.3) {
		return {
			radius: '4.0',
			fillColor: '#d7191c',
			color: '#000000',
			weight: 1,
			fillOpacity: '1.0',
		}
	}
	if (feature.properties.awards_2_4 >= 0.3 && feature.properties.awards_2_4 <= 0.4) {
		return {
			radius: '4.0',
			fillColor: '#fdae61',
			color: '#000000',
			weight: 1,
			fillOpacity: '1.0',
		}
	}
	if (feature.properties.awards_2_4 >= 0.4 && feature.properties.awards_2_4 <= 0.5) {
		return {
			radius: '4.0',
			fillColor: '#ffffc0',
			color: '#000000',
			weight: 1,
			fillOpacity: '1.0',
		}
	}
	if (feature.properties.awards_2_4 >= 0.5 && feature.properties.awards_2_4 <= 0.625) {
		return {
			radius: '4.0',
			fillColor: '#a6d96a',
			color: '#000000',
			weight: 1,
			fillOpacity: '1.0',
		}
	}
	if (feature.properties.awards_2_4 >= 0.625 && feature.properties.awards_2_4 <= 0.833333333) {
		return {
			radius: '4.0',
			fillColor: '#1a9641',
			color: '#000000',
			weight: 1,
			fillOpacity: '1.0',
		}
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
L.control.layers(baseMaps,{"Train Stations": exp_TrainStationsJSON,"Secondary Schools": exp_secondaryschwmrtJSON,"Nearest Mrt from School": exp_mrthublinesJSON,'Number of Student Care Centers in Area': json_NumberofStudentCareCentersinAreaJSON, '% of Households earning > $5000/month<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/HouseholdsIncome_0236202362.png" />  0.2362 - 0.2362 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/HouseholdsIncome_0236204441.png" />  0.2362 - 0.4441 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/HouseholdsIncome_0444105439.png" />  0.4441 - 0.5439 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/HouseholdsIncome_0543906671.png" />  0.5439 - 0.6671 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/HouseholdsIncome_0667107593.png" />  0.6671 - 0.7593 <br />': json_HouseholdsIncomeJSON},{collapsed:false}).addTo(map);

L.control.scale({options: {position: 'bottomright', maxWidth: 100, metric: true, imperial: false, updateWhenIdle: false}}).addTo(map);

stackLayers();

L.control.pan({
  position: 'bottomleft'
}).addTo(map);

L.control.zoom({
  position: 'bottomleft'
}).addTo(map);
