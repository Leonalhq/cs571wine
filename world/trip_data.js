
// 0: countryname, 1: count, 2: points, 3: price, 4: counrycode
dataset = {}
d3.csv("result.csv").get(function(data) {
	//console.log(data)	
	for (var i = 0; i < data.length; i++) {
		dataset[data[i]['countrycode']] = {'CountryName': data[i]['Country Name'], 
										'count': data[i]['count'], 
										'point': data[i]['points'], 
										'price': data[i]['price']}
	}
});


function colorCountryPoint(country) {
	if (dataset[parseInt(country.id)] != undefined){
		if (dataset[parseInt(country.id)]['point'] >= 90) {
			return '#54278f'
		}
		if (dataset[parseInt(country.id)]['point'] >= 88) {
			return '#756bb1'
		}
		if (dataset[parseInt(country.id)]['point'] >= 86) {
			return '#9e9ac8'
		}
		if (dataset[parseInt(country.id)]['point'] >= 84) {
			return '#cbc9e2'
		}
		if (dataset[parseInt(country.id)]['point'] >= 80) {
			return '#f2f0f7'
		}

	} else {
	
		return '#808080'
	}
    
};

function textCountryPoint(id){
	id_int = parseInt(id)
	if (dataset[id_int] != undefined){
		point_str = (Math.round(dataset[id_int]['point']*100)/100).toString()
		return dataset[id_int]['CountryName'] +': \n' + 'Point: ' + point_str
	}
	return 'NA'
};

function colorCountryPrice(country) {
	if (dataset[parseInt(country.id)] != undefined){
		if (dataset[parseInt(country.id)]['price'] >= 34) {
			return '#08519c'
		}
		if (dataset[parseInt(country.id)]['price'] >= 28) {
			return '#3182bd'
		}
		if (dataset[parseInt(country.id)]['price'] >= 22) {
			return '#6baed6'
		}
		if (dataset[parseInt(country.id)]['price'] >= 16) {
			return '#bdd7e7'
		}
		if (dataset[parseInt(country.id)]['price'] >= 10) {
			return '#eff3ff'
		}

	} else {
	
		return '#808080'
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


