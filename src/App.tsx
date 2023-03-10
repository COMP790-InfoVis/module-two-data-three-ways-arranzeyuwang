import React from 'react';

import { VegaLite } from "react-vega";
import { leadData } from "./dataset/leadData";

import './App.css';

function App() {
  return (
    <div className="App">
      <head>
        <script src="https://cdn.jsdelivr.net/npm/vega@5.22.1"></script>
        <script src="https://cdn.jsdelivr.net/npm/vega-lite@5.6.1"></script>
        <script src="https://cdn.jsdelivr.net/npm/vega-embed@6.21.2"></script>
      </head>
      <header className="App-header">
        <h2>UNC Lead Exposure</h2>
      </header>
      <p className="App-body">
        <p>
          &emsp;The safety of water systems severely affects our life in UNC.
          In last November, many of us received emails form the department 
          about the lead tested in water fixtures of the Brooks building.
        </p>
        <p>
          &emsp;However, if we look at more details published on the university website,
          we'll see there're tens of buildings was reported to lead exposure.
          Despite these datasets being published, the table format with complex text 
          still makes it hard to get an at-a-glance understanding.
        </p>
        <p>
          &emsp;This website tends to visualize and explain concerns about
          where, when, and how lead exposure happened in UNC,
          to make the published dataset easier to understand.
        </p>
        <p>
          &emsp;Where --
          buildings that were reported lead exposure:
        </p>
        <div id="where">
          
        </div>
        <p>
          &emsp;When --
          number of lead-exposure buildings and fixtures reported by months:
        </p>
        <div id="when">

        </div>
        <p>
          &emsp;How many --
          number of lead-exposure fixtures in each building::
        </p>
        <div id="how">

        </div>
        <p>
          &emsp;Dataset source at:&nbsp;
          <a href="https://ehs.unc.edu/topics/campus-drinking-water/drinking-water-testing-results/">
            https://ehs.unc.edu/topics/campus-drinking-water/drinking-water-testing-results/
          </a>
        </p> 
      </p>
    </div>
  );
}

export default App;
