const height = 400;
const width = 600;

function loadData(d, i) {
  return {
      Points1: d.Points1,
      Price1: Number(d.Price1),
      top: i + 1,

      //country + count
      //country: d.Country,
      //produce: Number(d.Produce)
  };
}

function select_operator(operator, data) {
if (operator == "PointsAndPrice") {
  presentPointsAndPrice(data);
} else if (operator == "PointsAndPopularity") {
  presentPointsAndPopularity(data);
}
else if (operator == "PriceAndPopularity") {
  presentPriceAndPopularity(data);
}
}

function remove_operator(operator) {
if (operator == "PointsAndPrice") {
  remove_Points_Price();
} else if (operator == "PointsAndPopularity") {
  remove_Points_Popularity();
}
else if (operator == "PriceAndPopularity") {
  remove_Price_Popularity();
}
}


function presentPointsAndPrice  (data) {
var dataset = data.slice(0,21);
    var svg = d3.select("#plot").append("svg").attr("width", width).attr("height", height).attr("id", "app");

    xScale = d3.scaleLinear()
        .domain([
            d3.min(dataset, function (d) { return d.Points1; }),
            d3.max(dataset, function (d) { return d.Points1; })
        ])
        .range([padding, w - padding]);

    yScale = d3.scaleLinear()
        .domain([
            d3.min(dataset, function (d) { return d.Price1; }),
            d3.max(dataset, function (d) { return d.Price1; })
        ])
        .range([h - padding, padding / 3]);

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10,0])
        .html(function (EVENT, d) {
            return "<p><strong>Point: </strong> <span style='color:blue'>" + d.Points1 + "</span></p>\
					<p><strong>Price: </strong><span style='color:blue'>"+ d.Price1 + "</span></p>";
        });

    svg.call(tip);

 //Define X axis
    xAxis = d3.axisTop()
        .scale(xScale)
        .ticks((width + 2) / (height + 2) * 10)
        .tickSize(height - 20)
        .tickPadding(7 - height);

//Define Y axis
    yAxis = d3.axisRight()
        .scale(yScale)
        .ticks(10)
        .tickSize(width - 2*padding)
        .tickPadding(2 * padding - width - 20);

    svg.append("rect")
        .attr("class", "view")
        .attr("x", padding)
        .attr("y", 0)
        .attr("width", width - 2*padding)
        .attr("height", height - padding);

      //Create X axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

      //Create Y axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (padding)  + ",0)")
        .call(yAxis);

    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)
        .transition()
        .duration(1000)
        .attr("cx", function (d) {
            return xScale(d.Points1);
        })
        .attr("cy", function (d) {
            return yScale(d.Price1);
        });

    svg.append("text")
        .attr("class", "x text")
        .attr("text-anchor", "end")
        .attr("x", 520)
        .attr("y", 330)
        .text("Points");

    svg.append("text")
        .attr("class", "y text")
        .attr("y", 30)
        .attr("x",70)
        .style("text-anchor", "middle")
        .text("Price");
}

function remove_Points_Price() {
d3.select("#app").remove();
}


function presentPointsAndPopularity(data) {
    var dataset = data.slice(0, 21);
    var svg = d3.select("#plot").append("svg").attr("width", width).attr("height", height).attr("id", "app");

    xScale = d3.scaleLinear()
        .domain([
            d3.min(dataset, function (d) { return d.Points2; }),
            d3.max(dataset, function (d) { return d.Points2; })
        ])
        .range([padding, w - padding]);

    yScale = d3.scaleLinear()
        .domain([
            d3.min(dataset, function (d) { return d.Popularity2; }),
            d3.max(dataset, function (d) { return d.Popularity2; })
        ])
        .range([h - padding, padding / 3]);

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (EVENT, d) {
            return "<p><strong>Point: </strong> <span style='color:blue'>" + d.Points2 + "</span></p>\
					<p><strong>Popularity: </strong><span style='color:blue'>"+ d.Popularity2 + "</span></p>";
        });

    svg.call(tip);

    //Define X axis
    xAxis = d3.axisTop()
        .scale(xScale)
        .ticks((width + 2) / (height + 2) * 10)
        .tickSize(height - 20)
        .tickPadding(7 - height);

    //Define Y axis
    yAxis = d3.axisRight()
        .scale(yScale)
        .ticks(10)
        .tickSize(width - 2 * padding)
        .tickPadding(2 * padding - width - 35);

    svg.append("rect")
        .attr("class", "view")
        .attr("x", padding)
        .attr("y", 0)
        .attr("width", width - 2 * padding)
        .attr("height", height - padding);

    //Create X axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

    //Create Y axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (padding) + ",0)")
        .call(yAxis);


    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)
        .transition()
        .duration(1000)
        .attr("cx", function (d) {
            return xScale(d.Points2);
        })
        .attr("cy", function (d) {
            return yScale(d.Popularity2);
        });

    svg.append("text")
        .attr("class", "x text")
        .attr("text-anchor", "end")
        .attr("x", 520)
        .attr("y", 330)
        .text("Points");

    svg.append("text")
        .attr("class", "y text")
        .attr("y", 30)
        .attr("x", 60)
        .style("text-anchor", "middle")
        .text("Popularity");
}

function remove_Points_Popularity() {
d3.select("#app").remove();
}

function presentPriceAndPopularity(data){
    var dataset = data;
    var svg = d3.select("#plot").append("svg").attr("width", width).attr("height", height).attr("id","app");;

    xScale = d3.scaleLinear()
        .domain([
            d3.min(dataset, function (d) { return d.Price3; }),
            d3.max(dataset, function (d) { return d.Price3; })
        ])
        .range([padding, w - padding]);

    yScale = d3.scaleLinear()
        .domain([
            d3.min(dataset, function (d) { return d.Popularity3; }),
            d3.max(dataset, function (d) { return d.Popularity3; })
        ])
        .range([h - padding, padding / 3]);

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function (EVENT, d) {
            return "<p><strong>Price: </strong> <span style='color:blue'>" + d.Price3 + "</span></p>\
					<p><strong>Popularity: </strong><span style='color:blue'>"+ d.Popularity3 + "</span></p>";
        });

    svg.call(tip);

    //Define X axis
    xAxis = d3.axisTop()
        .scale(xScale)
        .ticks(10)
        .tickSize(height - 20)
        .tickPadding(7 - height);

    //Define Y axis
    yAxis = d3.axisRight()
        .scale(yScale)
        .ticks(10)
        .tickSize(width - 2 * padding)
        .tickPadding(2 * padding - width - 30);

    svg.append("rect")
        .attr("class", "view")
        .attr("x", padding)
        .attr("y", 0)
        .attr("width", width - 2 * padding)
        .attr("height", height - padding);

    //Create X axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .call(xAxis);

    //Create Y axis
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (padding) + ",0)")
        .call(yAxis);

    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide)
        .transition()
        .duration(1000)
        .attr("cx", function (d) {
            return xScale(d.Price3);
        })
        .attr("cy", function (d) {
            return yScale(d.Popularity3);
        });

    svg.append("text")
        .attr("class", "x text")
        .attr("text-anchor", "end")
        .attr("x", 520)
        .attr("y", 330)
        .text("Price");

    svg.append("text")
        .attr("class", "y text")
        .attr("y", 30)
        .attr("x", 60)
        .style("text-anchor", "middle")
        .text("Popularity");
}

function remove_Price_Popularity() {
d3.select("#app").remove();
}
