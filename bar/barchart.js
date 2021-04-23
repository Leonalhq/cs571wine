function loadData(d, i) {
	return {
		//category + count
        category: d.Category,
		popularity_c: Number(d.Popularity_c),
		popularity_price: Number(d.Popularity_price),
		popularity_rating: Number(d.Popularity_rating),
        top: i + 1,

        //country + count
        country: d.Country,
		produce: Number(d.Produce),

		//flavor(variety) + count
		flavor: d.Flavor,
		popularity_f: Number(d.Popularity_f),

		//Variety + Price
		variety_p: d.Variety_p,
		price: Number(d.Price),
		price_rating: Number(d.Price_rating),

		//Variety + rating
		variety_r: d.Variety_r,
		rating: Number(d.Rating),
		rating_price: Number(d.Rating_price),

		//taster, count, point
		taster: d.Taster,
		taster_count: Number(d.Taster_count),
		taster_point: Number(d.Taster_point),

		//Variety + performance ratio
		variety_pr: d.Variety_pr,
		ratio: Number(d.Ratio)
    };
}

function select_operator(operator, data) {
	if (operator == "CategoryAndPopularity") {
		operator_category_popularity();
		presentCategoryAndPopularity(data);
	} else if (operator == "CountryAndProduce") {
		operator_country_produce();
		presentCountryAndProduce(data);
	} else if (operator == "FlavorAndPopularity") {
		operator_flavor_popularity();
		presentFlavorAndPopularity(data);
	} else if (operator == "VarietyAndPrice") {
		operator_variety_price();
		presentVarietyAndPrice(data);
	} else if (operator == "VarietyAndRating") {
		operator_variety_rating();
		presentVarietyAndRating(data);
	} else if (operator == "TasterAnalysis") {
		operator_taster_analysis();
		presentTasterAndAnalysis(data);
    }else if (operator == "VarietyAndPP") {
		operator_variety_pp();
		presentVarietyAndPP(data);
    }
}

function remove_operator(operator) {
	if (operator == "CategoryAndPopularity") {
		remove_category_popularity();
	} else if (operator == "CountryAndProduce") {
		remove_country_produce();
	} else if (operator == "FlavorAndPopularity") {
		remove_flavor_popularity();
	} else if (operator == "VarietyAndPrice") {
		remove_variety_price();
	} else if (operator == "VarietyAndRating") {
		remove_variety_rating();
	} else if (operator == "TasterAnalysis") {
		remove_taster_analysis();
    }else if (operator == "PricePerformance") {
		remove_variety_pp();
	}
}


//category and popularity
function operator_category_popularity() {
	d3.select("body").append("select").attr("id", "top");
	d3.select("#top").append("option").attr("value", "top100").text("top100");
	d3.select("#top").append("option").attr("value", "top10").text("top10");
	d3.select("#top").append("option").attr("value", "top30").text("top30");
	d3.select("#top").append("option").attr("value", "top50").text("top50");
}

function remove_category_popularity() {
	d3.select("#top").remove();
	d3.select("#app").remove();
}

function presentCategoryAndPopularity(data) {
	var operation = "top100";
	var dataset = data.slice(0, 100);
	var container = d3.select("body").append("svg").attr("width", 500).attr("height", 400).attr("id", "app");

	const xScale = d3.scaleBand()
		.domain(d3.range(dataset.length))
		.range([0, SVG_WIDTH - MARGIN.LEFT - MARGIN.RIGHT])
		.paddingInner(0.1);
	const yScale = d3.scaleLinear()
		.domain([0, d3.max(dataset, function (d) { return d.popularity_c; })])
		.range([SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM, 0]);

	var axisBottom = d3.axisBottom(xScale);
	axisBottom(
		container.append('g')
			.attr('class', 'xaxis')
			.attr("transform", "translate(" + MARGIN.LEFT + "," + (SVG_HEIGHT - MARGIN.TOP) + ")")
	);
	var axisLeft = d3.axisLeft(yScale);
	axisLeft(
		container.append('g')
			.attr('class', 'yaxis')
			.attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")")
	);
	var showticks = false;
	d3.select(".xaxis").selectAll('text').data(dataset)
		.text((d) => { if (showticks) { return d.top; } else { return ""; } });

	container.selectAll('rect')
		.data(dataset)
		.enter()
		.append('rect')
		.classed('bar', true)
		.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
		.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
		.attr('width', function (d, i) { return xScale.bandwidth(); })
		.attr('height', function (d) { return 0; })
		.transition()
		.duration(1000)
		.delay(function (d, i) { return 50 * i; })
		.attr('y', function (d, i) { return yScale(d.popularity_c) + MARGIN.TOP; })
		.attr('height', function (d) {
			return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.popularity_c);
		})

	d3.selectAll('rect')
		.on("mouseover", function (d) {
			d3.select(this)
				.append("title")
				.text(function (d) {
					return "top-" + d.top + " \ncategory: " + d.category + " \npopularity: " + d.popularity_c + " \navg price: " + d.popularity_price + " \navg rating: " + d.popularity_rating;
				});
		})

	//on click, change to present top10/30/50/100
	d3.selectAll("#top")
		.on("click", function () {
			//select top10 or top30 or top50 or top100
			var new_operation = this.value;
			if (new_operation != operation) {
				if (new_operation == "top10") {
					dataset = data.slice(0, 10);
					showticks = true;
				} else if (new_operation == "top30") {
					dataset = data.slice(0, 30);
					showticks = true;
				} else if (new_operation == "top50") {
					dataset = data.slice(0, 50);
					showticks = false;
				} else {
					dataset = data.slice(0, 100);
					showticks = false;
				}
				//rescale the x- y-axis
				xScale.domain(d3.range(dataset.length));
				yScale.domain([0, d3.max(dataset, function (d) { return d.popularity_c; })]);
				container.select('.xaxis')
					.transition()
					.duration(1500)
					.call(axisBottom);
				container.select('.yaxis')
					.call(axisLeft);
				d3.select(".xaxis").selectAll('text').data(dataset).transition()
					.text((d) => { if (showticks) { return d.top; } else { return ""; } });
				//reset the rects
				d3.selectAll('rect').remove();
				container.selectAll('rect')
					.data(dataset)
					.enter()
					.append('rect')
					.classed('bar', true)
					.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
					.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
					.attr('width', function (d, i) { return xScale.bandwidth(); })
					.attr('height', function (d) { return 0; })
					.transition()
					.duration(1000)
					.delay(function (d, i) { return 50 * i; })
					.attr('y', function (d, i) { return yScale(d.popularity_c) + MARGIN.TOP; })
					.attr('height', function (d) {
						return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.popularity_c);
					})
				d3.selectAll('rect')
					.on("mouseover", function (d) {
						d3.select(this)
							.append("title")
							.text(function (d) {
								return "top-" + d.top + " \ncategory: " + d.category + " \npopularity: " + d.popularity_c + " \navg price: " + d.popularity_price + " \navg rating: " + d.popularity_rating;
							});
					})
				operation = new_operation;
            }
		})
}

//country and produce
function operator_country_produce() {
	d3.select("body").append("select").attr("id", "top");
	d3.select("#top").append("option").attr("value", "all").text("all");
	d3.select("#top").append("option").attr("value", "top10").text("top10");
	d3.select("#top").append("option").attr("value", "top1020").text("top10-20");
	d3.select("#top").append("option").attr("value", "top2030").text("top20-30");
	d3.select("#top").append("option").attr("value", "top3044").text("top30-44");
}

function remove_country_produce() {
	d3.select("#top").remove();
	d3.select("#app").remove();
}

function presentCountryAndProduce(data) {
	var operation = "all";
	var dataset = data.slice(0, 44);
	var container = d3.select("body").append("svg").attr("width", 500).attr("height", 400).attr("id", "app");

	const xScale = d3.scaleBand()
		.domain(d3.range(dataset.length))
		.range([0, SVG_WIDTH - MARGIN.LEFT - MARGIN.RIGHT])
		.paddingInner(0.1);
	const yScale = d3.scaleLinear()
		.domain([0, d3.max(dataset, function (d) { return d.produce; })])
		.range([SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM, 0]);

	var axisBottom = d3.axisBottom(xScale);
	axisBottom(
		container.append('g')
			.attr('class', 'xaxis')
			.attr("transform", "translate(" + MARGIN.LEFT + "," + (SVG_HEIGHT - MARGIN.TOP) + ")")
	);
	var axisLeft = d3.axisLeft(yScale);
	axisLeft(
		container.append('g')
			.attr('class', 'yaxis')
			.attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")")
	);
	var showticks = false;
	d3.select(".xaxis").selectAll('text').data(dataset)
		.text((d) => { if (showticks) { return d.top; } else { return ""; } });

	container.selectAll('rect')
		.data(dataset)
		.enter()
		.append('rect')
		.classed('bar', true)
		.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
		.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
		.attr('width', function (d, i) { return xScale.bandwidth(); })
		.attr('height', function (d) { return 0; })
		.transition()
		.duration(1000)
		.delay(function (d, i) { return 50 * i; })
		.attr('y', function (d, i) { return yScale(d.produce) + MARGIN.TOP; })
		.attr('height', function (d) {
			return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.produce);
		})

	d3.selectAll('rect')
		.on("mouseover", function (d) {
			d3.select(this)
				.append("title")
				.text(function (d) {
					return "top-" + d.top + " \n" + d.country + " \n" + d.produce;
				});
		})

	//on click, change to present top10/11-20/21-30/31-44/all
	d3.selectAll("#top")
		.on("click", function () {
			//select top to present
			var new_operation = this.value;
			if (new_operation != operation) {
				if (new_operation == "top10") {
					dataset = data.slice(0, 10);
					showticks = true;
				} else if (new_operation == "top1020") {
					dataset = data.slice(10, 20);
					showticks = true;
				} else if (new_operation == "top2030") {
					dataset = data.slice(20, 30);
					showticks = true;
				} else if (new_operation == "top3044") {
					dataset = data.slice(30, 44);
					showticks = true;
				} else {
					dataset = data.slice(0, 44);
					showticks = false;
				}
				//rescale the x- y-axis
				xScale.domain(d3.range(dataset.length));
				yScale.domain([0, d3.max(dataset, function (d) { return d.produce; })]);
				container.select('.xaxis')
					.transition()
					.duration(1500)
					.call(axisBottom);
				container.select('.yaxis')
					.transition()
					.duration(1000)
					.call(axisLeft);
				d3.select(".xaxis").selectAll('text').data(dataset).transition()
					.text((d) => { if (showticks) { return d.top; } else { return ""; } });
				//reset the rects
				d3.selectAll('rect').remove();
				container.selectAll('rect')
					.data(dataset)
					.enter()
					.append('rect')
					.classed('bar', true)
					.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
					.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
					.attr('width', function (d, i) { return xScale.bandwidth(); })
					.attr('height', function (d) { return 0; })
					.transition()
					.duration(1000)
					.delay(function (d, i) { return 50 * i; })
					.attr('y', function (d, i) { return yScale(d.produce) + MARGIN.TOP; })
					.attr('height', function (d) {
						return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.produce);
					})
				d3.selectAll('rect')
					.on("mouseover", function (d) {
						d3.select(this)
							.append("title")
							.text(function (d) {
								return "top-" + d.top + " \n" + d.country + " \n" + d.produce;
							});
					})
				operation = new_operation;
            }
		})
}

//flavor and popularity
function operator_flavor_popularity() {
	d3.select("body").append("select").attr("id", "top");
	d3.select("#top").append("option").attr("value", "top100").text("top100");
	d3.select("#top").append("option").attr("value", "top10").text("top10");
	d3.select("#top").append("option").attr("value", "top30").text("top30");
	d3.select("#top").append("option").attr("value", "top50").text("top50");
}

function remove_flavor_popularity() {
	d3.select("#top").remove();
	d3.select("#app").remove();
}

function presentFlavorAndPopularity(data) {
	var operation = "top100";
	var dataset = data.slice(0, 100);
	var container = d3.select("body").append("svg").attr("width", 500).attr("height", 400).attr("id", "app");

	const xScale = d3.scaleBand()
		.domain(d3.range(dataset.length))
		.range([0, SVG_WIDTH - MARGIN.LEFT - MARGIN.RIGHT])
		.paddingInner(0.1);
	const yScale = d3.scaleLinear()
		.domain([0, d3.max(dataset, function (d) { return d.popularity_f; })])
		.range([SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM, 0]);

	var axisBottom = d3.axisBottom(xScale);
	axisBottom(
		container.append('g')
			.attr('class', 'xaxis')
			.attr("transform", "translate(" + MARGIN.LEFT + "," + (SVG_HEIGHT - MARGIN.TOP) + ")")
	);
	var axisLeft = d3.axisLeft(yScale);
	axisLeft(
		container.append('g')
			.attr('class', 'yaxis')
			.attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")")
	);
	var showticks = false;
	d3.select(".xaxis").selectAll('text').data(dataset)
		.text((d) => { if (showticks) { return d.top; } else { return ""; } });

	container.selectAll('rect')
		.data(dataset)
		.enter()
		.append('rect')
		.classed('bar', true)
		.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
		.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
		.attr('width', function (d, i) { return xScale.bandwidth(); })
		.attr('height', function (d) { return 0; })
		.transition()
		.duration(1000)
		.delay(function (d, i) { return 50 * i; })
		.attr('y', function (d, i) { return yScale(d.popularity_f) + MARGIN.TOP; })
		.attr('height', function (d) {
			return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.popularity_f);
		})

	d3.selectAll('rect')
		.on("mouseover", function (d) {
			d3.select(this)
				.append("title")
				.text(function (d) {
					return "top-" + d.top + " \n" + d.flavor + " \n" + d.popularity_f;
				});
		})

	//on click, change to present top10/30/50/100
	d3.selectAll("#top")
		.on("click", function () {
			//select top10 or top30 or top50 or top100
			var new_operation = this.value;
			if (new_operation != operation) {
				if (new_operation == "top10") {
					dataset = data.slice(0, 10);
					showticks = true;
				} else if (new_operation == "top30") {
					dataset = data.slice(0, 30);
					showticks = true;
				} else if (new_operation == "top50") {
					dataset = data.slice(0, 50);
					showticks = false;
				} else {
					dataset = data.slice(0, 100);
					showticks = false;
				}
				//rescale the x- y-axis
				xScale.domain(d3.range(dataset.length));
				yScale.domain([0, d3.max(dataset, function (d) { return d.popularity_f; })]);
				container.select('.xaxis')
					.transition()
					.duration(1500)
					.call(axisBottom);
				container.select('.yaxis')
					.call(axisLeft);
				d3.select(".xaxis").selectAll('text').data(dataset).transition()
					.text((d) => { if (showticks) { return d.top; } else { return ""; } });
				//reset the rects
				d3.selectAll('rect').remove();
				container.selectAll('rect')
					.data(dataset)
					.enter()
					.append('rect')
					.classed('bar', true)
					.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
					.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
					.attr('width', function (d, i) { return xScale.bandwidth(); })
					.attr('height', function (d) { return 0; })
					.transition()
					.duration(1000)
					.delay(function (d, i) { return 50 * i; })
					.attr('y', function (d, i) { return yScale(d.popularity_f) + MARGIN.TOP; })
					.attr('height', function (d) {
						return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.popularity_f);
					})
				d3.selectAll('rect')
					.on("mouseover", function (d) {
						d3.select(this)
							.append("title")
							.text(function (d) {
								return "top-" + d.top + " \n" + d.flavor + " \n" + d.popularity_f;
							});
					})
				operation = new_operation;
            }
		})
}

//variety and price
function operator_variety_price() {
	d3.select("body").append("select").attr("id", "top");
	d3.select("#top").append("option").attr("value", "top100").text("top100");
	d3.select("#top").append("option").attr("value", "top10").text("top10");
	d3.select("#top").append("option").attr("value", "top30").text("top30");
	d3.select("#top").append("option").attr("value", "top50").text("top50");
	d3.select("#top").append("option").attr("value", "top50100").text("top50-100");
	d3.select("#top").append("option").attr("value", "top70100").text("top70-100");
	d3.select("#top").append("option").attr("value", "top90100").text("top90-100");
}

function remove_variety_price() {
	d3.select("#top").remove();
	d3.select("#app").remove();
}

function presentVarietyAndPrice(data) {
	var operation = "top100";
	var dataset = data.slice(0, 100);
	var container = d3.select("body").append("svg").attr("width", 500).attr("height", 400).attr("id", "app");

	const xScale = d3.scaleBand()
		.domain(d3.range(dataset.length))
		.range([0, SVG_WIDTH - MARGIN.LEFT - MARGIN.RIGHT])
		.paddingInner(0.1);
	const yScale = d3.scaleLinear()
		.domain([d3.min(dataset, function (d) { return d.price; })/(10/9), d3.max(dataset, function (d) { return d.price; })])
		.range([SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM, 0]);

	var axisBottom = d3.axisBottom(xScale);
	axisBottom(
		container.append('g')
			.attr('class', 'xaxis')
			.attr("transform", "translate(" + MARGIN.LEFT + "," + (SVG_HEIGHT - MARGIN.TOP) + ")")
	);
	var axisLeft = d3.axisLeft(yScale);
	axisLeft(
		container.append('g')
			.attr('class', 'yaxis')
			.attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")")
	);
	var showticks = false;
	d3.select(".xaxis").selectAll('text').data(dataset)
		.text((d) => { if (showticks) { return d.top; } else { return ""; } });

	container.selectAll('rect')
		.data(dataset)
		.enter()
		.append('rect')
		.classed('bar', true)
		.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
		.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
		.attr('width', function (d, i) { return xScale.bandwidth(); })
		.attr('height', function (d) { return 0; })
		.transition()
		.duration(1000)
		.delay(function (d, i) { return 50 * i; })
		.attr('y', function (d, i) { return yScale(d.price) + MARGIN.TOP; })
		.attr('height', function (d) {
			return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.price);
		})

	d3.selectAll('rect')
		.on("mouseover", function (d) {
			d3.select(this)
				.append("title")
				.text(function (d) {
					return "top-" + d.top + " \nvariety: " + d.variety_p + " \nprice: " + d.price + " \navg rating: " + d.price_rating + " \navg price_performance_ratio: " + (d.price_rating / d.price).toFixed(2);
				});
		})

	//on click, change to present top10/30/50/100
	d3.selectAll("#top")
		.on("click", function () {
			//select top10 or top30 or top50 or top100
			var new_operation = this.value;
			if (new_operation != operation) {
				if (new_operation == "top10") {
					dataset = data.slice(0, 10);
					showticks = true;
				} else if (new_operation == "top30") {
					dataset = data.slice(0, 30);
					showticks = true;
				} else if (new_operation == "top50") {
					dataset = data.slice(0, 50);
					showticks = false;
				} else if (new_operation == "top50100") {
					dataset = data.slice(50, 100);
					showticks = false;
				} else if (new_operation == "top70100") {
					dataset = data.slice(70, 100);
					showticks = true;
				} else if (new_operation == "top90100") {
					dataset = data.slice(90, 100);
					showticks = true;
				} else {
					dataset = data.slice(0, 100);
					showticks = false;
				}
				//rescale the x- y-axis
				xScale.domain(d3.range(dataset.length));
				yScale.domain([d3.min(dataset, function (d) { return d.price; }) / (10 / 9), d3.max(dataset, function (d) { return d.price; })]);
				container.select('.xaxis')
					.transition()
					.duration(1500)
					.call(axisBottom);
				container.select('.yaxis')
					.transition()
					.duration(1000)
					.call(axisLeft);
				d3.select(".xaxis").selectAll('text').data(dataset).transition()
					.text((d) => { if (showticks) { return d.top; } else { return ""; } });
				//reset the rects
				d3.selectAll('rect').remove();
				container.selectAll('rect')
					.data(dataset)
					.enter()
					.append('rect')
					.classed('bar', true)
					.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
					.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
					.attr('width', function (d, i) { return xScale.bandwidth(); })
					.attr('height', function (d) { return 0; })
					.transition()
					.duration(1000)
					.delay(function (d, i) { return 50 * i; })
					.attr('y', function (d, i) { return yScale(d.price) + MARGIN.TOP; })
					.attr('height', function (d) {
						return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.price);
					})
				d3.selectAll('rect')
					.on("mouseover", function (d) {
						d3.select(this)
							.append("title")
							.text(function (d) {
								return "top-" + d.top + " \nvariety: " + d.variety_p + " \nprice: " + d.price + " \navg rating: " + d.price_rating + " \navg price_performance_ratio: " + (d.price_rating / d.price).toFixed(2);
							});
					})
				operation = new_operation;
            }
			
		})
}

//variety and rating
function operator_variety_rating() {
	d3.select("body").append("select").attr("id", "top");
	d3.select("#top").append("option").attr("value", "top100").text("top100");
	d3.select("#top").append("option").attr("value", "top10").text("top10");
	d3.select("#top").append("option").attr("value", "top30").text("top30");
	d3.select("#top").append("option").attr("value", "top50").text("top50");
	d3.select("#top").append("option").attr("value", "top50100").text("top50-100");
	d3.select("#top").append("option").attr("value", "top70100").text("top70-100");
	d3.select("#top").append("option").attr("value", "top90100").text("top90-100");
}

function remove_variety_rating() {
	d3.select("#top").remove();
	d3.select("#app").remove();
}

function presentVarietyAndRating(data) {
	var operation = "top100";
	var dataset = data.slice(0, 100);
	var container = d3.select("body").append("svg").attr("width", 500).attr("height", 400).attr("id", "app");

	const xScale = d3.scaleBand()
		.domain(d3.range(dataset.length))
		.range([0, SVG_WIDTH - MARGIN.LEFT - MARGIN.RIGHT])
		.paddingInner(0.1);
	const yScale = d3.scaleLinear()
		.domain([d3.min(dataset, function (d) { return d.rating; })-0.1, d3.max(dataset, function (d) { return d.rating; })])
		.range([SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM, 0]);

	var axisBottom = d3.axisBottom(xScale);
	axisBottom(
		container.append('g')
			.attr('class', 'xaxis')
			.attr("transform", "translate(" + MARGIN.LEFT + "," + (SVG_HEIGHT - MARGIN.TOP) + ")")
	);
	var axisLeft = d3.axisLeft(yScale);
	axisLeft(
		container.append('g')
			.attr('class', 'yaxis')
			.attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")")
	);
	var showticks = false;
	d3.select(".xaxis").selectAll('text').data(dataset)
		.text((d) => { if (showticks) { return d.top; } else { return ""; } });

	container.selectAll('rect')
		.data(dataset)
		.enter()
		.append('rect')
		.classed('bar', true)
		.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
		.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
		.attr('width', function (d, i) { return xScale.bandwidth(); })
		.attr('height', function (d) { return 0; })
		.transition()
		.duration(1000)
		.delay(function (d, i) { return 50 * i; })
		.attr('y', function (d, i) { return yScale(d.rating) + MARGIN.TOP; })
		.attr('height', function (d) {
			return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.rating);
		})

	d3.selectAll('rect')
		.on("mouseover", function (d) {
			d3.select(this)
				.append("title")
				.text(function (d) {
					return "top-" + d.top + " \nvariety: " + d.variety_r + " \navg price: " + d.rating_price + " \navg rating: " + d.rating + " \navg price_performance_ratio: " + (d.rating / d.rating_price).toFixed(2);
				});
		})

	//on click, change to present top10/30/50/100
	d3.selectAll("#top")
		.on("click", function () {
			//select top10 or top30 or top50 or top100
			var new_operation = this.value;
			if (new_operation != operation) {
				if (new_operation == "top10") {
					dataset = data.slice(0, 10);
					showticks = true;
				} else if (new_operation == "top30") {
					dataset = data.slice(0, 30);
					showticks = true;
				} else if (new_operation == "top50") {
					dataset = data.slice(0, 50);
					showticks = false;
				} else if (new_operation == "top50100") {
					dataset = data.slice(50, 100);
					showticks = false;
				} else if (new_operation == "top70100") {
					dataset = data.slice(70, 100);
					showticks = true;
				} else if (new_operation == "top90100") {
					dataset = data.slice(90, 100);
					showticks = true;
				} else {
					dataset = data.slice(0, 100);
					showticks = false;
				}
				//rescale the x- y-axis
				xScale.domain(d3.range(dataset.length));
				yScale.domain([d3.min(dataset, function (d) { return d.rating; })-0.1, d3.max(dataset, function (d) { return d.rating; })]);
				container.select('.xaxis')
					.transition()
					.duration(1500)
					.call(axisBottom);
				container.select('.yaxis')
					.transition()
					.duration(1000)
					.call(axisLeft);
				d3.select(".xaxis").selectAll('text').data(dataset).transition()
					.text((d) => { if (showticks) { return d.variety_pr; } else { return ""; } });
				//reset the rects
				d3.selectAll('rect').remove();
				container.selectAll('rect')
					.data(dataset)
					.enter()
					.append('rect')
					.classed('bar', true)
					.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
					.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
					.attr('width', function (d, i) { return xScale.bandwidth(); })
					.attr('height', function (d) { return 0; })
					.transition()
					.duration(1000)
					.delay(function (d, i) { return 50 * i; })
					.attr('y', function (d, i) { return yScale(d.rating) + MARGIN.TOP; })
					.attr('height', function (d) {
						return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.rating);
					})
				d3.selectAll('rect')
					.on("mouseover", function (d) {
						d3.select(this)
							.append("title")
							.text(function (d) {
								return "top-" + d.top + " \nvariety: " + d.variety_r + " \navg price: " + d.rating_price + " \navg rating: " + d.rating + " \navg price_performance_ratio: " + (d.rating / d.rating_price).toFixed(2);
							});
					})
				operation = new_operation;
			}
		})
}

//taster and count and point
function operator_taster_analysis() {
	d3.select("body").append("select").attr("id", "top");
	d3.select("#top").append("option").attr("value", "taster_count").text("count");
	d3.select("#top").append("option").attr("value", "taster_point").text("point");
}

function remove_taster_analysis() {
	d3.select("#top").remove();
	d3.select("#app").remove();
}

function presentTasterAndAnalysis(data) {
	var operation = "taster_count";
	var dataset = data.slice(0, 20);
	var container = d3.select("body").append("svg").attr("width", 500).attr("height", 400).attr("id", "app");

	const xScale = d3.scaleBand()
		.domain(d3.range(dataset.length))
		.range([0, SVG_WIDTH - MARGIN.LEFT - MARGIN.RIGHT])
		.paddingInner(0.1);
	const yScale = d3.scaleLinear()
		.domain([0, d3.max(dataset, function (d) { return d.taster_count; })])
		.range([SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM, 0]);

	var axisBottom = d3.axisBottom(xScale);
	axisBottom(
		container.append('g')
			.attr('class', 'xaxis')
			.attr("transform", "translate(" + MARGIN.LEFT + "," + (SVG_HEIGHT - MARGIN.TOP) + ")")
	);
	var axisLeft = d3.axisLeft(yScale);
	axisLeft(
		container.append('g')
			.attr('class', 'yaxis')
			.attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")")
	);
	var showticks = true;
	d3.select(".xaxis").selectAll('text').data(dataset)
		.text((d) => { if (showticks) { return d.taster.split(" ")[0].slice(0, 1) + "," +d.taster.split(" ")[1].slice(0, 1); } else { return ""; } });

	container.selectAll('rect')
		.data(dataset)
		.enter()
		.append('rect')
		.classed('bar', true)
		.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
		.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
		.attr('width', function (d, i) { return xScale.bandwidth(); })
		.attr('height', function (d) { return 0; })
		.transition()
		.duration(1000)
		.delay(function (d, i) { return 50 * i; })
		.attr('y', function (d, i) { return yScale(d.taster_count) + MARGIN.TOP; })
		.attr('height', function (d) {
			return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.taster_count);
		})

	d3.selectAll('rect')
		.on("mouseover", function (d) {
			d3.select(this)
				.append("title")
				.text(function (d) {
					return "taster: " + d.taster + " \ncount of comment: " + d.taster_count + " \navg point given: " + d.taster_point;
				});
		})

	//on click, change to present 
	d3.selectAll("#top")
		.on("click", function () {
			//select operation
			var new_operation = this.value;
			if (new_operation != operation) {
				if (new_operation == "taster_count") {
					//rescale the x- y-axis
					xScale.domain(d3.range(dataset.length));
					yScale.domain([0, d3.max(dataset, function (d) { return d.taster_count; })])
					container.select('.xaxis')
						.transition()
						.duration(1500)
						.call(axisBottom);
					container.select('.yaxis')
						.call(axisLeft);
					d3.select(".xaxis").selectAll('text').data(dataset).transition()
						.text((d) => { if (showticks) { return d.taster.split(" ")[0].slice(0, 1) + "," + d.taster.split(" ")[1].slice(0, 1); } else { return ""; } });
					//reset the rects
					d3.selectAll('rect').remove();
					container.selectAll('rect')
						.data(dataset)
						.enter()
						.append('rect')
						.classed('bar', true)
						.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
						.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
						.attr('width', function (d, i) { return xScale.bandwidth(); })
						.attr('height', function (d) { return 0; })
						.transition()
						.duration(1000)
						.delay(function (d, i) { return 50 * i; })
						.attr('y', function (d, i) { return yScale(d.taster_count) + MARGIN.TOP; })
						.attr('height', function (d) {
							return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.taster_count);
						})
					d3.selectAll('rect')
						.on("mouseover", function (d) {
							d3.select(this)
								.append("title")
								.text(function (d) {
									return "taster: " + d.taster + " \ncount of comment: " + d.taster_count + " \navg point given: " + d.taster_point;
								});
						})
					operation = new_operation;
				} else if (new_operation == "taster_point"){
					//rescale the x- y-axis
					xScale.domain(d3.range(dataset.length));
					yScale.domain([d3.min(dataset, function (d) { return d.taster_point; }) - 1, d3.max(dataset, function (d) { return d.taster_point; })])
					container.select('.xaxis')
						.transition()
						.duration(1500)
						.call(axisBottom);
					container.select('.yaxis')
						.call(axisLeft);
					d3.select(".xaxis").selectAll('text').data(dataset).transition()
						.text((d) => { if (showticks) { return d.taster.split(" ")[0].slice(0, 1) + "," + d.taster.split(" ")[1].slice(0, 1); } else { return ""; } });
					//reset the rects
					d3.selectAll('rect').remove();
					container.selectAll('rect')
						.data(dataset)
						.enter()
						.append('rect')
						.classed('bar', true)
						.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
						.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
						.attr('width', function (d, i) { return xScale.bandwidth(); })
						.attr('height', function (d) { return 0; })
						.transition()
						.duration(1000)
						.delay(function (d, i) { return 50 * i; })
						.attr('y', function (d, i) { return yScale(d.taster_point) + MARGIN.TOP; })
						.attr('height', function (d) {
							return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.taster_point);
						})
					d3.selectAll('rect')
						.on("mouseover", function (d) {
							d3.select(this)
								.append("title")
								.text(function (d) {
									return "taster: " + d.taster + " \ncount of comment: " + d.taster_count + " \navg point given: " + d.taster_point;
								});
						})
					operation = new_operation;
				}
			}
		})
}

// Variety and PricePerformance
function operator_variety_pp() {
	d3.select("body").append("select").attr("id", "top");
	d3.select("#top").append("option").attr("value", "top100").text("top100");
	d3.select("#top").append("option").attr("value", "top10").text("top10");
	d3.select("#top").append("option").attr("value", "top30").text("top30");
	d3.select("#top").append("option").attr("value", "top50").text("top50");
	d3.select("#top").append("option").attr("value", "top50100").text("top50-100");
	d3.select("#top").append("option").attr("value", "top70100").text("top70-100");
	d3.select("#top").append("option").attr("value", "top90100").text("top90-100");
}

function remove_variety_pp() {
	d3.select("#top").remove();
	d3.select("#app").remove();
}

function presentVarietyAndPP(data) {
	var operation = "top100";
	var dataset = data.slice(0, 100);
	var container = d3.select("body").append("svg").attr("width", 500).attr("height", 400).attr("id", "app");

	const xScale = d3.scaleBand()
		.domain(d3.range(dataset.length))
		.range([0, SVG_WIDTH - MARGIN.LEFT - MARGIN.RIGHT])
		.paddingInner(0.1);
	const yScale = d3.scaleLinear()
		.domain([d3.min(dataset, function (d) { return d.ratio; })-0.1, d3.max(dataset, function (d) { return d.ratio; })])
		.range([SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM, 0]);

	var axisBottom = d3.axisBottom(xScale);
	axisBottom(
		container.append('g')
			.attr('class', 'xaxis')
			.attr("transform", "translate(" + MARGIN.LEFT + "," + (SVG_HEIGHT - MARGIN.TOP) + ")")
	);
	var axisLeft = d3.axisLeft(yScale);
	axisLeft(
		container.append('g')
			.attr('class', 'yaxis')
			.attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")")
	);
	var showticks = false;
	d3.select(".xaxis").selectAll('text').data(dataset)
		.text((d) => { if (showticks) { return d.top; } else { return ""; } });

	container.selectAll('rect')
		.data(dataset)
		.enter()
		.append('rect')
		.classed('bar', true)
		.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
		.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
		.attr('width', function (d, i) { return xScale.bandwidth(); })
		.attr('height', function (d) { return 0; })
		.transition()
		.duration(1000)
		.delay(function (d, i) { return 50 * i; })
		.attr('y', function (d, i) { return yScale(d.ratio) + MARGIN.TOP; })
		.attr('height', function (d) {
			return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.ratio);
		})

	d3.selectAll('rect')
		.on("mouseover", function (d) {
			d3.select(this)
				.append("title")
				.text(function (d) {
					return "top-" + d.top + " \nvariety: " + d.variety_pr + " \navg price_performance_ratio: " + (d.ratio).toFixed(2);
				});
		})

	//on click, change to present top10/30/50/100
	d3.selectAll("#top")
		.on("click", function () {
			//select top10 or top30 or top50 or top100
			var new_operation = this.value;
			if (new_operation != operation) {
				if (new_operation == "top10") {
					dataset = data.slice(0, 10);
					showticks = true;
				} else if (new_operation == "top30") {
					dataset = data.slice(0, 30);
					showticks = true;
				} else if (new_operation == "top50") {
					dataset = data.slice(0, 50);
					showticks = false;
				} else if (new_operation == "top50100") {
					dataset = data.slice(50, 100);
					showticks = false;
				} else if (new_operation == "top70100") {
					dataset = data.slice(70, 100);
					showticks = true;
				} else if (new_operation == "top90100") {
					dataset = data.slice(90, 100);
					showticks = true;
				} else {
					dataset = data.slice(0, 100);
					showticks = false;
				}
				//rescale the x- y-axis
				xScale.domain(d3.range(dataset.length));
				yScale.domain([d3.min(dataset, function (d) { return d.rating; })-0.1, d3.max(dataset, function (d) { return d.rating; })]);
				container.select('.xaxis')
					.transition()
					.duration(1500)
					.call(axisBottom);
				container.select('.yaxis')
					.transition()
					.duration(1000)
					.call(axisLeft);
				d3.select(".xaxis").selectAll('text').data(dataset).transition()
					.text((d) => { if (showticks) { return d.top; } else { return ""; } });
				//reset the rects
				d3.selectAll('rect').remove();
				container.selectAll('rect')
					.data(dataset)
					.enter()
					.append('rect')
					.classed('bar', true)
					.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
					.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
					.attr('width', function (d, i) { return xScale.bandwidth(); })
					.attr('height', function (d) { return 0; })
					.transition()
					.duration(1000)
					.delay(function (d, i) { return 50 * i; })
					.attr('y', function (d, i) { return yScale(d.rating) + MARGIN.TOP; })
					.attr('height', function (d) {
						return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.rating);
					})
				d3.selectAll('rect')
					.on("mouseover", function (d) {
						d3.select(this)
							.append("title")
							.text(function (d) {
								return "top-" + d.top + " \nvariety: " + d.variety_pr + " \navg price_performance_ratio: " + (d.rating / d.rating_price).toFixed(2);
							});
					})
				operation = new_operation;
			}
		})
}