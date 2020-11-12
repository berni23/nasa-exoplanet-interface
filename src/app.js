jQuery(function () {
    var menuItems = $('.sidebar-body>ul');
    var sidebar = $('#sidebar');
    var myChart = $("#chart-1");
    var menuWidth = sidebar.outerWidth();
    var btnPlotSettings = $(".btn-plot-settings");
    var plotTitle = $("#plot-title");
    var main = $('main');

    // input settngs

    var max_x = $("#max-x");
    var max_y = $("#max-y");
    var showLegend = $("#bool-legend");
    var showLabels = $("#bool-labels");
    var showUncertainty = $("#bool-uncertainty");
    var configObject = {};
    var chartObject = {}

    // btnPlotSettings.trigger("click");

    function initialize() {
        getDistanceVsRad('chart-1').then(config => {
            console.log(config);
            plotChart(config);
        })
    }

    initialize();

    btnPlotSettings.on("click", function () {
        clearErrors();
        var id = $("canvas.active").attr('id');
        setSettingsToModal(configObject[id]);
    })
    $("#edit-plot-settings").on("click", function () {
        var regex = /^\d+(\.\d+)*$/
        var error = 'only numbers with decimals';
        var conditions = [regex, regex];
        var errors = [error, error];
        var inputs = [max_x, max_y];

        if (validateLoop(inputs, conditions, errors)) {
            var id = $("canvas.active").attr('id');
            var config = configObject[id];
            setSettingsToConfig(config);
            chartObject[id].destroy();
            chartObject[id] = new Chart($("canvas.active"), config.getConfig());
            $("#close-plot-settings").trigger("click");
        }
    })


    $('#sidebarCollapse').on('click', function () {
        sidebar.toggleClass('active');
        $(this).toggleClass('active');
        if (!myChart.hasClass('hidden')) {
            if (sidebar.hasClass('active')) myChart.width(`+=${menuWidth}`);
            else myChart.width(`-=${menuWidth}`);
        }
    });

    menuItems.on('click', function (event) {
        var target = $(event.target);
        var dropdown = target.closest('.Dropdown');
        if (dropdown) {
            if (dropdown.hasClass("dropped")) {
                dropdown.children(".fa-caret-down").addClass('hidden');
                dropdown.children(".fa-caret-right").removeClass('hidden');
                dropdown.next("ul").addClass('hidden');
                dropdown.removeClass('dropped');
            } else {
                dropdown.children(".fa-caret-down").removeClass('hidden');
                dropdown.children(".fa-caret-right").addClass('hidden');
                dropdown.next("ul").removeClass('hidden');
                dropdown.addClass('dropped');
            }
        }
        if (target.hasClass("my-content") && !target.hasClass("content-active")) {
            var lastActive = $(".content-active");
            $(`#${lastActive.attr('data-content')}`).addClass('hidden');
            lastActive.removeClass("content-active");
            target.addClass("content-active");
            var id = target.attr("data-content");
            $(`#${id}`).removeClass('hidden');
        }
    })

    function showCanvas(id) {
        $("canvas.active").addClass('hidden');
        $("canvas.active").removeClass('active');
        $(`#${id}`).removeClass('hidden');
        $(`#${id}`).addClass('active');
    }



    $("#menu-group-by").on("click", function (event) {
        if ($(event.target) !== $(event.currentTarget)) {
            var id = $(event.target).attr("data-chart");
            var chart = $(`#${id}`);
            if (!chart.hasClass('active')) {
                if (id in configObject) showCanvas(id);
                else {
                    switch (id) {
                        case "chart-1-1":
                            plotDiscMethod("chart-1-1").then(config => plotChart(config));
                            break;
                        case "chart-1":
                            getDistanceVsRad("chart-1").then(config => plotChart(config));
                            break;
                    }
                }
            }
        }
    })

    function plotChart(config) {
        var id = config.getId();
        $(`#${id}`).empty();
        chartObject[id] = new Chart($(`#${id}`), config.getConfig());
        plotTitle.text(config.getTitle());
        showCanvas(id);
    }

    function getDistanceVsRad(id) {
        return fetchDistanceRad().then(res => {
            res = JSON.parse(res);
            console.log('message', res["message"]);
            var columns = res["data"];
            var dataPlot = dataScatter(columns["pl_orbsmax"], columns["pl_radj"]);
            var names = columns["pl_name"];
            var labels = {
                x: 'semimajor axis (AU)',
                y: 'planet radius (Rjup)'
            }
            var title = "Distance to the star vs planet radius";
            var legend = "Confirmed exoplanets";
            var myConfig = new ConfigChart(getDefaultConfig(), title);

            var datasets = [{
                label: legend,
                data: dataPlot,
                backgroundColor: 'blue',
                extra: names
            }]
            myConfig.setDataset(datasets);
            myConfig.setLabels(labels.x, labels.y);
            myConfig.setId(id);

            configObject[id] = myConfig;
            return myConfig;
        })
    }

    //getDistanceVsRad();
    //plotDiscMethod();

    function setSettingsToModal(configChart) {
        console.log('config:', configChart);
        max_x.val(configChart.getMaxX());
        max_y.val(configChart.getMaxY());
        showLegend.prop('checked', configChart.getShowLegend());
        showLabels.prop('checked', configChart.getShowLabels());
        //var showUncertainty = $("#bool-uncertainty");
    }

    function setSettingsToConfig(configChart) {

        var maxX = parseFloat(round(max_x.val()));
        var maxY = parseFloat(round(max_y.val()));
        configChart.setMaxX(maxX);
        configChart.setMaxY(maxY);
        console.log(showLegend.prop('checked'));
        configChart.setShowLegend(showLegend.prop('checked'));
        configChart.setShowLabels(showLabels.prop('checked'));

        return configChart;
    }

    function plotDiscMethod(id) {
        if (!(id in configObject)) {
            return getColumns(["pl_orbsmax", "pl_radj", "pl_hostname", "pl_discmethod"], ["pl_orbsmax", "pl_radj"]).then(function (data) {
                data = JSON.parse(data)['data'];
                var methods = data["pl_discmethod"];
                var type_methods = (methods.filter(unique))
                var datasets = [];
                type_methods.forEach((method, i) => {
                    datasets.push({});
                    datasets[i]['data'] = [];
                    datasets[i]['backgroundColor'] = getRandomColor();
                    datasets[i]['label'] = method;
                    datasets[i]['extra'] = [];
                });

                methods.forEach(function (method, i) {
                    var j = type_methods.indexOf(method);
                    datasets[j]['data'].push({
                        x: data["pl_orbsmax"][i],
                        y: data["pl_radj"][i]
                    })
                    datasets[j]['extra'].push(data["pl_hostname"][i]);
                })
                var config = new ConfigChart(getDefaultConfig());
                config.setId(id);
                config.setDataset(datasets);
                config.setLabels('semimajor axis (AU)', 'planet radius (Rjup)');
                config.setTitle("Distance to the star vs planet radius");
                configObject[id] = config;
                return config
            })
        } else {
            var config = configObject[id];
            return config;
        }
    }

    function round(num) {

        return Math.round((num) * 100) / 100
    }
});