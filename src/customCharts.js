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



class ConfigChart {
    constructor(config, title) {
        this.config = config;
        this.names;
        this.id;
        this.title = title;
    }
    getDataX() {
        return this.config.data.datasets.data[0]
    }
    setDataX(dataX) {
        this.config.data.datasets.data[0] = dataX;
    }
    getDataY() {
        return this.config.data.datasets.data[1];
    }
    setDataY(dataY) {
        this.config.data.datasets.data[1] = dataY;
    }
    getMaxY() {
        return this.config.options.scales.yAxes[0].ticks.max;
    }
    setMaxY(maxY) {
        this.config.options.scales.yAxes[0].ticks.max = maxY;
    }
    getMaxX() {
        return this.config.options.scales.xAxes[0].ticks.max;
    }
    setMaxX(maxX) {
        this.config.options.scales.xAxes[0].ticks.max = maxX;
    }
    getTypeX() {
        return this.config.scales.xAxes[0].type;
    }
    setTypeX(type) {
        this.config.scales.xAxes[0].type = type;
    }
    getTypeY() {
        return this.config.scales.yAxes[0].type;
    }
    setTypeY(type) {
        this.config.scales.yAxes[0].type = type;
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
    setNames(names) {
        this.names = names
    }
    getNames() {
        return this.names
    }
    getType() {
        return this.config.type
    }
    setType(type) {
        this.config.type = type
    }
    setLabels(xLabel, yLabel) {
        this.config.options.scales.xAxes[0].scaleLabel.labelString = xLabel;
        this.config.options.scales.yAxes[0].scaleLabel.labelString = yLabel;
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
    getShowLabels() {
        var x = this.config.options.scales.xAxes[0].scaleLabel.display;
        var y = this.config.options.scales.yAxes[0].scaleLabel.display;
        return (x && y);
    }
    setShowLabels(bool) {
        this.config.options.scales.xAxes[0].scaleLabel.display = bool;
        this.config.options.scales.yAxes[0].scaleLabel.display = bool;
    }

    getShowLegend() {
        return this.config.options.legend.display;
    }
    setShowLegend(bool) {
        this.config.options.legend.display = bool;
    }
    showUncertainty(bool) {}
    setUncertainty(bool) {}
}


// config file


function getConfigExoplanets(dataPlot = null, names = null, labels = {
    x: null,
    y: null
}) {

    return {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Scatter Dataset',
                data: dataPlot,
                backgroundColor: 'blue'
            }]
        },
        options: {
            legend: {
                display: true
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem) {
                        var i = tooltipItem.index;
                        return names[i]
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
    }
}


function setAxisMax(max) {
    customConfig.options.scales.xAxes[0].ticks.max = max;
    new Chart(myChart, customConfig);
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