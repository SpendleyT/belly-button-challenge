//Read in samples.json data
const url = 'https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json';

//Retrieve data from the API and jsonify it
async function getData() {
    const response = await fetch(url);
    const data = await response.json();

    return data;
};

//Update page when a new patient is selected
function optionChanged(id) {
    //split graphData and call each graph with respective data
    patient = graphData[0].find(data => data.id === id);
    patient_meta = graphData[1].find(data => data.id === parseInt(id));
    plotBarGraph(patient);
    plotGaugeGraph(patient_meta);
    plotBubbleGraph(patient);
    showMetaData(patient_meta);
};

//Create a bar graph based on the patient data
function plotBarGraph(patient) {
    const values = patient["sample_values"].slice(0, 10);
    const labels = patient["otu_labels"].slice(0, 10);
    const otus = patient["otu_ids"].slice(0, 10).map(label => "OTU " + label);

    // Default trace for the country data
    let trace = {
        x: values.reverse(),
        y: otus.reverse(),
        text: labels,
        type: "bar",
        orientation: 'h',
        sort: true
    }

    // Data Array
    let data = [trace];

    // Layout object
    let layout = {
        title: "Patient's Sample Values (by OTU)",
        xaxis: {title: 'Sample Value'},
        yaxis: {title: 'OTU ID'},
    }

    // Render the plot to the div tag with id "pie"
    Plotly.newPlot("bar", data, layout);
};

//Create a bubble graph based on the patient data
function plotBubbleGraph(patient) {
    const values = patient["sample_values"].slice(0, 10);
    const labels = patient["otu_labels"].slice(0, 10);
    const otus = patient["otu_ids"].slice(0, 10);

    // Default trace for the country data
    let trace = {
        x: otus.reverse(),
        y: values.reverse(),
        text: labels,
        mode: 'markers',
        marker: {
            size: values,
            sizeref: (2.0 * Math.max(...values)) / (110**2),
            
            sizemode: 'area',
            color: [
                "#708efa", "#5d88e8","#4c81d6", "#3e7ac4", "#3373b1", 
                "#2c6b9e", "#29628c", "#285a7a", "#295168", "#2a4858"
              ]
        }
    }

    // Data Array
    let data = [trace];

    // Layout object
    let layout = {
        title: "Relative Sample Values",
        xaxis: {title: 'OTU ID'},
        yaxis: {title: 'Sample Value'},
    }

    // Render the plot to the div tag with id "pie"
    Plotly.newPlot("bubble", data, layout);

};

//POpulate the Gauge chart
function plotGaugeGraph(meta) {
    frequency = meta["wfreq"];

    let data = [
        {
          type: "indicator",
          mode: "gauge",
          value: parseInt(frequency),
          title: { text: "Belly Button Washing Frequency", font: { size: 24 } },
          gauge: {
            axis: { range: [null, 10], tickwidth: 1, tickcolor: "darkblue" },
            bar: { color: "white", thickness: 0 },
            bgcolor: "white",
            borderwidth: 0,
            bordercolor: "gray",
            showticklabels: true,
            steps: [
              { range: [0, 1], color: "#1ab4b8"},
              { range: [1, 2], color: "#1aacb8"},
              { range: [2, 3], color: "#1aa4b8"},
              { range: [3, 4], color: "#1a9cb8"},
              { range: [4, 5], color: "#1a94b8"},
              { range: [5, 6], color: "#1a8cb8"},
              { range: [6, 7], color: "#1a84b8"},
              { range: [7, 8], color: "#1a7cb8"},
              { range: [8, 9], color: "#1a74b8"},
              { range: [9, 10], color: "#1a6cb8"}
            ]
          }
        }
      ];

      // needle
      let degrees = parseInt(frequency)*19, radius = .75;
      let radians = degrees * Math.PI / 180;
      let x = -1 * radius * Math.cos(radians);
      let y = radius * Math.sin(radians);


      let layout = {
        annotations: [
          {
            ax: 0,
            ay: 0,
            axref: 'x',
            ayref: 'y',
            x: x,
            y: y,
            xref: 'x',
            yref: 'y',
            showarrow: true,
            arrowhead: 9,
          }
        ],
        shapes: [
          // 1st highlight during Feb 4 - Feb 6
          {
              type: 'rect',
              // x-reference is assigned to the x-values
              xref: 'x',
              // y-reference is assigned to the plot paper [0,1]
              yref: 'paper',
              x0: '2015-02-04',
              y0: 0,
              x1: '2015-02-06',
              y1: 1,
              fillcolor: '#d3d3d3',
              opacity: 0.2,
              line: {
                  width: 0
              }
          }],
        xaxis: {visible: false, range: [-1, 1]},
        yaxis: {visible: false, range: [0, 1]},
        width: 400,
        height: 300,
        margin: { t: 25, r: 25, l: 25, b: 25 },
        font: { color: "darkblue", family: "Arial" }
      };
      
      Plotly.newPlot('gauge', data, layout);
};

//Populate the dropdown with patient IDs and return patient data and metadata
function populateDropdown(samples) {
    let top20 = [];
    let metaData = [];
    //loop through sample json and populate (meta)data
    for (i = 0; i < 20; i++) {
        let data = samples["samples"][i];
        let meta = samples["metadata"][i];
        top20.push(data);
        metaData.push(meta);
    };

    //Add the IDs to the dropdown selector
    let selector = d3.select("#selDataset");
    let opts = selector.selectAll(null)
        .data(top20.sort())
        .enter()
        .append('option')
        .attr('value', function (d) {
          return d.id
        })
        .text(function (d) {
          return d.id
        });
    
    //Return the patient (meta)data
    return [top20, metaData];
};

// Populate patient demographic information
function showMetaData(meta) {
    const frame = d3.select("#sample-metadata");

    //clear frame children (if exists)
    frame.selectAll("*").remove();

    //loop through the metadata and create a span to show info
    for (const [key, value] of Object.entries(meta)) {
        let span = frame.append("span");
        span.text(`${key}: ${value}`);
        span.append("br");
      }
      
}

//Main code to setup the page/dropdown
let graphData = [];
getData().then(samples => {
    graphData = populateDropdown(samples);
});





