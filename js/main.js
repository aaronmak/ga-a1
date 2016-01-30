function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

var map = L.map('map', {
    zoomControl:true, maxZoom:19, minZoom:6
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
function pop_Households5000month(feature, layer) {
}

// Households with more than 5000 a month income
function doStyleHouseholds5000month(feature) {
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
    var json_Households5000monthJSON = new L.geoJson(json_Households5000month, {
        onEachFeature: pop_Households5000month,
        style: doStyleHouseholds5000month
    });
    layerOrder[layerOrder.length] = json_Households5000monthJSON;
bounds_group.addLayer(json_Households5000monthJSON);
feature_group.addLayer(json_Households5000monthJSON);
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

//Cycling Path
function pop_CyclingPath(feature, layer) {
}

function doStyleCyclingPath(feature) {
    return {
        weight: 1.04,
        color: '#4b6388',
        dashArray: '',
        opacity: 1.0
    };
}
    var json_CyclingPathJSON = new L.geoJson(json_CyclingPath, {
        onEachFeature: pop_CyclingPath,
        style: doStyleCyclingPath
    });
    layerOrder[layerOrder.length] = json_CyclingPathJSON;
layerOrder[layerOrder.length] = json_CyclingPathJSON;
stackLayers();
bounds_group.addLayer(json_CyclingPathJSON);
feature_group.addLayer(json_CyclingPathJSON);


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
var baseMaps = {

};
    L.control.layers(baseMaps,{'<img src="legend/NumberofStudentCareCentersinArea.png" /> Number of Student Care Centers in Area': json_NumberofStudentCareCentersinAreaJSON,'<img src="legend/CyclingPath.png" /> Cycling Path': json_CyclingPathJSON,'Secondary Schools Award Score<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/secondaryschs_015030.png" />  0.15 - 0.30 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/secondaryschs_030040.png" />  0.30 - 0.40 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/secondaryschs_040050.png" />  0.40 - 0.50 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/secondaryschs_050062.png" />  0.50 - 0.62 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/secondaryschs_062083.png" />  0.62 - 0.83 <br />': json_secondaryschsJSON,'% of Households earning > $5000/month<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/Households5000month_0236202362.png" />  0.2362 - 0.2362 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/Households5000month_0236204441.png" />  0.2362 - 0.4441 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/Households5000month_0444105439.png" />  0.4441 - 0.5439 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/Households5000month_0543906671.png" />  0.5439 - 0.6671 <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="legend/Households5000month_0667107593.png" />  0.6671 - 0.7593 <br />': json_Households5000monthJSON},{collapsed:false}).addTo(map);
L.control.scale({options: {position: 'bottomleft', maxWidth: 100, metric: true, imperial: false, updateWhenIdle: false}}).addTo(map);
stackLayers();
