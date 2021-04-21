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
	var svg = d3.select("body").append("svg").attr("width", 500).attr("height", 300).attr("id","app");

  xScale = d3.scaleLinear()
           .domain([
            d3.min(dataset, function(d) { return d.Points1; }),
            d3.max(dataset, function(d) { return d.Points1; })
          ])
           .range([padding, w - padding]);

  yScale = d3.scaleLinear()
           .domain([
            d3.min(dataset, function(d) { return d.Price1; }),
            d3.max(dataset, function(d) { return d.Price1; })
          ])
           .range([h - padding, padding]);

   //Define X axis
   xAxis = d3.axisBottom()
              .scale(xScale)
              .ticks(5);

  //Define Y axis
   yAxis = d3.axisLeft()
              .scale(yScale)
              .ticks(5);


    svg.selectAll("circle")
       .data(dataset)
       .enter()
       .append("circle")
       .transition()
       .duration(1000)
       .attr("cx", function(d) {
          return xScale(d.Points1);
       })
       .attr("cy", function(d) {
          return yScale(d.Price1);
       })
       .attr("r", 3)



       d3.selectAll("circle").on("mouseover", function(d) {
         d3.select(this)
         .append("title")
         .text(function(d){
          return "Price: "+d.Points1+" \n";
        })
        .append("title")
        .text(function(d){
         return "Points: "+d.Price1;
       })
        });

        //Create X axis
        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0," + (h - padding) + ")")
          .call(xAxis);

        //Create Y axis
        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + padding + ",0)")
          .call(yAxis);

          svg.append("text")
          .attr("text-anchor", "end")
          .attr("x", 260)
          .attr("y", 240)
          .text("Points");

          svg.append("text")
      .attr("y", 150)
      .attr("x",35)
      .style("text-anchor", "middle")
      .text("Price");
}

function remove_Points_Price() {
	d3.select("#app").remove();
}


function presentPointsAndPopularity(data) {
  var dataset = data.slice(0,21);
	var svg = d3.select("body").append("svg").attr("width", 500).attr("height", 300).attr("id","app");;

  xScale = d3.scaleLinear()
           .domain([
            d3.min(dataset, function(d) { return d.Points2; }),
            d3.max(dataset, function(d) { return d.Points2; })
          ])
           .range([padding, w - padding]);

  yScale = d3.scaleLinear()
           .domain([
            d3.min(dataset, function(d) { return d.Popularity2; }),
            d3.max(dataset, function(d) { return d.Popularity2; })
          ])
           .range([h - padding, padding]);

   //Define X axis
   xAxis = d3.axisBottom()
              .scale(xScale)
              .ticks(5);

  //Define Y axis
   yAxis = d3.axisLeft()
              .scale(yScale)
              .ticks(5);


    svg.selectAll("circle")
       .data(dataset)
       .enter()
       .append("circle")
       .transition()
       .duration(1000)
       .attr("cx", function(d) {
          return xScale(d.Points2);
       })
       .attr("cy", function(d) {
          return yScale(d.Popularity2);
       })
       .attr("r", 3)



       d3.selectAll("circle").on("mouseover", function(d) {
         d3.select(this)
         .append("title")
         .text(function(d){
          return "Price: "+d.Points2+" \n";
        })
        .append("title")
        .text(function(d){
         return "Points: "+d.Popularity2;
       })
        });

        //Create X axis
        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0," + (h - padding) + ")")
          .call(xAxis);

        //Create Y axis
        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + padding + ",0)")
          .call(yAxis);

          svg.append("text")
          .attr("text-anchor", "end")
          .attr("x", 260)
          .attr("y", 240)
          .text("Points");

          svg.append("text")
      .attr("y", 150)
      .attr("x",35)
      .style("text-anchor", "middle")
      .text("Popularity");
}

function remove_Points_Popularity() {
	d3.select("#app").remove();
}

function presentPriceAndPopularity(data){
  var dataset = data;
	var svg = d3.select("body").append("svg").attr("width", 500).attr("height", 300).attr("id","app");;

  xScale = d3.scaleLinear()
           .domain([
            d3.min(dataset, function(d) { return d.Price3; }),
            d3.max(dataset, function(d) { return d.Price3; })
          ])
           .range([padding, w - padding]);

  yScale = d3.scaleLinear()
           .domain([
            d3.min(dataset, function(d) { return d.Popularity3; }),
            d3.max(dataset, function(d) { return d.Popularity3; })
          ])
           .range([h - padding, padding]);

   //Define X axis
   xAxis = d3.axisBottom()
              .scale(xScale)
              .ticks(5);

  //Define Y axis
   yAxis = d3.axisLeft()
              .scale(yScale)
              .ticks(5);


    svg.selectAll("circle")
       .data(dataset)
       .enter()
       .append("circle")
       .transition()
       .duration(1000)
       .attr("cx", function(d) {
          return xScale(d.Price3);
       })
       .attr("cy", function(d) {
          return yScale(d.Popularity3);
       })
       .attr("r", 3)



       d3.selectAll("circle").on("mouseover", function(d) {
         d3.select(this)
         .append("title")
         .text(function(d){
          return "Price: "+d.Price3+" \n";
        })
        .append("title")
        .text(function(d){
         return "Points: "+d.Popularity3;
       })
        });

        //Create X axis
        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0," + (h - padding) + ")")
          .call(xAxis);

        //Create Y axis
        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(" + padding + ",0)")
          .call(yAxis);

          svg.append("text")
          .attr("text-anchor", "end")
          .attr("x", 260)
          .attr("y", 240)
          .text("Price");

          svg.append("text")
      .attr("y", 150)
      .attr("x",35)
      .style("text-anchor", "middle")
      .text("Popularity");
}

function remove_Price_Popularity() {
	d3.select("#app").remove();
}
