<script lang="ts">
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import genWatchData from "$lib/assets/gen_watch.json";

  let svg;
  let width = 800;
  let height = 400;
  let currentTime = 0;
  let maxTime = Object.keys(genWatchData).length - 1;
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

    d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "white")
      .style("border", "1px solid #ccc")
      .style("padding", "8px")
      .style("border-radius", "5px")
      .style("box-shadow", "0px 0px 6px rgba(0, 0, 0, 0.1)");
  }

  function drawChart() {
    const svgElement = d3.select(svg);
    const edgesGroup = svgElement.select(".edges");
    const nodesGroup = svgElement.select(".nodes");

    edgesGroup.selectAll("*").remove();
    nodesGroup.selectAll("*").remove();

    const nodes = Object.keys(currentData);
    const tooltip = d3.select(".tooltip");

    const positions = [
      { x: width / 2, y: height / 6 },
      { x: width / 4, y: height / 3 },
      { x: (width / 4) * 3, y: height / 3 },
      { x: width / 4, y: (height / 6) * 5 },
      { x: (width / 4) * 3, y: (height / 6) * 5 },
    ].slice(0, nodes.length);

    // Animate edges
    edgesGroup
      .selectAll("line")
      .data(nodes.slice(1))
      .enter()
      .append("line")
      .attr("x1", positions[0].x)
      .attr("y1", positions[0].y)
      .attr("x2", (d, i) => positions[i + 1].x)
      .attr("y2", (d, i) => positions[i + 1].y)
      .attr("stroke", "#555")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "5,5")
      .transition()
      .duration(500)
      .attr("stroke", (d) => d3.interpolateBlues(Math.random()));

    // Create and animate nodes
    nodesGroup
      .selectAll("circle")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("cx", (d, i) => positions[i].x)
      .attr("cy", (d, i) => positions[i].y)
      .attr("r", 0) // Start with a small radius
      .attr("fill", "lightblue")
      .attr("stroke", "darkblue")
      .attr("stroke-width", 2)
      .on("mouseover", function (event, d) {
        tooltip
          .html(
            `<strong>Bus: ${d}</strong><br>Voltage: ${currentData[d]?.voltage}<br>Angle: ${currentData[d]?.angle}`,
          )
          .style("visibility", "visible")
          .style("top", event.pageY + 5 + "px")
          .style("left", event.pageX + 5 + "px");
        d3.select(this).transition().duration(200).attr("r", 25);
      })
      .on("mousemove", function (event) {
        tooltip
          .style("top", event.pageY + 5 + "px")
          .style("left", event.pageX + 5 + "px");
      })
      .on("mouseout", function () {
        tooltip.style("visibility", "hidden");
        d3.select(this).transition().duration(200).attr("r", 20); // Return to original size
      })
      .transition() // Animation for node growth
      .duration(500)
      .attr("r", 20); // Final radius

    // Add text labels for node identifiers
    nodesGroup
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .attr("x", (d, i) => positions[i].x)
      .attr("y", (d, i) => positions[i].y + 35) // Place below the node
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "#333")
      .text((d) => d);

    // Add voltage-dependent node coloring
    nodesGroup
      .selectAll("circle")
      .attr("fill", (d) => {
        const voltage = currentData[d]?.voltage || 0;
        return voltage > 1
          ? "lightgreen"
          : voltage < 1
            ? "lightcoral"
            : "lightblue";
      })
      .attr("stroke", (d) => {
        const voltage = currentData[d]?.voltage || 0;
        return voltage > 1 ? "green" : voltage < 1 ? "red" : "darkblue";
      });
  }
</script>

<svg bind:this={svg}></svg>

<!-- Slider to change time steps -->
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
    max-width: 100%;
    height: auto;
  }

  .tooltip {
    pointer-events: none;
    position: absolute;
    visibility: hidden;
    background-color: white;
    border: 1px solid #ccc;
    padding: 8px;
    border-radius: 5px;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
    font-size: 12px;
  }

  input[type="range"] {
    display: block;
    margin: 20px auto;
    width: 80%;
  }
</style>
