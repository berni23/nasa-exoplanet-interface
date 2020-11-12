jQuery(function () {
    var menuItems = $('.sidebar-body>ul');
    var sidebar = $('#sidebar');
    var myChart = $("#chart-1");
    var menuWidth = sidebar.outerWidth();
    var btnPlotSettings = $(".plot-settings");
    var plotTitle = $("#plot-title");

    // input settngs

    var max_x = $("#max-x");
    var max_y = $("#max-y");
    var showLegend = $("#bool-legend");
    var showLabels = $("#bool-labels");
    var showUncertainty = $("#bool-uncertainty");
    var configObject = {}

    // btnPlotSettings.trigger("click");

    btnPlotSettings.on("click", function () {
        clearErrors();
        var id = $("canvas.active").attr('id');
        setSettingsToModal(configObject[id]);
    })
    $("#edit-plot-settings").on("click", function () {

        var regex = /(?<=^|)\d+\.\d+(?=$|)/;
        var error = 'only numbers with decimals';
        var conditions = [regex, regex];
        var errors = [error, error];
        var inputs = [max_x, max_y];

        if (validateLoop(inputs, conditions, errors)) {
            var config = configObject[$("canvas.active").attr('id')];
            setSettingsToConfig(config);
            new Chart($("canvas.active"), config.getConfig());
            $("#close-plot-settings").trigger("click");
        }
        // validate changes , implement settings to config object, new chart()
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
        } else if (target.hasClass("my-content") && !target.hasClass("active")) {
            target.addClass("content-active"); // blueish color on click
            var id = target.attr("data-chart");
            $(`#${id}`).removeClass('hidden');
            $(`#${id}`).addClass('active');
            $("canvas.active").addClass('hidden');
            $("canvas.active").removeClass('active');

        }
    })

    $("#menu-group-by").on("click", function (event) {
        if ($(event.target) !== $(event.currentTarget)) {
            var dataChart = $(event.target).attr("data-chart");
            if (!configObject[dataChart]) {
                switch (dataChart) {
                    case "chart-1-1":
                        plotDiscMethod()
                        break;

                }

            }

        }

    })


    //  var dataColumns = JSON.parse(getColumns());

    function getDistanceVsRad() {
        fetchDistanceRad().then(res => {

            // console.log(res);
            res = JSON.parse(res);
            console.log('message', res["message"]);
            var columns = res["data"];
            var dataPlot = dataScatter(columns["pl_orbsmax"], columns["pl_radj"]);
            console.log(dataPlot);
            var names = columns["pl_name"];
            var labels = {
                x: 'semimajor axis (AU)',
                y: 'planet radius (Rjup)'
            }
            var title = "Distance to the star vs planet radius";
            var legend = "Confirmed exoplanets"
            var id = myChart.attr('id');
            var myConfig = new ConfigChart(getConfigExoplanets(dataPlot, names, labels, legend), title, id);
            setChart(myChart, myConfig, id);
        })
    }


    //getDistanceVsRad();
    plotDiscMethod();

    function setChart(element, configChart, id) {
        var title = configChart.getTitle();
        plotTitle.text(title);
        new Chart(element, configChart.getConfig());
        configChart.setId(id);
        configObject[id] = configChart;
    }

    function setSettingsToModal(configChart) {
        console.log('config:', configChart);
        max_x.val(configChart.getMaxX());
        max_y.val(configChart.getMaxY());
        showLegend.prop('checked', configChart.getShowLegend());
        showLabels.prop('checked', configChart.getShowLabels());
        //var showUncertainty = $("#bool-uncertainty");
    }

    function setSettingsToConfig(configChart) {
        configChart.setMaxX(parseFloat(max_x.val()));
        configChart.setMaxY(parseFloat(max_y.val()));
        console.log(showLegend.prop('checked'));
        configChart.setShowLegend(showLegend.prop('checked'));
        configChart.setShowLabels(showLabels.prop('checked'));
        return configChart;
    }


    function plotDiscMethod() {
        getColumns(["pl_orbsmax", "pl_radj", "pl_hostname", "pl_discmethod"], ["pl_orbsmax", "pl_radj"]).then(function (data) {

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
                //   color_methods[method] = 

            });

            methods.forEach(function (method, i) {
                var j = type_methods.indexOf(method);
                datasets[j]['data'].push({
                    x: data["pl_orbsmax"][i],
                    y: data["pl_radj"][i]
                })

                datasets[j]['extra'].push(data["pl_hostname"][i]);

            })

            var config = new ConfigChart(getDefaultConfig())
            config.setId('chart-1-1');
            config.setDataset(datasets);
            config.setLabels('semimajor axis (AU)', 'planet radius (Rjup)');
            configObject['chart-1-1'] = config.getConfig();
            new Chart($('#chart-1-1'), config.getConfig());

        })

    }
});