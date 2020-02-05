var dropdown = d3.select("#selDataset");
d3.json("./samples.json").then(function(data) {
    data.names.map((d,i)=> dropdown.append('option').text(data.names[i]));
});

dropdown.on('change', updatePlotly);



function updatePlotly() {
    var dropdownMenu = d3.select('#selDataset');
    var dataset = dropdownMenu.property('value');

    function filterdata(sample) {
        return sample.id === dataset;
    };

    function filterMetadata(metadata) {
        return metadata.id == dataset;
    };

    d3.json("./samples.json").then(function(data) {

        var sample = data.samples.filter(filterdata);
        var metadata = data.metadata.filter(filterMetadata);

                
        // console.log(sample);
        // console.log(metadata);

        sample_values1 = sample[0].sample_values.slice(0,10).reverse();
        otu_ids1 = sample[0].otu_ids.slice(0,10).reverse().map(d=>`OTU ${d.toString()}`);
        otu_labels1 = sample[0].otu_labels.slice(0,10).reverse();

        // console.log(xvalues);
        // console.log(yvalues);
        // console.log(labels);
        // console.log(sample);
        
        var trace = {
            x: sample_values1,
            y: otu_ids1,
            type: 'bar',
            orientation: 'h',
            text: otu_labels1
        };
        
        var bardata = [trace];
        var barlayout = {
            xaxis: {
                title: 'Sample Values'
            },
            yaxis: {
            }
        };

        Plotly.newPlot('bar',bardata, barlayout)

        otu_ids2 = sample[0].otu_ids;
        sample_values2 = sample[0].sample_values;
        otu_labels2 = sample[0].otu_labels

        var trace1 = {
            x: otu_ids2,
            y: sample_values2,
            marker: {
                size: sample_values2,
                color: otu_ids2
            },
            mode: 'markers',
            text: otu_labels2,
            
        };
        var bubbledata = [trace1];
        var bubblelayout = {
            showlegend: false
        };

        Plotly.newPlot('bubble',bubbledata, bubblelayout)

        
        
        console.log(metadata.id)

        
        var row=d3.select('#sample-metadata').html('');

        metadata.forEach((meta)=>{
            Object.entries(meta).forEach(([key,value])=>{
                row.append('p').text(key.toUpperCase()+': '+value);
            });
        });


    });
};
