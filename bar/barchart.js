function loadData(d, i) {
    return {
        category: d.Category,
        popularity: Number(d.Popularity),
        top: i + 1,

        //country + count
        country: d.Country,
        produce: Number(d.Produce)
    };
}

function select_operator(operator, data) {
	if (operator == "CategoryAndPopularity") {
		operator_category_popularity();
		presentCategoryAndPopularity(data);
	} else if (operator == "CountryAndProduce") {
		operator_country_produce();
		presentCountryAndProduce(data);
	}
}

function remove_operator(operator) {
	if (operator == "CategoryAndPopularity") {
		remove_category_popularity();
	} else if (operator == "CountryAndProduce") {
		remove_country_produce();
	}
}

function operator_category_popularity() {
	d3.select("body").append("p").attr("id", "top10").text("category top10");
	d3.select("body").append("p").attr("id", "top30").text("category top30");
	d3.select("body").append("p").attr("id", "top50").text("category top50");
	d3.select("body").append("p").attr("id", "top100").text("category top100");
}

function remove_category_popularity() {
	d3.select("#top10").remove();
	d3.select("#top30").remove();
	d3.select("#top50").remove();
	d3.select("#top100").remove();
	d3.select("#app").remove();
}

function presentCategoryAndPopularity(data) {
	var dataset = data.slice(0, 100);
	var container = d3.select("body").append("svg").attr("width", 500).attr("height", 400).attr("id", "app");

	const xScale = d3.scaleBand()
		.domain(d3.range(dataset.length))
		.range([0, SVG_WIDTH - MARGIN.LEFT - MARGIN.RIGHT])
		.paddingInner(0.1);
	const yScale = d3.scaleLinear()
		.domain([0, d3.max(dataset, function (d) { return d.popularity; })])
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
		.attr('y', function (d, i) { return yScale(d.popularity) + MARGIN.TOP; })
		.attr('height', function (d) {
			return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.popularity);
		})

	d3.selectAll('rect')
		.on("mouseover", function (d) {
			d3.select(this)
				.append("title")
				.text(function (d) {
					return "top-" + d.top + " \n" + d.category + " \n" + d.popularity;
				});
		})

	//on click, change to present top10/30/50/100
	d3.selectAll('p')
		.on("click", function () {
			//select top10 or top30 or top50 or top100
			var operation = d3.select(this).attr("id");
			if (operation == "top10") {
				dataset = data.slice(0, 10);
				showticks = true;
			} else if (operation == "top30") {
				dataset = data.slice(0, 30);
				showticks = true;
			} else if (operation == "top50") {
				dataset = data.slice(0, 50);
				showticks = false;
            } else {
				dataset = data.slice(0, 100);
				showticks = false;
			}
			//rescale the x- y-axis
			xScale.domain(d3.range(dataset.length));
			yScale.domain([0, d3.max(dataset, function (d) { return d.popularity; })]);
			d3.select(".xaxis").remove()
			d3.select(".yaxis").remove()
			axisBottom = d3.axisBottom(xScale).ticks(0);
			axisBottom(
				container.append('g')
					.attr('class', 'xaxis')
					.attr("transform", "translate(" + MARGIN.LEFT + "," + (SVG_HEIGHT - MARGIN.TOP) + ")")
			);
			axisLeft = d3.axisLeft(yScale);
			axisLeft(
				container.append('g')
					.attr('class', 'yaxis')
					.attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")")
			);
			d3.select(".xaxis").selectAll('text').data(dataset)
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
				.attr('y', function (d, i) { return yScale(d.popularity) + MARGIN.TOP; })
				.attr('height', function (d) {
					return SVG_HEIGHT - MARGIN.TOP - MARGIN.BOTTOM - yScale(d.popularity);
				})
			d3.selectAll('rect')
				.on("mouseover", function (d) {
					d3.select(this)
						.append("title")
						.text(function (d) {
							return "top-" + d.top + " \n" + d.category + " \n" + d.popularity;
						});
				})
		})
}

function operator_country_produce() {
	d3.select("body").append("p").attr("id", "top10").text("top10 countries");
	d3.select("body").append("p").attr("id", "top1020").text("top11-20 countries");
	d3.select("body").append("p").attr("id", "top2030").text("top21-30 countries");
	d3.select("body").append("p").attr("id", "top3044").text("top31-all countries");
	d3.select("body").append("p").attr("id", "all").text("all countries");
}

function remove_country_produce() {
	d3.select("#top10").remove();
	d3.select("#top1020").remove();
	d3.select("#top2030").remove();
	d3.select("#top3044").remove();
	d3.select("#all").remove();
	d3.select("#app").remove();
}

function presentCountryAndProduce(data) {
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
	d3.selectAll('p')
		.on("click", function () {
			//select top to present
			var operation = d3.select(this).attr("id");
			if (operation == "top10") {
				dataset = data.slice(0, 10);
				showticks = true;
			} else if (operation == "top1020") {
				dataset = data.slice(10, 20);
				showticks = true;
			} else if (operation == "top2030") {
				dataset = data.slice(20, 30);
				showticks = true;
			} else if (operation == "top3044") {
				dataset = data.slice(30, 44);
				showticks = true;
            } else {
				dataset = data.slice(0, 44);
				showticks = false;
			}
			//rescale the x- y-axis
			xScale.domain(d3.range(dataset.length));
			yScale.domain([0, d3.max(dataset, function (d) { return d.produce; })]);
			d3.select(".xaxis").remove()
			d3.select(".yaxis").remove()
			axisBottom = d3.axisBottom(xScale).ticks(0);
			axisBottom(
				container.append('g')
					.attr('class', 'xaxis')
					.attr("transform", "translate(" + MARGIN.LEFT + "," + (SVG_HEIGHT - MARGIN.TOP) + ")")
			);
			axisLeft = d3.axisLeft(yScale);
			axisLeft(
				container.append('g')
					.attr('class', 'yaxis')
					.attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")")
			);
			d3.select(".xaxis").selectAll('text').data(dataset)
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
		})
}