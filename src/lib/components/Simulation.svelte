<script lang="ts">
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import genWatchData from "$lib/assets/gen_watch.json"; // Adjust the path as necessary

  let svg;
  let width = 800;
  let height = 400;
  let currentTime = 0;
  let maxTime = Object.keys(genWatchData).length - 1; // Based on data keys
  let timeKeys = Object.keys(genWatchData);
  let currentData = genWatchData[timeKeys[currentTime]];

  // Function to update data based on current time
  function updateData() {
    currentData = genWatchData[timeKeys[currentTime]] || {};
    drawChart();
  }

  onMount(() => {
    createChart();
    updateData();
  });

  function createChart() {
    const svgElement = d3
      .select(svg)
      .attr("width", width)
      .attr("height", height)
      .style("background-color", "#f9f9f9");

    svgElement.append("g").attr("class", "nodes");

    // Create the tooltip
    d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("border", "1px solid #ccc")
      .style("padding", "5px")
      .style("border-radius", "5px");
  }

  function drawChart() {
    const svgElement = d3.select(svg);
    const nodesGroup = svgElement.select(".nodes");

    // Clear previous nodes
    nodesGroup.selectAll("*").remove();

    const nodes = Object.keys(currentData);
    const tooltip = d3.select(".tooltip");

    // Create bars for each node
    nodesGroup
      .selectAll("rect")
      .data(nodes)
      .enter()
      .append("rect")
      .attr("x", (d, i) => 50 + i * 150) // Position the nodes
      .attr("y", (d) => height / 2 - currentData[d].voltage * 30) // Position based on voltage
      .attr("width", 50)
      .attr("height", (d) => currentData[d].voltage * 60) // Height based on voltage
      .attr("fill", "steelblue")
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .on("mouseover", function (event, d) {
        tooltip
          .html(
            `Voltage: ${currentData[d].voltage}<br>Angle: ${currentData[d].angle}`,
          )
          .style("visibility", "visible")
          .style("top", event.pageY + 5 + "px")
          .style("left", event.pageX + 5 + "px");
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", event.pageY + 5 + "px")
          .style("left", event.pageX + 5 + "px");
      })
      .on("mouseout", function () {
        tooltip.style("visibility", "hidden");
      });

    // Add text labels for node numbers
    nodesGroup
      .selectAll("text.node-label")
      .data(nodes)
      .enter()
      .append("text")
      .attr("class", "node-label")
      .attr("x", (d, i) => 50 + i * 150 + 25) // Center text horizontally
      .attr("y", (d) => height / 2 - currentData[d].voltage * 30 - 10) // Position above the bar
      .attr("text-anchor", "middle")
      .text((d) => d) // Use the node identifier (1, 2, 3, etc.)
      .attr("font-size", "12px")
      .attr("fill", "black");

    // Optional text labels for angles
    nodesGroup
      .selectAll("text.angle-label")
      .data(nodes)
      .enter()
      .append("text")
      .attr("class", "angle-label")
      .attr("x", (d, i) => 50 + i * 150 + 25) // Center text horizontally
      .attr("y", height / 2 + 40)
      .attr("text-anchor", "middle")
      // .text((d) => `Angle: ${currentData[d].angle}`)
      .attr("font-size", "12px")
      .attr("fill", "black");
  }
</script>

<svg bind:this={svg}></svg>

<input
  type="range"
  min="0"
  max={maxTime}
  bind:value={currentTime}
  on:input={updateData}
/>
<label for="time-slider">Current Time: {timeKeys[currentTime]}</label>

<style>
  svg {
    display: block;
    margin: auto;
  }

  .tooltip {
    pointer-events: none; /* Prevent tooltip from interfering with mouse events */
  }
</style>
