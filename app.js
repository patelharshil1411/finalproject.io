//FIRST GRAPH

var keys_cyls = ["2", "4", "6", "8", "10", "12"];
var width = 1050,
  height = 1000;

var margin = { top: 10, right: 100, bottom: 50, left: 50 },
  width = 1000 - margin.left - margin.right,
  height = 1000 - margin.top - margin.bottom;

var makes = [
  "Acura",
  "Alfa Romeo",
  "Aston Martin",
  "Audi",
  "Bentley",
  "BMW",
  "Buick",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Dodge",
  "Ferrari",
  "Fiat",
  "Ford",
  "Genesis",
  "GMC",
  "Honda",
  "Hyundai",
  "Infiniti",
  "Jaguar",
  "Jeep",
  "Kia",
  "Lamborghini",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Lotus",
  "Maserati",
  "Mazda",
  "McLaren Automotive",
  "Mercedes-Benz",
  "MINI",
  "Mitsubishi",
  "Nissan",
  "Porsche",
  "Ram",
  "Rolls-Royce",
  "Roush Performance",
  "smart",
  "Subaru",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

var highway_mpgs = [
  "35",
  "33",
  "19",
  "30",
  "22",
  "41",
  "27",
  "30",
  "29",
  "25",
  "24",
  "22",
  "103",
  "96",
  "24",
  "29",
  "38",
  "122",
  "30",
  "39",
  "27",
  "92",
  "21",
  "28",
  "30",
  "29",
  "24",
  "24",
  "34",
  "23",
  "82",
  "33",
  "102",
  "101",
  "27",
  "21",
  "19",
  "23",
  "39",
  "27",
  "98",
  "30",
  "28",
  "29",
];

var city_mpgs = [
  "25",
  "24",
  "12",
  "23",
  "13",
  "30",
  "20",
  "22",
  "21",
  "16",
  "15",
  "16",
  "121",
  "118",
  "17",
  "21",
  "30",
  "150",
  "22",
  "30",
  "19",
  "120",
  "14",
  "22",
  "22",
  "23",
  "17",
  "16",
  "26",
  "16",
  "85",
  "24",
  "121",
  "124",
  "21",
  "14",
  "12",
  "14",
  "32",
  "21",
  "92",
  "23",
  "21",
  "22",
];
var x = d3.scaleBand().domain([10, 20, 30, 40, 50]).range([0, width]);

var y = d3.scaleLinear().domain([0, 120]).range([height, 0]);

var xAxis = d3.axisBottom().scale(x).ticks(5);

var yAxis = d3.axisLeft().scale(y).ticks(10);

var graph = d3.select("#graph");

graph
  .append("g")
  .attr("transform", "translate(50,20)")
  .attr("class", "axis")
  .call(yAxis);

graph
  .append("text")
  .attr("x", -500)
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("text-anchor", "middle")
  .text("Mileage");

graph
  .append("text")
  .attr("x", 500)
  .attr("y", 1050)
  .attr("text-anchor", "middle")
  .text("Cars");

async function load() {
  d3.csv("https://flunky.github.io/cars2017.csv").then(function (data_given) {
    //sorting the data
    data_given.sort(function (b, a) {
      return a.AverageHighwayMPG - b.AverageHighwayMPG;
    });

    data_given.sort(function (d, c) {
      return c.AverageCityMPG - d.AverageCityMPG;
    });

    var makeScale = d3
      .scaleBand()
      .range([0, width])
      .domain(
        data_given.map(function (d) {
          return d.Make;
        })
      );

    var makeAxis = d3.axisBottom().scale(makeScale).ticks(5);

    graph
      .append("g")
      .attr("transform", "translate(50,950)")
      .attr("class", "axis")
      .call(makeAxis)
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-30)")
      .style("text-anchor", "end");

    graph
      .selectAll("mybar")
      .data(data_given)
      .enter()
      .append("rect")
      .attr("x", function (d, i) {
        return margin.left + makeScale(makes[i]);
      })

      .attr("y", function (d, i) {
        return y(highway_mpgs[i]) + 10;
      })
      .attr("width", makeScale.bandwidth() - 5)
      .attr("height", function (d, i) {
        return height - y(highway_mpgs[i]);
      })
      .attr("fill", "#ff3333");
  });
}

// This function is called by the buttons on top of the plot
function change(setting) {
  if (setting === "AverageHighwayMPG") {
    graph
      .selectAll("rect")
      .transition()
      .duration(2000)
      .attr("fill", "#ff3333")
      .attr("y", function (d, i) {
        return y(highway_mpgs[i]) + 10;
      })
      .attr("height", function (d, i) {
        return height - y(highway_mpgs[i]);
      });
  } else {
    graph
      .selectAll("rect")
      .transition()
      .duration(2000)
      .attr("fill", "#66C2A5")
      .attr("y", function (d, i) {
        return y(city_mpgs[i]) + 10;
      })
      .attr("height", function (d, i) {
        return height - y(city_mpgs[i]);
      });
  }
}

var graph1 = d3.select("#graph1");

graph1
  .append("text")
  .attr("x", -500)
  .attr("y", 15)
  .attr("transform", "rotate(-90)")
  .attr("text-anchor", "middle")
  .text("Fuel Type");

graph1
  .append("text")
  .attr("x", 500)
  .attr("y", 1150)
  .attr("text-anchor", "middle")
  .text("Number of Cylinders");

var keys_fuel = ["Diesel", "Gasoline", "Electricity"];
var shape = d3.scaleOrdinal().domain(keys_fuel);

async function load1() {
  d3.csv("https://flunky.github.io/cars2017.csv").then(function (data) {
    var fuelScale = d3
      .scaleBand()
      .range([0, width])
      .domain(
        data.map(function (d) {
          return d.Fuel;
        })
      );

    var cylScale = d3.scaleBand().range([height, 0]).domain(keys_cyls);
    var cylAxis = d3.axisBottom().scale(cylScale).ticks(5);
    var fuelAxis = d3.axisLeft().scale(fuelScale);

    graph1
      .append("g")
      .attr("transform", "translate(50,1010)")
      .attr("class", "axis")
      .call(cylAxis);

    graph1
      .append("g")
      .attr("transform", "translate(50,160)")
      .attr("class", "axis")
      .call(fuelAxis)
      .selectAll("text");

    graph1
      .append("g")
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cy", function (d) {
        return 200 + fuelScale(d.Fuel);
      })

      .attr("cx", function (d) {
        return 1000 - 60 * d.EngineCylinders;
      })

      .attr("r", function (d) {
        return d.AverageHighwayMPG / 1.5;
      })
      .style("fill", function (d) {
        return "#5EV43";
      })
      .style("opacity", "0.1")
      .attr("stroke", "black");
  });
}
