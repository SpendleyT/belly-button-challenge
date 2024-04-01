# Belly Button Challenge

<h2>Background</h2>
<p>In this assignment, you will build an interactive dashboard to explore the Belly Button Biodiversity datasetLinks to an external site., which catalogs the microbes that colonize human navels.</p>

<p>The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.</p>

<p>See results at <a href="https://spendleyt.github.io/">https://spendleyt.github.io/</a></p>

<h2>Instructions</h2>

Complete the following steps:
<ol>
<li>Use the D3 library to read in samples.json from the URL https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json.</li>
<li>Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.</li>
    <ul>
    <li>Use sample_values as the values for the bar chart.</li>
    <li>Use otu_ids as the labels for the bar chart.</li>
    <li>Use otu_labels as the hovertext for the chart.</li>
    </ul>

<li>Create a bubble chart that displays each sample.</li>
    <ul>
    <li>Use otu_ids for the x values.</li>
    <li>Use sample_values for the y values.</li>
    <li>Use sample_values for the marker size.</li>
    <li>Use otu_ids for the marker colors.</li>
    <li>Use otu_labels for the text values.</li>
    </ul>

<li>Display the sample metadata, i.e., an individual's demographic information.</li>

<li>Display each key-value pair from the metadata JSON object somewhere on the page.</li>

<li>Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard. </li>

<li>Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repo. Ensure that your repository has regular commits and a thorough README.md file</li>
</ol>

<h3>Advanced Challenge Assignment (Optional with no extra points earning)</h3>

The following task is advanced and therefore optional.
<ul>
<li>Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/Links to an external site. to plot the weekly washing frequency of the individual.</li>
<li>You will need to modify the example gauge code to account for values ranging from 0 through 9.</li>
<li>Update the chart whenever a new sample is selected.</li>
</ul>

<h3>References:</h3>
<ul>
<li>Plotly.com: <a href="https://www.plotly.com/javascript">Plotly for Javascript</a></li>
<li>MDN Web Docs: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries">Javascript Object</a></li>
<li>Plotly Community: <a href="https://community.plotly.com/t/plotly-js-gauge-pie-chart-data-order/8686/2">Creating a needle on gauge</a></li>
</ul>