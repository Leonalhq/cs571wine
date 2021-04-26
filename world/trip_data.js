
// 0: countryname, 1: count, 2: points, 3: price, 4: counrycode
dataset = {}
d3.csv("../dataset/result.csv").get(function (data) {
	//console.log(data)	
	for (var i = 0; i < data.length; i++) {
		dataset[data[i]['countrycode']] = {
			'CountryName': data[i]['Country Name'],
			'count': data[i]['count'],
			'point': data[i]['points'],
			'price': data[i]['price'],
			'winery': data[i]['winery'],
			'wine1': data[i]['wine1'],
			'wine2': data[i]['wine2'],
			'wine3': data[i]['wine3']
		}
	}
});

const colorMap_count = d3.interpolateRgb(
	d3.rgb('#fff5f0'), 
	d3.rgb('#67000d')
);

const colorMap_point = d3.interpolateRgb(
	d3.rgb('#f7fbff'),
	d3.rgb('#08306b')
);

const colorMap_price = d3.interpolateRgb(
	d3.rgb('#fcfbfd'),
	d3.rgb('#3f007d')
);


function colorCountryPoint(country) {
	if (dataset[parseInt(country.id)] != undefined){
		if (dataset[parseInt(country.id)]['point'] >= 90) {
			return colorMap_point(1);
		}
		if (dataset[parseInt(country.id)]['point'] >= 88) {
			return colorMap_point(0.8);
		}
		if (dataset[parseInt(country.id)]['point'] >= 86) {
			return colorMap_point(0.65);
		}
		if (dataset[parseInt(country.id)]['point'] >= 84) {
			return colorMap_point(0.5);
		}
		if (dataset[parseInt(country.id)]['point'] >= 82) {
			return colorMap_point(0.35);
		}
		if (dataset[parseInt(country.id)]['point'] >= 80) {
			return colorMap_point(0.2);
		}

	} else {
	
		return colorMap_point(0.1);
	}
    
};

function textCountryPoint(id){
	id_int = parseInt(id)
	if (dataset[id_int] != undefined){
		point_str = (Math.round(dataset[id_int]['point']*100)/100).toString()
		return dataset[id_int]['CountryName'] +' \n' + 'Point: ' + point_str
	}
	return 'NA';
};


function colorCountryPrice(country) {
	if (dataset[parseInt(country.id)] != undefined){
		if (dataset[parseInt(country.id)]['price'] >= 45) {
			return colorMap_price(1);
		}
		if (dataset[parseInt(country.id)]['price'] >= 40) {
			return colorMap_price(0.8);
		}
		if (dataset[parseInt(country.id)]['price'] >= 35) {
			return colorMap_price(0.65);
		}
		if (dataset[parseInt(country.id)]['price'] >= 30) {
			return colorMap_price(0.5);
		}
		if (dataset[parseInt(country.id)]['price'] >= 20) {
			return colorMap_price(0.35);
		}
		if (dataset[parseInt(country.id)]['price'] >= 10) {
			return colorMap_price(0.20);
		}

	} else {
	
		return colorMap_price(0.1);
	}
    
};

function textCountryPrice(id){
	id_int = parseInt(id)
	if (dataset[id_int] != undefined){
		point_str = (Math.round(dataset[id_int]['price']*100)/100).toString()
		return dataset[id_int]['CountryName'] +': \n' + '$' + point_str
	}
	return 'NA'
};


function colorCountryCount(country) {
	if (dataset[parseInt(country.id)] != undefined) {
		if (dataset[parseInt(country.id)]['count'] >= 20000) {
			return colorMap_count(1);
		}
		if (dataset[parseInt(country.id)]['count'] >= 10000) {
			return colorMap_count(0.9);
		}
		if (dataset[parseInt(country.id)]['count'] >= 5000) {
			return colorMap_count(0.8);
		}
		if (dataset[parseInt(country.id)]['count'] >= 2000) {
			return colorMap_count(0.7);
		}
		if (dataset[parseInt(country.id)]['count'] >= 1000) {
			return colorMap_count(0.6);
		}
		if (dataset[parseInt(country.id)]['count'] >= 500) {
			return colorMap_count(0.5);
		}
		if (dataset[parseInt(country.id)]['count'] >= 200) {
			return colorMap_count(0.4);
		}
		if (dataset[parseInt(country.id)]['count'] >= 100) {
			return colorMap_count(0.3);
		}
		if (dataset[parseInt(country.id)]['count'] >= 1) {
			return colorMap_count(0.2);
		}

	} else {
		return colorMap_count(0.1);
	}

};

function textCountryCount(id) {
	id_int = parseInt(id)
	if (dataset[id_int] != undefined) {
		count_str = (Math.round(dataset[id_int]['count'] * 100) / 100).toString()
		winery = dataset[id_int]['winery'];
		return dataset[id_int]['CountryName'] + ' \nProduction: ' + count_str + ' \n# Winery: ' + winery + 
			'\n Top Wine Variety: ' + '\n' + dataset[id_int]['wine1'] + 
			'\n' + dataset[id_int]['wine2'] + '\n' + dataset[id_int]['wine3'];
	}
	return 'NA'
};


