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


function pop_secondaryschs(feature, layer) {
    var popupContent = '<table><tr><th scope="row">Awards %</th><td>' + '&nbsp;' + Autolinker.link(String(feature.properties['awards_2013_pc_of_Max'])) + '</td></tr><tr><th scope="row">School Name</th><td>' + '&nbsp;' + toTitleCase(Autolinker.link(String(feature.properties['all_sch_15']))) + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

// Secondary Schools
function doStylesecondaryschs(feature) {
	if (feature.properties.awards_2013_pc_of_Max === null) {

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

	if (feature.properties.awards_2013_pc_of_Max >= 0.15 &&
	        feature.properties.awards_2013_pc_of_Max <= 0.3) {

	    return {
	        radius: '4.0',
	        fillColor: '#d7191c',
	        color: '#000000',
	        weight: 0.0,
	        fillOpacity: '1.0',
	        opacity: '1.0',
	        dashArray: ''
	    }
	}

	if (feature.properties.awards_2013_pc_of_Max >= 0.3 &&
	        feature.properties.awards_2013_pc_of_Max <= 0.4) {

	    return {
	        radius: '4.0',
	        fillColor: '#fdae61',
	        color: '#000000',
	        weight: 0.0,
	        fillOpacity: '1.0',
	        opacity: '1.0',
	        dashArray: ''
	    }
	}

	if (feature.properties.awards_2013_pc_of_Max >= 0.4 &&
	        feature.properties.awards_2013_pc_of_Max <= 0.5) {

	    return {
	        radius: '4.0',
	        fillColor: '#ffffc0',
	        color: '#000000',
	        weight: 0.0,
	        fillOpacity: '1.0',
	        opacity: '1.0',
	        dashArray: ''
	    }
	}

	if (feature.properties.awards_2013_pc_of_Max >= 0.5 &&
	        feature.properties.awards_2013_pc_of_Max <= 0.625) {

	    return {
	        radius: '4.0',
	        fillColor: '#a6d96a',
	        color: '#000000',
	        weight: 0.0,
	        fillOpacity: '1.0',
	        opacity: '1.0',
	        dashArray: ''
	    }
	}

	if (feature.properties.awards_2013_pc_of_Max >= 0.625 &&
	        feature.properties.awards_2013_pc_of_Max <= 0.833333) {

	    return {
	        radius: '4.0',
	        fillColor: '#1a9641',
	        color: '#000000',
	        weight: 0.0,
	        fillOpacity: '1.0',
	        opacity: '1.0',
	        dashArray: ''
	    }
	}
}
var json_secondaryschsJSON = new L.geoJson(json_secondaryschs, {
    onEachFeature: pop_secondaryschs,
    pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, doStylesecondaryschs(feature))
    }
});
    layerOrder[layerOrder.length] = json_secondaryschsJSON;

bounds_group.addLayer(json_secondaryschsJSON);
feature_group.addLayer(json_secondaryschsJSON);


function pop_NumberofStudentCareCentersinArea(feature, layer) {
    var popupContent = '<table><tr><th scope="row">Area Name: </th><td>' + '&nbsp;' + toTitleCase(Autolinker.link(String(feature.properties['PLN_AREA_N']))) + '<tr><th scope="row">Number of Student Care Centers:</th><td>' + '&nbsp;' + toTitleCase(Autolinker.link(String(feature.properties['count']))) + '</td></tr></table>';
    layer.bindPopup(popupContent);
}

function doStyleNumberofStudentCareCentersinArea(feature) {
    var colorOfProportionalSymbol = '#dc5d87';
    var baseRadius = 1.0;
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
        radius: baseRadius*feature.properties.count,
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

function pop_mrthublines(feature, layer) {
			var popupContent = '<table><tr><th scope="row">all_sch_15</th><td>' + Autolinker.link(String(feature.properties['all_sch_15'])) + '</td></tr><tr><th scope="row">address</th><td>' + Autolinker.link(String(feature.properties['address'])) + '</td></tr><tr><th scope="row">postal_cod</th><td>' + Autolinker.link(String(feature.properties['postal_cod'])) + '</td></tr><tr><th scope="row">X_ADDR</th><td>' + Autolinker.link(String(feature.properties['X_ADDR'])) + '</td></tr><tr><th scope="row">Y_ADDR</th><td>' + Autolinker.link(String(feature.properties['Y_ADDR'])) + '</td></tr><tr><th scope="row">schs</th><td>' + Autolinker.link(String(feature.properties['schs'])) + '</td></tr><tr><th scope="row">year</th><td>' + Autolinker.link(String(feature.properties['year'])) + '</td></tr><tr><th scope="row">area</th><td>' + Autolinker.link(String(feature.properties['area'])) + '</td></tr><tr><th scope="row">school</th><td>' + Autolinker.link(String(feature.properties['school'])) + '</td></tr><tr><th scope="row">school_cod</th><td>' + Autolinker.link(String(feature.properties['school_cod'])) + '</td></tr><tr><th scope="row">int_prog</th><td>' + Autolinker.link(String(feature.properties['int_prog'])) + '</td></tr><tr><th scope="row">ind_prog</th><td>' + Autolinker.link(String(feature.properties['ind_prog'])) + '</td></tr><tr><th scope="row">auto_sch</th><td>' + Autolinker.link(String(feature.properties['auto_sch'])) + '</td></tr><tr><th scope="row">sp_a_prog</th><td>' + Autolinker.link(String(feature.properties['sp_a_prog'])) + '</td></tr><tr><th scope="row">dist_prog</th><td>' + Autolinker.link(String(feature.properties['dist_prog'])) + '</td></tr><tr><th scope="row">awards_201</th><td>' + Autolinker.link(String(feature.properties['awards_201'])) + '</td></tr><tr><th scope="row">awards_2_1</th><td>' + Autolinker.link(String(feature.properties['awards_2_1'])) + '</td></tr><tr><th scope="row">awards_2_2</th><td>' + Autolinker.link(String(feature.properties['awards_2_2'])) + '</td></tr><tr><th scope="row">awards_2_3</th><td>' + Autolinker.link(String(feature.properties['awards_2_3'])) + '</td></tr><tr><th scope="row">awards_2_4</th><td>' + Autolinker.link(String(feature.properties['awards_2_4'])) + '</td></tr><tr><th scope="row">awards_2_5</th><td>' + Autolinker.link(String(feature.properties['awards_2_5'])) + '</td></tr><tr><th scope="row">awards_2_6</th><td>' + Autolinker.link(String(feature.properties['awards_2_6'])) + '</td></tr><tr><th scope="row">awards_2_7</th><td>' + Autolinker.link(String(feature.properties['awards_2_7'])) + '</td></tr><tr><th scope="row">awards_2_8</th><td>' + Autolinker.link(String(feature.properties['awards_2_8'])) + '</td></tr><tr><th scope="row">awards_2_9</th><td>' + Autolinker.link(String(feature.properties['awards_2_9'])) + '</td></tr><tr><th scope="row">awards_210</th><td>' + Autolinker.link(String(feature.properties['awards_210'])) + '</td></tr><tr><th scope="row">awards_211</th><td>' + Autolinker.link(String(feature.properties['awards_211'])) + '</td></tr><tr><th scope="row">awards_212</th><td>' + Autolinker.link(String(feature.properties['awards_212'])) + '</td></tr><tr><th scope="row">awards_213</th><td>' + Autolinker.link(String(feature.properties['awards_213'])) + '</td></tr><tr><th scope="row">nearestMRT</th><td>' + Autolinker.link(String(feature.properties['nearestMRT'])) + '</td></tr><tr><th scope="row">nearestM_1</th><td>' + Autolinker.link(String(feature.properties['nearestM_1'])) + '</td></tr></table>';
			layer.bindPopup(popupContent);
		}

		function doStylemrthublines(feature) {
			if (feature.properties.nearestM_1 >= 142.822241908 && feature.properties.nearestM_1 <= 552.482282308) {
				return {
					color: '#1a9641',
					weight: '1.3',
					opacity: '1.0',
				}
			}
			if (feature.properties.nearestM_1 >= 552.482282308 && feature.properties.nearestM_1 <= 962.142322709) {
				return {
					color: '#a6d96a',
					weight: '1.3',
					opacity: '1.0',
				}
			}
			if (feature.properties.nearestM_1 >= 962.142322709 && feature.properties.nearestM_1 <= 1371.80236311) {
				return {
					color: '#ffffc0',
					weight: '1.3',
					opacity: '1.0',
				}
			}
			if (feature.properties.nearestM_1 >= 1371.80236311 && feature.properties.nearestM_1 <= 1781.46240351) {
				return {
					color: '#fdae61',
					weight: '1.3',
					opacity: '1.0',
				}
			}
			if (feature.properties.nearestM_1 >= 1781.46240351 && feature.properties.nearestM_1 <= 2192.0) {
				return {
					color: '#d7191c',
					weight: '1.3',
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
			var popupContent = '<table><tr><th scope="row">all_sch_15</th><td>' + Autolinker.link(String(feature.properties['all_sch_15'])) + '</td></tr><tr><th scope="row">address</th><td>' + Autolinker.link(String(feature.properties['address'])) + '</td></tr><tr><th scope="row">postal_cod</th><td>' + Autolinker.link(String(feature.properties['postal_cod'])) + '</td></tr><tr><th scope="row">X_ADDR</th><td>' + Autolinker.link(String(feature.properties['X_ADDR'])) + '</td></tr><tr><th scope="row">Y_ADDR</th><td>' + Autolinker.link(String(feature.properties['Y_ADDR'])) + '</td></tr><tr><th scope="row">schs</th><td>' + Autolinker.link(String(feature.properties['schs'])) + '</td></tr><tr><th scope="row">year</th><td>' + Autolinker.link(String(feature.properties['year'])) + '</td></tr><tr><th scope="row">area</th><td>' + Autolinker.link(String(feature.properties['area'])) + '</td></tr><tr><th scope="row">school</th><td>' + Autolinker.link(String(feature.properties['school'])) + '</td></tr><tr><th scope="row">school_cod</th><td>' + Autolinker.link(String(feature.properties['school_cod'])) + '</td></tr><tr><th scope="row">int_prog</th><td>' + Autolinker.link(String(feature.properties['int_prog'])) + '</td></tr><tr><th scope="row">ind_prog</th><td>' + Autolinker.link(String(feature.properties['ind_prog'])) + '</td></tr><tr><th scope="row">auto_sch</th><td>' + Autolinker.link(String(feature.properties['auto_sch'])) + '</td></tr><tr><th scope="row">sp_a_prog</th><td>' + Autolinker.link(String(feature.properties['sp_a_prog'])) + '</td></tr><tr><th scope="row">dist_prog</th><td>' + Autolinker.link(String(feature.properties['dist_prog'])) + '</td></tr><tr><th scope="row">awards_201</th><td>' + Autolinker.link(String(feature.properties['awards_201'])) + '</td></tr><tr><th scope="row">awards_2_1</th><td>' + Autolinker.link(String(feature.properties['awards_2_1'])) + '</td></tr><tr><th scope="row">awards_2_2</th><td>' + Autolinker.link(String(feature.properties['awards_2_2'])) + '</td></tr><tr><th scope="row">awards_2_3</th><td>' + Autolinker.link(String(feature.properties['awards_2_3'])) + '</td></tr><tr><th scope="row">awards_2_4</th><td>' + Autolinker.link(String(feature.properties['awards_2_4'])) + '</td></tr><tr><th scope="row">awards_2_5</th><td>' + Autolinker.link(String(feature.properties['awards_2_5'])) + '</td></tr><tr><th scope="row">awards_2_6</th><td>' + Autolinker.link(String(feature.properties['awards_2_6'])) + '</td></tr><tr><th scope="row">awards_2_7</th><td>' + Autolinker.link(String(feature.properties['awards_2_7'])) + '</td></tr><tr><th scope="row">awards_2_8</th><td>' + Autolinker.link(String(feature.properties['awards_2_8'])) + '</td></tr><tr><th scope="row">awards_2_9</th><td>' + Autolinker.link(String(feature.properties['awards_2_9'])) + '</td></tr><tr><th scope="row">awards_210</th><td>' + Autolinker.link(String(feature.properties['awards_210'])) + '</td></tr><tr><th scope="row">awards_211</th><td>' + Autolinker.link(String(feature.properties['awards_211'])) + '</td></tr><tr><th scope="row">awards_212</th><td>' + Autolinker.link(String(feature.properties['awards_212'])) + '</td></tr><tr><th scope="row">awards_213</th><td>' + Autolinker.link(String(feature.properties['awards_213'])) + '</td></tr><tr><th scope="row">nearestMRT</th><td>' + Autolinker.link(String(feature.properties['nearestMRT'])) + '</td></tr><tr><th scope="row">nearestM_1</th><td>' + Autolinker.link(String(feature.properties['nearestM_1'])) + '</td></tr></table>';
			layer.bindPopup(popupContent);
		}

		function doStylesecondaryschwmrt(feature) {
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
			var popupContent = '<table><tr><th scope="row">STN_NAM</th><td>' + Autolinker.link(String(feature.properties['STN_NAM'])) + '</td></tr></table>';
			layer.bindPopup(popupContent);
		}

		var exp_TrainStationsJSON = new L.geoJson(exp_TrainStations,{
			onEachFeature: pop_TrainStations,
			pointToLayer: function (feature, latlng) {
				return L.circleMarker(latlng, {
					radius: 4.0,
					fillColor: '#000000',
					color: '#000000',
					weight: 1,
					opacity: 1.0,
					fillOpacity: 1.0
				})
			}
		});
		//add comment sign to hide this layer on the map in the initial view.
		feature_group.addLayer(exp_TrainStationsJSON);

		// feature_group.addTo(map);
		// var title = new L.Control();
		// title.onAdd = function (map) {
		// 	this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
		// 	this.update();
		// 	return this._div;
		// };
		// title.update = function () {
		// 	this._div.innerHTML = '<h2>This is the title</h2>This is the subtitle'
		// };
		// title.addTo(map);
		// var legend = L.control({position: 'bottomright'});
		// legend.onAdd = function (map) {
		// 	var div = L.DomUtil.create('div', 'info legend');
		// 	div.innerHTML = "<h3>Legend</h3><table></table>";
    // 		return div;
		// };
		// legend.addTo(map);

var baseMaps = {

};
L.control.layers(baseMaps,{'<img src="legend/NumberofStudentCareCentersinArea.png" /> Number of Student Care Centers in Area': json_NumberofStudentCareCentersinAreaJSON,'Secondary Schools Award Score<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/secondaryschs_015030.png" />  0.15 - 0.30 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/secondaryschs_030040.png" />  0.30 - 0.40 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/secondaryschs_040050.png" />  0.40 - 0.50 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/secondaryschs_050062.png" />  0.50 - 0.62 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/secondaryschs_062083.png" />  0.62 - 0.83 <br />': json_secondaryschsJSON,'% of Households earning > $5000/month<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/HouseholdsIncome_0236202362.png" />  0.2362 - 0.2362 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/HouseholdsIncome_0236204441.png" />  0.2362 - 0.4441 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/HouseholdsIncome_0444105439.png" />  0.4441 - 0.5439 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/HouseholdsIncome_0543906671.png" />  0.5439 - 0.6671 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/HouseholdsIncome_0667107593.png" />  0.6671 - 0.7593 <br />': json_HouseholdsIncomeJSON},{collapsed:false}).addTo(map);

L.control.scale({options: {position: 'bottomright', maxWidth: 100, metric: true, imperial: false, updateWhenIdle: false}}).addTo(map);

stackLayers();

L.control.pan({
  position: 'bottomleft'
}).addTo(map);

L.control.zoom({
  position: 'bottomleft'
}).addTo(map);
