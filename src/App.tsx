import React, { useRef, useEffect } from "react";

import { leadBuildings } from "./dataset/leadData";

import { Pie, Column, measureTextWidth } from "@antv/g2plot";

import D3LineChart from "./LineChart";

import "./App.css";

function renderStatistic(containerWidth: number, text: string, style: any) {
  const textWidth = measureTextWidth(text, style);
  const textHeight = style.lineHeight || style.fontSize;
  const R = containerWidth / 2;
  // r^2 = (w / 2)^2 + (h - offsetY)^2
  let scale = 1;
  if (containerWidth < textWidth) {
    scale = Math.min(
      Math.sqrt(
        Math.abs(
          Math.pow(R, 2) /
            (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))
        )
      ),
      1
    );
  }
  const textStyleStr = `width:${containerWidth}px;`;
  return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
    scale < 1 ? 1 : "inherit"
  };">${text}</div>`;
}

function newSort(x: any, y: any) {
  return y["Number of Places"] - x["Number of Places"];
}

function App() {
  let sortData = leadBuildings;

  const containerWhich = useRef(null);

  const containerHow = useRef(null);

  useEffect(() => {
    if (!containerWhich.current) {
      return;
    }
    const piePlot = new Pie(containerWhich.current, {
      appendPadding: 10,
      data: leadBuildings,
      angleField: "Number of Places",
      colorField: "Type",
      radius: 1,
      innerRadius: 0.64,
      label: {
        type: "inner",
        offset: "-50%",
        autoRotate: false,
        style: { textAlign: "center" },
        formatter: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      },
      statistic: {
        title: {
          offsetY: -4,
          customHtml: (container, view, datum) => {
            const { width, height } = container.getBoundingClientRect();
            const d = Math.sqrt(
              Math.pow(width / 2, 2) + Math.pow(height / 2, 2)
            );
            const text = datum ? datum["Building"] : "Total";
            return renderStatistic(d, text, { fontSize: 28 });
          },
        },
      },
      interactions: [
        { type: "element-selected" },
        { type: "element-active" },
        { type: "pie-statistic-active" },
      ],
    });
    piePlot.render();

    if (!containerHow.current) {
      return;
    }
    const barPlot = new Column(containerHow.current, {
      appendPadding: 10,
      data: sortData.sort(newSort),
      xField: "Building",
      yField: "Number of Places",
      xAxis: {
        label: {
          autoRotate: false,
        },
      },
      slider: {
        start: 0,
        end: 0.1,
      },
    });
    barPlot.render();
  }, [sortData]);

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h2>UNC Lead Exposure</h2>
        </header>
        <div className="App-body">
          <p>
            &emsp;The safety of water systems severely affects our life in UNC.
            In last November, many of us received emails form the department
            about the lead tested in water fixtures of the Brooks building.
          </p>
          <p>
            &emsp;However, if we look at more details published on the
            university website, we'll see there're more than one hundred
            buildings was reported to lead exposure. Despite these datasets
            being published, the table format with complex text still makes it
            hard to get an at-a-glance understanding.
          </p>
          <p>
            &emsp;This website tends to visualize and explain concerns about
            when, where, and how many lead exposure happened in UNC, to make the
            published dataset easier to understand.
          </p>
          <p>
            &emsp;When -- (in{" "}
            <a className="inline-text" href="https://d3js.org/">
              {" "}
              D3
            </a>
            ):
          </p>
          <div className="line-chart" id="when">
            <D3LineChart />
          </div>
          <p>
            The above chart shows the number of lead-exposure buildings (in blue
            line) and fixtures (in red line) reported by UNC from August 2022 to
            February 2023 per month.
          </p>
          <p>
            The results obviously show that i) this round of lead exposure
            started in August, where Winson Library was found lead in 3 fixtures
            on Aug. 30, ii) the biggest number of lead exposure was tected in
            November (69 buildings with 188 fixtures), when we received emails
            from CS department, and iii) the exposure trend is descending now,
            as of 7 buildings and 16 fixtures were reported in February.
          </p>
          <p>
            According to the results and descending trend, we could assume the
            lead-exposure problem is being solving now.
          </p>
          <p>
            &emsp;Where -- (in{" "}
            <a
              className="inline-text"
              href="https://g2plot.antv.antgroup.com/en/"
            >
              {" "}
              G2Plot
            </a>
            ):
          </p>
          <div>
            <div className="pie-chart" ref={containerWhich} />
          </div>
          <p>
            The above chart shows types and portions of buildings that were
            reported lead exposure by UNC. Hovering on the pies, you can see the
            number of places tested with lead exposure in specific buildings. By
            clicking the legends, you can explore the data within specific
            building types.
          </p>
          <p>
            The results indicate that the largest lead-exposed portions
            buildings were department halls (in yellow). Student residence (lite
            blue above) takes about 20 percent of total.
          </p>
          <p>
            Based on the above results, we should still be careful when drinking
            water in department hall and residence.
          </p>
          <p>
            &emsp;How many -- (in{" "}
            <a
              className="inline-text"
              href="https://g2plot.antv.antgroup.com/en/"
            >
              {" "}
              G2Plot
            </a>
            )
          </p>
          <div>
            <div className="bar-chart" ref={containerHow} />
          </div>
          <p>
            The above chart shows the number of places with lead exposure across
            differnet buildings. You can use the slider bar to change the range
            of buildings in visualization and hover to see the building name and
            exposures.
          </p>
          <p>
            From the above results, the biggest numbers appear in the Kenan
            Studium (23), which is around 7% of all cases and the Wilson Library
            (16, 5%). Brinkhous-Bullitt Building (14), Mitchell Hall (12), and
            Kenan Center (11) are above 10 as well. Btw, Sitterson Hall ranked
            No.6 with 8 lead exposures.
          </p>
          <p>
            Thus please be specificly avoiding using fixtures in Kenan Studium
            and Wilson Library. And also be careful in the Sitterson Hall.
          </p>
          <p>
            &emsp;Dataset source at:&nbsp;
            <a href="https://ehs.unc.edu/topics/campus-drinking-water/drinking-water-testing-results/">
              https://ehs.unc.edu/topics/campus-drinking-water/drinking-water-testing-results/
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
