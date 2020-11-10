jQuery(function () {
    var menuItems = $('.sidebar-body ul');

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });

    menuItems.on('click', function (event) {
        var dropdown = $(event.target).closest('.dropdown');

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
        }
    })


    //  var dataColumns = JSON.parse(getColumns());


    function getDistanceVsRad() {

        getColumns().then(res => {

            console.log(res);
            res = JSON.parse(res);

            console.log('message', res["message"]);
            var columns = res["data"];
            var dataPlot = dataScatter(columns["pl_orbsmax"], columns["pl_radj"]);
            var names = columns["pl_name"];

            var labels = {
                x: 'semimajor axis(AU)',
                y: 'planet radius (Rjup)'
            }

            new Chart(document.getElementById("myChart2"), {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Scatter Dataset',
                        data: dataPlot,

                    }]
                },

                options: {

                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem, ) {
                                var label = names[tooltipItem.index];

                                return label;
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
                                max: 1.5
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
            });
        })
    }


    getDistanceVsRad();
});








//function formatData(dataX,dataY){}

// requestAPI().then(getColumns());

// Bar chart
/* new Chart(document.getElementById("myChart"), {
     type: 'bar',
     data: {
         labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
         datasets: [{
             label: "Population (millions)",
             backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
             data: [2478, 5267, 734, 784, 433]
         }]
     },
     options: {
         legend: {
             display: false
         },
         title: {
             display: true,
             text: 'Predicted world population (millions) in 2050'
         }
     }
 });

  data: [{
  x: -10,
  y: 0
  }, {
  x: 0,
  y: 10
  }, {
  x: 10,
  y: 5
  }]
  }]

 */