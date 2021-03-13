d3.json("samples.json").then((data) => {
  console.log(data.metadata);
});


function build_charts(sample) {

d3.json("samples.json").then((data) => {
  var samples= data.samples;
  var result_array= samples.filter(sampleobject => sampleobject.id == sample);
  var result= result_array[0]

  var ids = result.otu_ids;
  var labels = result.otu_labels;
  var values = result.sample_values;


  var bubble_layout = {
    margin: { t: 0 },
    xaxis: { title: "Id's" },
    hovermode: "closest",
    };

    var bubble_data = [
    {
      x: ids,
      y: values,
      text: labels,
      mode: "markers",
      marker: {
        color: ids,
        size: values,
        }
    }
  ];

  Plotly.plot("bubble", bubble_data, bubble_layout);

  
  var bar_data =[
    {
      y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      x:values.slice(0,10).reverse(),
      text:labels.slice(0,10).reverse(),
      type:"bar",
      orientation:"h"

    }
  ];

  var bar_layout = {
    title: "Top 10 OTUs Found",
    margin: { t: 30, l: 150 }
  };

  Plotly.newPlot("bar", bar_data, bar_layout);
});
}


function init() {
var selector = d3.select("#selDataset");

d3.json("samples.json").then((data) => {
  var sample_names = data.names;
  sample_names.forEach((sample) => {
    selector
      .append("option")
      .text(sample)
      .property("value", sample);
  });

  const first_sample = sample_names[0];
  build_charts(first_sample);
});
}

function showmetadata(data) {
  console.log(data)
  var ul = d3.select("#sample-metadata");
  ul.html("") 
  Object.entries(data).forEach(([keys, value]) => {
      ul.append("h5").text(`${keys} : ${value}`)
      console.log(keys, value)
  });
}

function optionChanged(new_sample) {
build_charts(new_sample);
showmetadata(data)
}

init();
///////////////////////////////////////////////////////////

