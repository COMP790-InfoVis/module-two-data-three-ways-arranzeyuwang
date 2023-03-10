/**
 * Modified from D3 gallery - line chart at
 * https://observablehq.com/@d3/line-chart
 */

import * as d3 from "d3";

import { leadDate } from "./dataset/leadData";
import d3Adaptor from "./d3Adaptor";

import styled from "styled-components";

const Div = styled.div`
  height: 300px;
  overflow: hidden;
`;

export default function LineChart() {
  const ref = d3Adaptor(
    (w, h) => {
      let margin = {
          top: 30,
          right: 30,
          left: 60,
          bottom: 60,
        },
        width = w - margin.left - margin.right,
        height = h - margin.top - margin.bottom;

      let container = d3
        .select(ref.current)
        .selectAll("svg")
        .data([{}])
        .join("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .selectAll(".container")
        .data([{}])
        .join("g")
        .attr("class", "container")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      // axes
      let x = d3.scaleTime().range([0, width]);

      let yL = d3.scaleLinear().range([height, 0]);
      let yR = d3.scaleLinear().range([height, 0]);

      const leftLine = d3
        .line()
        .x(function (d: any) {
          return x(d.date);
        })
        .y(function (d: any) {
          return yL(d["Number of Buildings"]);
        });

      const rightLine = d3
        .line()
        .x(function (d: any) {
          return x(d.date);
        })
        .y(function (d: any) {
          return yL(d["Number of Fixtures"]);
        });

      const xAxis = (g: any) =>
        g
          .call(d3.axisBottom(x))
          .attr("transform", `translate(0, ${height})`)
          .selectAll("text")
          .attr("x", 0)
          .attr("dx", 8) // offset the text down a bit away from the axis
          .attr("y", 0)
          .attr("dy", ".35em") // middle the text to the tick on x-axis
          .attr("transform", "rotate(90)")
          .attr("text-anchor", "start");

      x.domain(d3.extent(leadDate, (d) => new Date(d.Date)) as [Date, Date]);

      const yAxisLeft = (g: any) =>
        g.call(d3.axisLeft(yL).tickFormat(d3.format(".2s")));

      yL.domain([0, d3.max(leadDate, (d) => d["Number of Fixtures"])] as [
        number,
        number
      ]);

      const yAxisRight = (g: any) =>
        g.call(d3.axisRight(yR).tickFormat(d3.format(".2s")));

      yR.domain([0, d3.max(leadDate, (d) => d["Number of Buildings"])] as [
        number,
        number
      ]);

      container
        .selectAll(".x-axis")
        .data([{}])
        .join("g")
        .attr("class", "x-axis")
        .call(xAxis);

      container
        .selectAll(".y-axis-l")
        .data([{}])
        .join("g")
        .attr("class", "y-axis-l")
        .style("fill", "none")
        .call(yAxisLeft);

      //   container
      //     .selectAll(".y-axis-r")
      //     .data([{}])
      //     .attr("transform", "translate(" + width + " ,0)")
      //     .join("g")
      //     .attr("class", "y-axis-r")
      //     .style("fill", "none")
      //     .call(yAxisRight);

      let plotArea = container
        .selectAll(".plot-area")
        .data([{}])
        .join("g")
        .attr("class", "plot-area");

      plotArea
        .selectAll("path")
        .data([leadDate], (d: any) => d)
        .join("path")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("fill", "none")
        .attr(
          "d",
          d3
            .line()
            .x((d: any) => x(new Date(d.Date)))
            .y((d: any) => yL(d["Number of Buildings"])) as any
        );

      plotArea
        .append("path")
        .data([leadDate], (d: any) => d)
        .join("path")
        .attr("stroke", "red")
        .attr("stroke-width", 1.5)
        .attr("fill", "none")
        .attr(
          "d",
          d3
            .line()
            .x((d: any) => x(new Date(d.Date)))
            .y((d: any) => yL(d["Number of Fixtures"])) as any
        );
    },
    [leadDate]
  );

  return <Div ref={ref}></Div>;
}
