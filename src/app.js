jQuery(function () {
    var menuItems = $('.sidebar-body ul');
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

        var id = $("canvas.active").attr('id');

        console.log('configObject', configObject);
        console.log('id', id);
        setSettings(configObject[id]);

    })
    $("#edit-plot-settings").on("click", function () {


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
        var dropdown = target.closest('.dropdown');

        if (dropdown) {
            if (dropdown.hasClass("dropped")) {
                dropdown.children(".fa-caret-down").addClass('hidden');
                dropdown.children(".fa-caret-right").removeClass('hidden');
                dropdown.next("ul").addClass('hidden');
                dropdown.removeClass('dropped');
                console.log(dropdown.find(".fa-caret-down"));
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


    //  var dataColumns = JSON.parse(getColumns());

    function getDistanceVsRad() {
        getColumns().then(res => {
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
            var id = myChart.attr('id');
            var myConfig = new ConfigChart(getConfigExoplanets(dataPlot, names, labels), title, id);
            setChart(myChart, myConfig, id);
        })
    }
    getDistanceVsRad();

    function setChart(element, configChart, id) {
        var title = configChart.getTitle();
        plotTitle.text(title);
        new Chart(element, configChart.getConfig());
        configChart.setId(id);
        configObject[id] = configChart;

    }

    function setSettings(configChart) {

        console.log('config:', configChart);
        max_x.val(configChart.getMaxX());
        max_y.val(configChart.getMaxY());
        showLegend.prop('checked', configChart.getShowLegend());
        showLabels.prop('checked', configChart.getShowLabels());
        //var showUncertainty = $("#bool-uncertainty");



    }
});