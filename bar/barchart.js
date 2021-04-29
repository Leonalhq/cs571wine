const width = 720;
const height = 350;

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
		winery: Number(d.Winery),

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
		variety_pp: d.Variety_pp,
		ratio: Number(d.Ratio),
		pp_rating: Number(d.PP_rating),
		pp_price: Number(d.PP_price)
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
    }else if (operator == "VarietyAndPP") {
		remove_variety_pp();
	}
}


//category and popularity
function operator_category_popularity() {
	d3.select(".label").append("select").attr("id", "top");
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
	var container = d3.select("body").append("svg").attr("width", width).attr("height", height).attr("id", "app");

	var xScale = d3.scaleBand()
		.domain(d3.range(dataset.length))
		.range([0, SVG_WIDTH - MARGIN.LEFT - MARGIN.RIGHT])
		.paddingInner(0.1);
	var yScale = d3.scaleLinear()
		.domain([0, d3.max(dataset, function (d) { return d.popularity_c; })])
		.range([SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM, 0]);

	var xAxis = d3.axisBottom(xScale);

	var yAxis = d3.axisLeft(yScale);

	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset(function (EVENT, d) {
			this_height = d3.select(this).attr("height");
			if (this_height > 250) {
				return [this_height - 250, 0];
			} else { return [-10, 0]; }
		})
		.html(function (EVENT,d) {
			return "<p><strong>Top: </strong> <span style='color:red'>" + d.top + "</span></p>\
					<p><strong>Wine Variety: </strong><span style='color:red'>"+ d.category + "</span></p>\
					<p><strong>Popularity: </strong><span style='color:red'>"+ d.popularity_c + "</span></p>\
					<p><strong>Avg Price: </strong><span style='color:red'>"+ d.popularity_price + "</span></p>\
					<p><strong>Avg Rating: </strong><span style='color:red'>"+ d.popularity_rating + "</span></p>";
		});

	container.call(tip);

	container.append('g')
		.attr('class', 'x axis')
		.attr("transform", "translate(" + MARGIN.LEFT + "," + (SVG_HEIGHT - MARGIN.TOP) + ")")
		.call(xAxis)

	container.append('g')
		.attr('class', 'y axis')
		.attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")")
		.call(yAxis)

	container.append('text')
		.attr("class", 'x text')
		.attr("transform", "translate(" + (SVG_WIDTH / 2) + "," + (SVG_HEIGHT - 3) + ")")
		.style("text-anchor", "middle")
		.text("Wine Variety");

	container.append('text')
		.attr("class", 'y text')
		.attr("y", MARGIN.LEFT - 55)
		.attr("x", 0 - (SVG_HEIGHT / 2))
		.attr("transform", "rotate(-90)")
		.attr("dy", "1em")
		.style("text_anchor", "middle")
		.text("Popularity");

	var showticks = 0;
	d3.select(".x.axis").selectAll('text').data(dataset)
		.text(function (d) {
			if (showticks == 0) {
				return " ";
			} else if (showticks == 1) {
				return d.category.slice(0,2);
			} else if (showticks == 2) {
				return d.category.slice(0, 3);
			} else if (showticks == 3) {
				return d.category.slice(0, 12);
			}
		});

	container.selectAll('.bar')
		.data(dataset)
		.enter()
		.append('rect')
		.attr("class", "bar")
		.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
		.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
		.attr('width', function (d, i) { return xScale.bandwidth(); })
		.attr('height', function (d) { return 0; })
		.on("mouseover", tip.show)
		.on("mouseout", tip.hide)
		.transition()
		.duration(1000)
		.delay(function (d, i) { return 50 * i; })
		.attr('y', function (d, i) { return yScale(d.popularity_c) + MARGIN.TOP; })
		.attr('height', function (d) {
			return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.popularity_c);
		});

	//on click, change to present top10/30/50/100
	d3.selectAll("#top")
		.on("click", function () {
			//select top10 or top30 or top50 or top100
			var new_operation = this.value;
			if (new_operation != operation) {
				if (new_operation == "top10") {
					dataset = data.slice(0, 10);
					showticks = 3;
				} else if (new_operation == "top30") {
					dataset = data.slice(0, 30);
					showticks = 2;
				} else if (new_operation == "top50") {
					dataset = data.slice(0, 50);
					showticks = 1;
				} else {
					dataset = data.slice(0, 100);
					showticks = 0;
				}
				//rescale the x- y-axis
				xScale.domain(d3.range(dataset.length));
				yScale.domain([0, d3.max(dataset, function (d) { return d.popularity_c; })]);
				container.select('.x.axis')
					.transition()
					.duration(1500)
					.call(xAxis);
				container.select('.y.axis')
					.call(yAxis);
				d3.select(".x.axis").selectAll('text').data(dataset).transition()
					.text(function (d) {
						if (showticks == 0) {
							return " ";
						} else if (showticks == 1) {
							return d.category.slice(0, 2);
						} else if (showticks == 2) {
							return d.category.slice(0, 3);
						} else if (showticks == 3) {
							return d.category.slice(0, 12);
						}
					});
					
				//reset the rects
				d3.selectAll('.bar').remove();
				container.selectAll('.bar')
					.data(dataset)
					.enter()
					.append('rect')
					.attr("class", "bar")
					.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
					.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
					.attr('width', function (d, i) { return xScale.bandwidth(); })
					.attr('height', function (d) { return 0; })
					.on("mouseover", tip.show)
					.on("mouseout", tip.hide)
					.transition()
					.duration(1000)
					.delay(function (d, i) { return 50 * i; })
					.attr('y', function (d, i) { return yScale(d.popularity_c) + MARGIN.TOP; })
					.attr('height', function (d) {
						return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.popularity_c);
					})
				operation = new_operation;
            }
		})
}

//country and produce
function operator_country_produce() {
	d3.select(".label").append("select").attr("id", "top");
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
	var container = d3.select("body").append("svg").attr("width", width).attr("height", height).attr("id", "app");

	var xScale = d3.scaleBand()
		.domain(d3.range(dataset.length))
		.range([0, SVG_WIDTH - MARGIN.LEFT - MARGIN.RIGHT])
		.paddingInner(0.1);
	var yScale_right = d3.scaleLinear()
		.domain([0, d3.max(dataset, function (d) { return d.produce; })])
		.range([SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM, 0]);
	var yScale = d3.scaleLinear()
		.domain([0, d3.max(dataset, function (d) { return d.winery; })])
		.range([SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM, 0]);

	var xAxis = d3.axisBottom(xScale);

	var yAxis = d3.axisLeft(yScale);

	var yAxis_right = d3.axisRight(yScale_right);

	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset(function (EVENT, d) {
			this_height = d3.select(this).attr("height");
			if (this_height > 250) {
				return [this_height - 260, 0];
			} else { return [-10, 0]; }
		})
		.html(function (EVENT, d) {
			return "<p><strong>Top: </strong> <span style='color:red'>" + d.top + "</span></p>\
					<p><strong>Country: </strong><span style='color:red'>"+ d.country + "</span></p>\
					<p><strong>Production: </strong><span style='color:red'>"+ d.produce + "</span></p>\
					<p><strong>Number of Winery: </strong><span style='color:red'>"+ d.winery + "</span></p>";
		});

	container.call(tip);

	container.append('g')
		.attr('class', 'x axis')
		.attr("transform", "translate(" + MARGIN.LEFT + "," + (SVG_HEIGHT - MARGIN.TOP) + ")")
		.call(xAxis);

	container.append('g')
		.attr('class', 'y axis')
		.attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")")
		.call(yAxis)

	container.append('g')
		.attr('class', 'y axis right')
		.attr("transform", "translate(" + (SVG_WIDTH - MARGIN.RIGHT) + "," + MARGIN.TOP + ")")
		.call(yAxis_right);

	container.append('text')
		.attr("class", 'x text')
		.attr("transform", "translate(" + (SVG_WIDTH / 2) + "," + (SVG_HEIGHT - 3) + ")")
		.style("text-anchor", "middle")
		.text("Country");

	container.append('text')
		.attr("class", 'y text')
		.attr("y", MARGIN.LEFT - 55)
		.attr("x", 0 - (SVG_HEIGHT / 2) - 15)
		.attr("transform", "rotate(-90)")
		.attr("dy", "1em")
		.style("text_anchor", "middle")
		.text("Number of Winery");

	container.append('text')
		.attr("class", 'y text')
		.attr("y", SVG_WIDTH - 12)
		.attr("x", 0 - (SVG_HEIGHT / 2))
		.attr("transform", "rotate(-90)")
		.attr("dy", "1em")
		.style("text_anchor", "middle")
		.text("Production");

	var showticks = 1;
	d3.select(".x.axis").selectAll('text').data(dataset)
		.text(function (d) {
			if (showticks == 0) {
				return " ";
			} else if (showticks == 1) {
				return d.country.slice(0, 2);
			} else if (showticks == 2) {
				return d.country.slice(0, 3);
			} else if (showticks == 3) {
				return d.country.slice(0,12);
            }
		});

	var bars = container.selectAll('.bar')
		.data(dataset)
		.enter();

	bars.append('rect')
		.attr("class", "bar bar1")
		.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT + xScale.bandwidth() / 2; })
		.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
		.attr('width', function (d, i) { return xScale.bandwidth() / 2; })
		.attr('height', function (d) { return 0; })
		.on("mouseover", tip.show)
		.on("mouseout", tip.hide)
		.transition()
		.duration(1000)
		.delay(function (d, i) { return 50 * i; })
		.attr('y', function (d, i) { return yScale_right(d.produce) + MARGIN.TOP; })
		.attr('height', function (d) {
			return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale_right(d.produce);
		})

	bars.append('rect')
		.attr("class", "bar bar2")
		.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT ; })
		.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
		.attr('width', function (d, i) { return xScale.bandwidth() / 2; })
		.attr('height', function (d) { return 0; })
		.on("mouseover", tip.show)
		.on("mouseout", tip.hide)
		.transition()
		.duration(1000)
		.delay(function (d, i) { return 50 * i; })
		.attr('y', function (d, i) { return yScale(d.winery) + MARGIN.TOP; })
		.attr('height', function (d) {
			return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.winery);
		})

	//on click, change to present top10/11-20/21-30/31-44/all
	d3.selectAll("#top")
		.on("click", function () {
			//select top to present
			var new_operation = this.value;
			if (new_operation != operation) {
				if (new_operation == "top10") {
					dataset = data.slice(0, 10);
					showticks = 3;
				} else if (new_operation == "top1020") {
					dataset = data.slice(10, 20);
					showticks = 3;
				} else if (new_operation == "top2030") {
					dataset = data.slice(20, 30);
					showticks = 3;
				} else if (new_operation == "top3044") {
					dataset = data.slice(30, 44);
					showticks = 2;
				} else {
					dataset = data.slice(0, 44);
					showticks = 1;
				}
				//rescale the x- y-axis
				xScale.domain(d3.range(dataset.length));
				yScale_right.domain([0, d3.max(dataset, function (d) { return d.produce; })]);
				yScale.domain([0, d3.max(dataset, function (d) { return d.winery; })])
				container.select('.x.axis')
					.transition()
					.duration(1500)
					.call(xAxis);
				container.select('.y.axis')
					.transition()
					.duration(1000)
					.call(yAxis);
				container.select('.y.axis.right')
					.transition()
					.duration(1000)
					.call(yAxis_right);
				d3.select(".x.axis").selectAll('text').data(dataset).transition()
					.text(function (d) {
						if (showticks == 0) {
							return " ";
						} else if (showticks == 1) {
							return d.country.slice(0, 2);
						} else if (showticks == 2) {
							return d.country.slice(0, 3);
						} else if (showticks == 3) {
							return d.country.slice(0, 12);
						}
					});
				//reset the rects
				d3.selectAll('.bar').remove();
				bars = container.selectAll('.bar')
					.data(dataset)
					.enter();
				bars.append('rect')
					.attr("class", "bar bar1")
					.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT + xScale.bandwidth() / 2; })
					.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
					.attr('width', function (d, i) { return xScale.bandwidth() / 2; })
					.attr('height', function (d) { return 0; })
					.on("mouseover", tip.show)
					.on("mouseout", tip.hide)
					.transition()
					.duration(1000)
					.delay(function (d, i) { return 50 * i; })
					.attr('y', function (d, i) { return yScale_right(d.produce) + MARGIN.TOP; })
					.attr('height', function (d) {
						return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale_right(d.produce);
					})
				bars.append('rect')
					.attr("class", "bar bar2")
					.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
					.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
					.attr('width', function (d, i) { return xScale.bandwidth() / 2; })
					.attr('height', function (d) { return 0; })
					.on("mouseover", tip.show)
					.on("mouseout", tip.hide)
					.transition()
					.duration(1000)
					.delay(function (d, i) { return 50 * i; })
					.attr('y', function (d, i) { return yScale(d.winery) + MARGIN.TOP; })
					.attr('height', function (d) {
						return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.winery);
					})
				operation = new_operation;
            }
		})
}

//flavor and popularity
function operator_flavor_popularity() {
	d3.select(".label").append("select").attr("id", "top");
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
	var container = d3.select("body").append("svg").attr("width", width).attr("height", height).attr("id", "app");

	var xScale = d3.scaleBand()
		.domain(d3.range(dataset.length))
		.range([0, SVG_WIDTH - MARGIN.LEFT - MARGIN.RIGHT])
		.paddingInner(0.1);
	var yScale = d3.scaleLinear()
		.domain([0, d3.max(dataset, function (d) { return d.popularity_f; })])
		.range([SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM, 0]);

	var xAxis = d3.axisBottom(xScale);

	var yAxis = d3.axisLeft(yScale);

	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function (EVENT, d) {
			return "<p><strong>Top: </strong> <span style='color:red'>" + d.top + "</span></p>\
					<p><strong>Flavor: </strong><span style='color:red'>"+ d.flavor + "</span></p>\
					<p><strong>Popularity: </strong><span style='color:red'>"+ d.popularity_f + "</span></p>";
		});

	container.call(tip);

	container.append('g')
		.attr('class', 'x axis')
		.attr("transform", "translate(" + MARGIN.LEFT + "," + (SVG_HEIGHT - MARGIN.TOP) + ")")
		.call(xAxis);

	container.append('g')
		.attr('class', 'y axis')
		.attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Popularity");

	container.append('text')
		.attr("class", 'x text')
		.attr("transform", "translate(" + (SVG_WIDTH / 2) + "," + (SVG_HEIGHT - 3) + ")")
		.style("text-anchor", "middle")
		.text("Flavor");

	container.append('text')
		.attr("class", 'y text')
		.attr("y", MARGIN.LEFT - 55)
		.attr("x", 0 - (SVG_HEIGHT / 2))
		.attr("transform", "rotate(-90)")
		.attr("dy", "1em")
		.style("text_anchor", "middle")
		.text("Popularity");

	var showticks = 0;
	d3.select(".x.axis").selectAll('text').data(dataset)
		.text(function (d) {
			if (showticks == 0) {
				return " ";
			} else if (showticks == 1) {
				return d.flavor.slice(0, 2);
			} else if (showticks == 2) {
				return d.flavor.slice(0, 3);
			} else if (showticks == 3) {
				return d.flavor.slice(0, 12);
			}
		});

	container.selectAll('.bar')
		.data(dataset)
		.enter()
		.append('rect')
		.attr("class", "bar")
		.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
		.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
		.attr('width', function (d, i) { return xScale.bandwidth(); })
		.attr('height', function (d) { return 0; })
		.on("mouseover", tip.show)
		.on("mouseout", tip.hide)
		.transition()
		.duration(1000)
		.delay(function (d, i) { return 50 * i; })
		.attr('y', function (d, i) { return yScale(d.popularity_f) + MARGIN.TOP; })
		.attr('height', function (d) {
			return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.popularity_f);
		})

	//on click, change to present top10/30/50/100
	d3.selectAll("#top")
		.on("click", function () {
			//select top10 or top30 or top50 or top100
			var new_operation = this.value;
			if (new_operation != operation) {
				if (new_operation == "top10") {
					dataset = data.slice(0, 10);
					showticks = 3;
				} else if (new_operation == "top30") {
					dataset = data.slice(0, 30);
					showticks = 2;
				} else if (new_operation == "top50") {
					dataset = data.slice(0, 50);
					showticks = 1;
				} else {
					dataset = data.slice(0, 100);
					showticks = 0;
				}
				//rescale the x- y-axis
				xScale.domain(d3.range(dataset.length));
				yScale.domain([0, d3.max(dataset, function (d) { return d.popularity_f; })]);
				container.select('.x.axis')
					.transition()
					.duration(1500)
					.call(xAxis);
				container.select('.y.axis')
					.call(yAxis);
				d3.select(".x.axis").selectAll('text').data(dataset).transition()
					.text(function (d) {
						if (showticks == 0) {
							return " ";
						} else if (showticks == 1) {
							return d.flavor.slice(0, 2);
						} else if (showticks == 2) {
							return d.flavor.slice(0, 3);
						} else if (showticks == 3) {
							return d.flavor.slice(0, 12);
						}
					});
				//reset the rects
				d3.selectAll('.bar').remove();
				container.selectAll('.bar')
					.data(dataset)
					.enter()
					.append('rect')
					.attr("class", "bar")
					.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
					.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
					.attr('width', function (d, i) { return xScale.bandwidth(); })
					.attr('height', function (d) { return 0; })
					.on("mouseover", tip.show)
					.on("mouseout", tip.hide)
					.transition()
					.duration(1000)
					.delay(function (d, i) { return 50 * i; })
					.attr('y', function (d, i) { return yScale(d.popularity_f) + MARGIN.TOP; })
					.attr('height', function (d) {
						return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.popularity_f);
					})
				operation = new_operation;
            }
		})
}

//variety and price
function operator_variety_price() {
	d3.select(".label").append("select").attr("id", "top");
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
	var container = d3.select("body").append("svg").attr("width", width).attr("height", height).attr("id", "app");

	var xScale = d3.scaleBand()
		.domain(d3.range(dataset.length))
		.range([0, SVG_WIDTH - MARGIN.LEFT - MARGIN.RIGHT])
		.paddingInner(0.1);
	var yScale = d3.scaleLinear()
		.domain([d3.min(dataset, function (d) { return d.price; }) / (10 / 9), d3.max(dataset, function (d) { return d.price; })])
		.range([SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM, 0]);

	var xAxis = d3.axisBottom(xScale);

	var yAxis = d3.axisLeft(yScale);

	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset(function (EVENT, d) {
			this_height = d3.select(this).attr("height");
			if (this_height > 250) {
				return [this_height - 250, 0];
			} else { return [-10, 0]; }
		})
		.html(function (EVENT, d) {
			return "<p><strong>Top: </strong> <span style='color:red'>" + d.top + "</span></p>\
					<p><strong>Wine Variety: </strong><span style='color:red'>"+ d.variety_p + "</span></p>\
					<p><strong>Avg Price: </strong><span style='color:red'>"+ d.price + "</span></p>\
					<p><strong>Avg Rating: </strong><span style='color:red'>"+ d.price_rating + "</span></p>\
					<p><strong>Avg Price_Performance_Ratio: </strong><span style='color:red'>"+ (d.price_rating / d.price).toFixed(2) + "</span></p>";
		});

	container.call(tip);

	container.append('g')
		.attr('class', 'x axis')
		.attr("transform", "translate(" + MARGIN.LEFT + "," + (SVG_HEIGHT - MARGIN.TOP) + ")")
		.call(xAxis);

	container.append('g')
		.attr('class', 'y axis')
		.attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Popularity");

	container.append('text')
		.attr("class", 'x text')
		.attr("transform", "translate(" + (SVG_WIDTH / 2) + "," + (SVG_HEIGHT - 3) + ")")
		.style("text-anchor", "middle")
		.text("Wine Variety");

	container.append('text')
		.attr("class", 'y text')
		.attr("y", MARGIN.LEFT - 55)
		.attr("x", 0 - (SVG_HEIGHT / 2))
		.attr("transform", "rotate(-90)")
		.attr("dy", "1em")
		.style("text_anchor", "middle")
		.text("Price");

	var showticks = 0;
	d3.select(".x.axis").selectAll('text').data(dataset)
		.text(function (d) {
			if (showticks == 0) {
				return " ";
			} else if (showticks == 1) {
				return d.variety_p.slice(0, 2);
			} else if (showticks == 2) {
				return d.variety_p.slice(0, 3);
			} else if (showticks == 3) {
				return d.variety_p.slice(0, 12);
			}
		});

	container.selectAll('.bar')
		.data(dataset)
		.enter()
		.append('rect')
		.attr("class", "bar")
		.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
		.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
		.attr('width', function (d, i) { return xScale.bandwidth(); })
		.attr('height', function (d) { return 0; })
		.on("mouseover", tip.show)
		.on("mouseout", tip.hide)
		.transition()
		.duration(1000)
		.delay(function (d, i) { return 50 * i; })
		.attr('y', function (d, i) { return yScale(d.price) + MARGIN.TOP; })
		.attr('height', function (d) {
			return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.price);
		})

	//on click, change to present top10/30/50/100
	d3.selectAll("#top")
		.on("click", function () {
			//select top10 or top30 or top50 or top100
			var new_operation = this.value;
			if (new_operation != operation) {
				if (new_operation == "top10") {
					dataset = data.slice(0, 10);
					showticks = 3;
				} else if (new_operation == "top30") {
					dataset = data.slice(0, 30);
					showticks = 2;
				} else if (new_operation == "top50") {
					dataset = data.slice(0, 50);
					showticks = 1;
				} else if (new_operation == "top50100") {
					dataset = data.slice(50, 100);
					showticks = 1;
				} else if (new_operation == "top70100") {
					dataset = data.slice(70, 100);
					showticks = 2;
				} else if (new_operation == "top90100") {
					dataset = data.slice(90, 100);
					showticks = 3;
				} else {
					dataset = data.slice(0, 100);
					showticks = 0;
				}
				//rescale the x- y-axis
				xScale.domain(d3.range(dataset.length));
				yScale.domain([d3.min(dataset, function (d) { return d.price; }) / (10 / 9), d3.max(dataset, function (d) { return d.price; })]);
				container.select('.x.axis')
					.transition()
					.duration(1500)
					.call(xAxis);
				container.select('.y.axis')
					.transition()
					.duration(1000)
					.call(yAxis);
				d3.select(".x.axis").selectAll('text').data(dataset).transition()
					.text(function (d) {
						if (showticks == 0) {
							return " ";
						} else if (showticks == 1) {
							return d.variety_p.slice(0, 2);
						} else if (showticks == 2) {
							return d.variety_p.slice(0, 3);
						} else if (showticks == 3) {
							return d.variety_p.slice(0, 12);
						}
					});
				//reset the rects
				d3.selectAll('.bar').remove();
				container.selectAll('.bar')
					.data(dataset)
					.enter()
					.append('rect')
					.attr("class", "bar")
					.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
					.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
					.attr('width', function (d, i) { return xScale.bandwidth(); })
					.attr('height', function (d) { return 0; })
					.on("mouseover", tip.show)
					.on("mouseout", tip.hide)
					.transition()
					.duration(1000)
					.delay(function (d, i) { return 50 * i; })
					.attr('y', function (d, i) { return yScale(d.price) + MARGIN.TOP; })
					.attr('height', function (d) {
						return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.price);
					})
				operation = new_operation;
            }
			
		})
}

//variety and rating
function operator_variety_rating() {
	d3.select(".label").append("select").attr("id", "top");
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
	var container = d3.select("body").append("svg").attr("width", width).attr("height", height).attr("id", "app");

	var xScale = d3.scaleBand()
		.domain(d3.range(dataset.length))
		.range([0, SVG_WIDTH - MARGIN.LEFT - MARGIN.RIGHT])
		.paddingInner(0.1);
	var yScale = d3.scaleLinear()
		.domain([d3.min(dataset, function (d) { return d.rating; }) - 0.1, d3.max(dataset, function (d) { return d.rating; })])
		.range([SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM, 0]);

	var xAxis = d3.axisBottom(xScale);

	var yAxis = d3.axisLeft(yScale);

	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset(function (EVENT, d) {
			this_height = d3.select(this).attr("height");
			if (this_height > 250) {
				return [this_height - 250, 0];
			} else { return [-10, 0]; }
		})
		.html(function (EVENT, d) {
			return "<p><strong>Top: </strong> <span style='color:red'>" + d.top + "</span></p>\
					<p><strong>Wine Variety: </strong><span style='color:red'>"+ d.variety_r + "</span></p>\
					<p><strong>Avg Price: </strong><span style='color:red'>"+ d.rating_price + "</span></p>\
					<p><strong>Avg Rating: </strong><span style='color:red'>"+ d.rating + "</span></p>\
					<p><strong>Avg Price_Performance_Ratio: </strong><span style='color:red'>"+ (d.rating / d.rating_price).toFixed(2) + "</span></p>";
		});

	container.call(tip);

	container.append('g')
		.attr('class', 'x axis')
		.attr("transform", "translate(" + MARGIN.LEFT + "," + (SVG_HEIGHT - MARGIN.TOP) + ")")
		.call(xAxis);

	container.append('g')
		.attr('class', 'y axis')
		.attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Popularity");

	container.append('text')
		.attr("class", 'x text')
		.attr("transform", "translate(" + (SVG_WIDTH / 2) + "," + (SVG_HEIGHT - 3) + ")")
		.style("text-anchor", "middle")
		.text("Wine Variety");

	container.append('text')
		.attr("class", 'y text')
		.attr("y", MARGIN.LEFT - 55)
		.attr("x", 0 - (SVG_HEIGHT / 2))
		.attr("transform", "rotate(-90)")
		.attr("dy", "1em")
		.style("text_anchor", "middle")
		.text("Rating");

	var showticks = 0;
	d3.select(".x.axis").selectAll('text').data(dataset)
		.text(function (d) {
			if (showticks == 0) {
				return " ";
			} else if (showticks == 1) {
				return d.variety_r.slice(0, 2);
			} else if (showticks == 2) {
				return d.variety_r.slice(0, 3);
			} else if (showticks == 3) {
				return d.variety_r.slice(0, 12);
			}
		});

	container.selectAll('.bar')
		.data(dataset)
		.enter()
		.append('rect')
		.attr("class", "bar")
		.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
		.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
		.attr('width', function (d, i) { return xScale.bandwidth(); })
		.attr('height', function (d) { return 0; })
		.on("mouseover", tip.show)
		.on("mouseout", tip.hide)
		.transition()
		.duration(1000)
		.delay(function (d, i) { return 50 * i; })
		.attr('y', function (d, i) { return yScale(d.rating) + MARGIN.TOP; })
		.attr('height', function (d) {
			return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.rating);
		})

	//on click, change to present top10/30/50/100
	d3.selectAll("#top")
		.on("click", function () {
			//select top10 or top30 or top50 or top100
			var new_operation = this.value;
			if (new_operation != operation) {
				if (new_operation == "top10") {
					dataset = data.slice(0, 10);
					showticks = 3;
				} else if (new_operation == "top30") {
					dataset = data.slice(0, 30);
					showticks = 2;
				} else if (new_operation == "top50") {
					dataset = data.slice(0, 50);
					showticks = 1;
				} else if (new_operation == "top50100") {
					dataset = data.slice(50, 100);
					showticks = 1;
				} else if (new_operation == "top70100") {
					dataset = data.slice(70, 100);
					showticks = 2;
				} else if (new_operation == "top90100") {
					dataset = data.slice(90, 100);
					showticks = 3;
				} else {
					dataset = data.slice(0, 100);
					showticks = 0;
				}
				//rescale the x- y-axis
				xScale.domain(d3.range(dataset.length));
				yScale.domain([d3.min(dataset, function (d) { return d.rating; })-0.1, d3.max(dataset, function (d) { return d.rating; })]);
				container.select('.x.axis')
					.transition()
					.duration(1500)
					.call(xAxis);
				container.select('.y.axis')
					.transition()
					.duration(1000)
					.call(yAxis);
				d3.select(".x.axis").selectAll('text').data(dataset).transition()
					.text(function (d) {
						if (showticks == 0) {
							return " ";
						} else if (showticks == 1) {
							return d.variety_r.slice(0, 2);
						} else if (showticks == 2) {
							return d.variety_r.slice(0, 3);
						} else if (showticks == 3) {
							return d.variety_r.slice(0, 12);
						}
					});
				//reset the rects
				d3.selectAll('.bar').remove();
				container.selectAll('.bar')
					.data(dataset)
					.enter()
					.append('rect')
					.attr("class", "bar")
					.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
					.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
					.attr('width', function (d, i) { return xScale.bandwidth(); })
					.attr('height', function (d) { return 0; })
					.on("mouseover", tip.show)
					.on("mouseout", tip.hide)
					.transition()
					.duration(1000)
					.delay(function (d, i) { return 50 * i; })
					.attr('y', function (d, i) { return yScale(d.rating) + MARGIN.TOP; })
					.attr('height', function (d) {
						return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.rating);
					})
				operation = new_operation;
			}
		})
}

//taster and count and point
function operator_taster_analysis() {
	d3.select(".label").append("select").attr("id", "top");
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
	var container = d3.select("body").append("svg").attr("width", width).attr("height", height).attr("id", "app");

	var xScale = d3.scaleBand()
		.domain(d3.range(dataset.length))
		.range([0, SVG_WIDTH - MARGIN.LEFT - MARGIN.RIGHT])
		.paddingInner(0.1);
	var yScale = d3.scaleLinear()
		.domain([0, d3.max(dataset, function (d) { return d.taster_count; })])
		.range([SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM, 0]);

	var xAxis = d3.axisBottom(xScale);

	var yAxis = d3.axisLeft(yScale);

	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset([-10, 0])
		.html(function (EVENT, d) {
			return "<p><strong>Taster Name: </strong> <span style='color:red'>" + d.taster + "</span></p>\
					<p><strong>Count of comments: </strong><span style='color:red'>"+ d.taster_count + "</span></p>\
					<p><strong>Avg Point Given: </strong><span style='color:red'>"+ d.taster_point + "</span></p>";
		});

	container.call(tip);

	container.append('g')
		.attr('class', 'x axis')
		.attr("transform", "translate(" + MARGIN.LEFT + "," + (SVG_HEIGHT - MARGIN.TOP) + ")")
		.call(xAxis);

	container.append('g')
		.attr('class', 'y axis')
		.attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Popularity");

	container.append('text')
		.attr("class", 'x text')
		.attr("transform", "translate(" + (SVG_WIDTH / 2) + "," + (SVG_HEIGHT - 3) + ")")
		.style("text-anchor", "middle")
		.text("Wine Taster");

	container.append('text')
		.attr("class", 'y text')
		.attr("y", MARGIN.LEFT - 55)
		.attr("x", 0 - (SVG_HEIGHT / 2) - 20)
		.attr("transform", "rotate(-90)")
		.attr("dy", "1em")
		.style("text_anchor", "middle")
		.text("Count of Comments");

	var showticks = true;
	d3.select(".x.axis").selectAll('text').data(dataset)
		.text((d) => { if (showticks) { return d.taster.split(" ")[0].slice(0, 1) + "," +d.taster.split(" ")[1].slice(0, 1); } else { return ""; } });

	container.selectAll('.bar')
		.data(dataset)
		.enter()
		.append('rect')
		.attr("class", "bar")
		.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
		.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
		.attr('width', function (d, i) { return xScale.bandwidth(); })
		.attr('height', function (d) { return 0; })
		.on("mouseover", tip.show)
		.on("mouseout", tip.hide)
		.transition()
		.duration(1000)
		.delay(function (d, i) { return 50 * i; })
		.attr('y', function (d, i) { return yScale(d.taster_count) + MARGIN.TOP; })
		.attr('height', function (d) {
			return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.taster_count);
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
					container.select('.x.axis')
						.transition()
						.duration(1500)
						.call(xAxis);
					container.select('.y.axis')
						.call(yAxis);
					container.select('.y.text')
						.text("Count of Comments");
					d3.select(".x.axis").selectAll('text').data(dataset).transition()
						.text((d) => { if (showticks) { return d.taster.split(" ")[0].slice(0, 1) + "," + d.taster.split(" ")[1].slice(0, 1); } else { return ""; } });
					//reset the rects
					d3.selectAll('.bar').remove();
					container.selectAll('.bar')
						.data(dataset)
						.enter()
						.append('rect')
						.attr("class", "bar")
						.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
						.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
						.attr('width', function (d, i) { return xScale.bandwidth(); })
						.attr('height', function (d) { return 0; })
						.on("mouseover", tip.show)
						.on("mouseout", tip.hide)
						.transition()
						.duration(1000)
						.delay(function (d, i) { return 50 * i; })
						.attr('y', function (d, i) { return yScale(d.taster_count) + MARGIN.TOP; })
						.attr('height', function (d) {
							return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.taster_count);
						})
					operation = new_operation;
				} else if (new_operation == "taster_point"){
					//rescale the x- y-axis
					xScale.domain(d3.range(dataset.length));
					yScale.domain([d3.min(dataset, function (d) { return d.taster_point; }) - 1, d3.max(dataset, function (d) { return d.taster_point; })])
					container.select('.x.axis')
						.transition()
						.duration(1500)
						.call(xAxis);
					container.select('.y.axis')
						.call(yAxis);
					container.select('.y.text')
						.text("Acg Point Given");
					d3.select(".x.axis").selectAll('text').data(dataset).transition()
						.text((d) => { if (showticks) { return d.taster.split(" ")[0].slice(0, 1) + "," + d.taster.split(" ")[1].slice(0, 1); } else { return ""; } });
					//reset the rects
					d3.selectAll('.bar').remove();
					container.selectAll('.bar')
						.data(dataset)
						.enter()
						.append('rect')
						.attr("class", "bar")
						.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
						.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
						.attr('width', function (d, i) { return xScale.bandwidth(); })
						.attr('height', function (d) { return 0; })
						.on("mouseover", tip.show)
						.on("mouseout", tip.hide)
						.transition()
						.duration(1000)
						.delay(function (d, i) { return 50 * i; })
						.attr('y', function (d, i) { return yScale(d.taster_point) + MARGIN.TOP; })
						.attr('height', function (d) {
							return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.taster_point);
						})
					operation = new_operation;
				}
			}
		})
}

// Variety and PricePerformance
function operator_variety_pp() {
	d3.select(".label").append("select").attr("id", "top");
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
	var container = d3.select("body").append("svg").attr("width", width).attr("height", height).attr("id", "app");

	var xScale = d3.scaleBand()
		.domain(d3.range(dataset.length))
		.range([0, SVG_WIDTH - MARGIN.LEFT - MARGIN.RIGHT])
		.paddingInner(0.1);
	var yScale = d3.scaleLinear()
		.domain([d3.min(dataset, function (d) { return d.ratio; }) - 0.3, d3.max(dataset, function (d) { return d.ratio; })])
		.range([SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM, 0]);

	var xAxis = d3.axisBottom(xScale);

	var yAxis = d3.axisLeft(yScale);

	var tip = d3.tip()
		.attr('class', 'd3-tip')
		.offset(function (EVENT, d) {
			this_height = d3.select(this).attr("height");
			if (this_height > 250) {
				return [this_height - 250, 0];
			} else { return [-10, 0]; }
		})
		.html(function (EVENT, d) {
			return "<p><strong>Top: </strong> <span style='color:red'>" + d.top + "</span></p>\
					<p><strong>Wine Variety: </strong><span style='color:red'>"+ d.variety_pp + "</span></p>\
					<p><strong>Avg Price: </strong><span style='color:red'>"+ d.pp_price + "</span></p>\
					<p><strong>Avg Rating: </strong><span style='color:red'>"+ d.pp_rating + "</span></p>\
					<p><strong>Avg Price_Performance_Ratio: </strong><span style='color:red'>"+ d.ratio + "</span></p>";
		});

	container.call(tip);

	container.append('g')
		.attr('class', 'x axis')
		.attr("transform", "translate(" + MARGIN.LEFT + "," + (SVG_HEIGHT - MARGIN.TOP) + ")")
		.call(xAxis);

	container.append('g')
		.attr('class', 'y axis')
		.attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Popularity");

	container.append('text')
		.attr("class", 'x text')
		.attr("transform", "translate(" + (SVG_WIDTH / 2) + "," + (SVG_HEIGHT - 3) + ")")
		.style("text-anchor", "middle")
		.text("Wine Variety");

	container.append('text')
		.attr("class", 'y text')
		.attr("y", MARGIN.LEFT - 55)
		.attr("x", 0 - (SVG_HEIGHT / 2 + 30))
		.attr("transform", "rotate(-90)")
		.attr("dy", "1em")
		.style("text_anchor", "middle")
		.text("Price/Performance Ratio");

	var showticks = 0;
	d3.select(".x.axis").selectAll('text').data(dataset)
		.text(function (d) {
			if (showticks == 0) {
				return " ";
			} else if (showticks == 1) {
				return d.variety_pp.slice(0, 2);
			} else if (showticks == 2) {
				return d.variety_pp.slice(0, 3);
			} else if (showticks == 3) {
				return d.variety_pp.slice(0, 12);
			}
		});

	container.selectAll('.bar')
		.data(dataset)
		.enter()
		.append('rect')
		.attr("class", "bar")
		.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
		.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
		.attr('width', function (d, i) { return xScale.bandwidth(); })
		.attr('height', function (d) { return 0; })
		.on("mouseover", tip.show)
		.on("mouseout", tip.hide)
		.transition()
		.duration(1000)
		.delay(function (d, i) { return 50 * i; })
		.attr('y', function (d, i) { return yScale(d.ratio) + MARGIN.TOP; })
		.attr('height', function (d) {
			return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.ratio);
		})

	//on click, change to present top10/30/50/100
	d3.selectAll("#top")
		.on("click", function () {
			//select top10 or top30 or top50 or top100
			var new_operation = this.value;
			if (new_operation != operation) {
				if (new_operation == "top10") {
					dataset = data.slice(0, 10);
					showticks = 3;
				} else if (new_operation == "top30") {
					dataset = data.slice(0, 30);
					showticks = 2;
				} else if (new_operation == "top50") {
					dataset = data.slice(0, 50);
					showticks = 1;
				} else if (new_operation == "top50100") {
					dataset = data.slice(50, 100);
					showticks = 1;
				} else if (new_operation == "top70100") {
					dataset = data.slice(70, 100);
					showticks = 2;
				} else if (new_operation == "top90100") {
					dataset = data.slice(90, 100);
					showticks = 3;
				} else {
					dataset = data.slice(0, 100);
					showticks = 0;
				}
				//rescale the x- y-axis
				xScale.domain(d3.range(dataset.length));
				yScale.domain([d3.min(dataset, function (d) { return d.ratio; }) - 0.3, d3.max(dataset, function (d) { return d.ratio; })]);
				container.select('.x.axis')
					.transition()
					.duration(1500)
					.call(xAxis);
				container.select('.y.axis')
					.transition()
					.duration(1000)
					.call(yAxis);
				d3.select(".x.axis").selectAll('text').data(dataset).transition()
					.text(function (d) {
						if (showticks == 0) {
							return " ";
						} else if (showticks == 1) {
							return d.variety_pp.slice(0, 2);
						} else if (showticks == 2) {
							return d.variety_pp.slice(0, 3);
						} else if (showticks == 3) {
							return d.variety_pp.slice(0, 12);
						}
					});
				//reset the rects
				d3.selectAll('.bar').remove();
				container.selectAll('.bar')
					.data(dataset)
					.enter()
					.append('rect')
					.attr("class", "bar")
					.attr('x', function (d, i) { return xScale(i) + MARGIN.LEFT; })
					.attr('y', function (d, i) { return SVG_HEIGHT - MARGIN.TOP; })
					.attr('width', function (d, i) { return xScale.bandwidth(); })
					.attr('height', function (d) { return 0; })
					.on("mouseover", tip.show)
					.on("mouseout", tip.hide)
					.transition()
					.duration(1000)
					.delay(function (d, i) { return 50 * i; })
					.attr('y', function (d, i) { return yScale(d.ratio) + MARGIN.TOP; })
					.attr('height', function (d) {
						return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.ratio);
					})
				operation = new_operation;
			}
		})
}
