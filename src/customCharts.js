/*class ConfigStorage {


    constructor() {
        this.configList = {};
        this.dataList = {};
    }


    getConfig(id) {
        return this.configList[id];
    }

    setConfig(id, config) {
        this.configList[id] = config;
    }

    getConfigList() {
        return this.configList;
    }

}

*/


/** methods wrongly implemented */
//    getDataX(i = ) {
//        return this.config.data.datasets.data[0]
//    }

//    setDataX(dataX, i = 0) {
//        this.config.data.datasets[i].data[0] = dataX;
//    }
//    getDataY(i = 0) {
//        return this.config.data.datasets[i].data[1];
//    }
//    setDataY(dataY, i = 0) {
//        this.config.data.datasets[i].data[1] = dataY;
//    }


class ConfigChart {
    constructor(config, title = "") {
        this.config = config;
        this.title = title;
    }
    setDataset(datasets) {
        this.config.data.datasets = datasets
    }
    setData(data, i = 0) {
        this.config.data.datasets[i].data = data;
    }
    getMaxY(i = 0) {
        return this.config.options.scales.yAxes[i].ticks.max;
    }
    setMaxY(maxY, i = 0) {
        this.config.options.scales.yAxes[i].ticks.max = maxY;
    }
    getMaxX(i = 0) {
        return this.config.options.scales.xAxes[i].ticks.max;
    }
    setMaxX(maxX, i = 0) {
        this.config.options.scales.xAxes[i].ticks.max = maxX;
    }
    getTypeX(i = 0) {
        return this.config.scales.xAxes[i].type;
    }
    setTypeX(type, i = 0) {
        this.config.scales.xAxes[i].type = type;
    }
    getTypeY(i = 0) {
        return this.config.scales.yAxes[i].type;
    }
    setTypeY(type, i = 0) {
        this.config.scales.yAxes[i].type = type;
    }
    getConfig() {
        return this.config;
    }
    setConfig(config) {
        this.config = config;
    }
    getNames() {
        return this.names;
    }
    setNames(names, i = 0) {
        this.config.data.datasets[i].extra = names
    }
    getNames(i = 0) {
        return this.config.data.datasets[i].extra
    }
    getType() {
        return this.config.type
    }
    setType(type) {
        this.config.type = type
    }
    setLabels(xLabel, yLabel, i = 0) {
        this.config.options.scales.xAxes[i].scaleLabel.labelString = xLabel;
        this.config.options.scales.yAxes[i].scaleLabel.labelString = yLabel;
    }
    getTitle() {
        return this.title
    }
    setTitle(title) {
        this.title = title;
    }
    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getLegend(i = 0) {
        return this.config.data.datasets[i].label
    }
    setLegend(label, i = 0) {
        this.config.data.datasets[i].label = label;
    }
    getShowLabels(i = 0) {
        var x = this.config.options.scales.xAxes[i].scaleLabel.display;
        var y = this.config.options.scales.yAxes[i].scaleLabel.display;
        return (x && y);
    }
    setShowLabels(bool, i = 0) {
        this.config.options.scales.xAxes[i].scaleLabel.display = bool;
        this.config.options.scales.yAxes[i].scaleLabel.display = bool;
    }
    getShowLegend() {
        return this.config.options.legend.display;
    }
    setShowLegend(bool) {
        this.config.options.legend.display = bool;
    }
    showUncertainty(bool) {}
    setUncertainty(bool) {}

    setColor(color, i = 0) {
        this.config.data.datasets[i].backgroundColor = color;
    }
    getColor(i = 0) {
        return this.config.data.datasets[i].backgroundColor;
    }
}

// config file


function getConfigExoplanets(dataPlot = null, names = null, legend = 'Scatter dataset', color = "blue") {
    var config = getDefaultConfig();
    var datasets = [{
        label: legend,
        data: dataPlot,
        backgroundColor: color,
        extra: names
    }]
    config.setDataset(datasets);
    return config
}

/*return {
    type: 'scatter',
    data: {
        datasets: [{
            label: legend,
            data: dataPlot,
            backgroundColor: color,
            extra: names

        }]
    },
    options: {
        legend: {
            display: true
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].extra[tooltipItem.index]
                },
                afterLabel: function (tooltipItem, data) {
                    var item = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                    return item.x + ' , ' + item.y;
                }
            }
        },
        scales: {
            xAxes: [{
                type: 'linear',
                position: 'bottom',
                scaleLabel: {
                    display: true,
                    labelString: labels.x
                },

                ticks: {
                    min: 0,
                    max: 0.75
                    // max: 0.4 //1.5 
                }
            }],

            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: labels.y
                },
                ticks: {
                    min: 0,
                    max: 2.5
                }
            }]
        }
    }
}*/



function setAxisMax(max) {
    customConfig.options.scales.xAxes[0].ticks.max = max;
    new Chart(myChart, customConfig);
}


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function unique(value, index, self) {
    return self.indexOf(value) === index;
}


// change color chart

/*
    var bars = myObjBar.datasets[0].bars;
    for (i = 0; i < bars.length; i++) {
        var color = "green";
        //You can check for bars[i].value and put your conditions here
        bars[i].fillColor = color;

    }
    myObjBar.update(); //update the chart
    */



function getDefaultConfig() {
    return {
        type: 'scatter',
        data: {},
        options: {
            legend: {
                display: true
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        return data.datasets[tooltipItem.datasetIndex].extra[tooltipItem.index]
                    },
                    afterLabel: function (tooltipItem, data) {
                        var item = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        return item.x + ' , ' + item.y;
                    }
                }
            },
            scales: {
                xAxes: [{
                    type: 'linear',
                    position: 'bottom',
                    scaleLabel: {
                        display: true,
                        labelString: ""
                    },

                    ticks: {
                        min: 0,
                        max: 0.75
                        // max: 0.4 //1.5 
                    }
                }],

                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: ""
                    },
                    ticks: {
                        min: 0,
                        max: 2.5
                    }
                }]
            }
        }
    }
}