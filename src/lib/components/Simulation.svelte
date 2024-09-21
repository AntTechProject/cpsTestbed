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

    svgElement.append("g").attr("class", "edges");
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
    const edgesGroup = svgElement.select(".edges");
    const nodesGroup = svgElement.select(".nodes");

    // Clear previous elements
    edgesGroup.selectAll("*").remove();
    nodesGroup.selectAll("*").remove();

    const nodes = Object.keys(currentData);
    const tooltip = d3.select(".tooltip");

    // Define positions for nodes (grid layout)
    const positions = [
      { x: width / 2, y: height / 6 }, // Central Bus
      { x: width / 4, y: height / 3 }, // Node 1
      { x: (width / 4) * 3, y: height / 3 }, // Node 2
      { x: width / 4, y: (height / 6) * 5 }, // Node 3
      { x: (width / 4) * 3, y: (height / 6) * 5 }, // Node 4
      // Additional nodes can be added here
    ].slice(0, nodes.length); // Limit to the number of available nodes

    // Create edges
    edgesGroup
      .selectAll("line")
      .data(nodes.slice(1)) // Skip first node for edges
      .enter()
      .append("line")
      .attr("x1", positions[0].x) // Connect to central bus
      .attr("y1", positions[0].y)
      .attr("x2", (d, i) => positions[i + 1].x) // Connect to each node
      .attr("y2", (d, i) => positions[i + 1].y)
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5"); // Dashed line for clarity

    // Create nodes as circles
    nodesGroup
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => positions[i].x)
      .attr("cy", (d, i) => positions[i].y)
      .attr("r", 20) // Radius of the node
      .attr("fill", "lightblue") // Lighter color for visibility
      .attr("stroke", "darkblue") // Darker stroke for contrast
      .attr("stroke-width", 2)
      .on("mouseover", function (event, d) {
        tooltip
          .html(
            `Voltage: ${currentData[d]?.voltage}<br>Angle: ${currentData[d]?.angle}`,
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

    // Add text labels for node identifiers
    nodesGroup
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("x", (d, i) => positions[i].x)
      .attr("y", (d, i) => positions[i].y + 5) // Slightly below the center
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "black")
      .text((d) => d); // Use the node identifier (1, 2, 3, etc.)
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
