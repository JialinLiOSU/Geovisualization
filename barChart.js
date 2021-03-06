"use strict";



window.onload = renderMyChart;

function renderMyChart() {
    var svg = d3.select("svg"),
        margin = { top: 20, right: 20, bottom: 30, left: 70 },
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // change the dataset
    d3.csv("2015pop.csv", function (d) {
        // change the y value
        d.Pop = +d.Pop;
        return d;
    }, function (error, data) {
        

        x.domain(data.map(function (d) { return d.States; }));
        y.domain([0, d3.max(data, function (d) { return d.Pop; })]);

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).ticks(10))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Population");

        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return x(d.States); })
            .attr("y", function (d) { return y(d.Pop); })
            .attr("width", x.bandwidth())
            .attr("height", function (d) { return height - y(d.Pop); });
    });
}
