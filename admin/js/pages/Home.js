function Home () {
  
  const className = 'Home';
  let self = this;
  let dtDisplay;
  let modalConfirmDelete;
  let modalConfirmAction;
  let modalPermohonanPengisian;
  let userId;

  this.init = function () {
    try {
      const colors = Highcharts.getOptions().colors.map((c, i) =>
        Highcharts.color(Highcharts.getOptions().colors[0])
          .brighten((i - 3) / 7)
          .get()
      );

      Highcharts.chart("chrtStatusPemerolehan2024", {
        chart: {
          type: "pie",
        },
        title: {
          text: "Status Pemerolehan 2024",
        },
        tooltip: {
          valueSuffix: "%",
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            colors,
            borderRadius: 5,
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b><br>{point.percentage:.1f} %",
              distance: -50,
            },
          },
        },
        series: [
          {
            name: "Status",
            colorByPoint: true,
            data: [
              {
                name: "Tamat",
                sliced: true,
                selected: true,
                y: 75,
              },
              {
                name: "Dalam Proses",
                y: 25,
              }
            ],
            showInLegend: true
          },
        ],
      });

      Highcharts.chart("chrtBilPermohonanCalon", {
        chart: {
          type: "bar",
        },
        title: {
          text: "Bilangan Permohonan Calon Menerima Tawaran Mengikut Skim",
        },
        xAxis: {
          categories: [
            "1042",
            "1048",
            "1180",
            "1184",
            "1188",
          ],
          title: {
            text: null,
          },
          gridLineWidth: 1,
          lineWidth: 0,
        },
        yAxis: {
          min: 0,
          title: {
            text: "Bil. Permohonan",
            align: "high",
          },
          labels: {
            overflow: "justify",
          },
          gridLineWidth: 0,
        },
        tooltip: {
          valueSuffix: "  kes",
        },
        plotOptions: {
          bar: {
            borderRadius: "50%",
            dataLabels: {
              enabled: true,
            },
            groupPadding: 0.1,
            colors,
          },
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "top",
          x: -40,
          y: 80,
          floating: true,
          borderWidth: 1,
          backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
          shadow: true,
        },
        credits: {
          enabled: false,
        },
        series: [
          {
            name: "2025",
            data: [632, 727, 3202, 250],
          },
          {
            name: "2024",
            data: [814, 841, 2453, 490],
          },
          {
            name: "2023",
            data: [1393, 1031, 2689, 980],
          },
        ],
      });

      Highcharts.chart('chrtBilTemudugaMengikutNegeri', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Bilangan Temuduga Mengikut Negeri'
        },
        xAxis: {
          categories: ['Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Pulau Pinang', 'Perak', 'Perlis', 'Selangor', 'Terengganu', 'Sabah', 'Sarawak', 'WP Kuala Lumpur'],
          crosshair: true,
          accessibility: {
            description: 'Negeri'
          }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Bilangan Temuduga'
            }
        },
        tooltip: {
            valueSuffix: ' temuduga'
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [
          {
            name: 'Selesai',
            data: [546, 224, 654, 213, 123, 678, 546, 224, 654, 213, 123, 678, 789, 567]
          },
          {
            name: 'Akan Datang',
            data: [234, 213, 456, 232, 245, 267, 245, 232, 234, 289, 213, 234, 245, 213]
          },
          {
            name: 'Sedang Berjalan',
            data: [123, 145, 165, 128, 123, 156, 178, 189, 195, 153, 124, 143, 134, 142]
          },
        ]
      });

      Highcharts.chart('chrtBilCalonMengikutNegeri', {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Bilangan Permohonan Calon Temuduga Mengikut Negeri'
        },
        xAxis: {
          categories: ['Johor', 'Kedah', 'Kelantan', 'Melaka', 'Negeri Sembilan', 'Pahang', 'Pulau Pinang', 'Perak', 'Perlis', 'Selangor', 'Terengganu', 'Sabah', 'Sarawak', 'WP Kuala Lumpur'],
          crosshair: true,
          accessibility: {
            description: 'Negeri'
          }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Bilangan Permohonan Calon Temudug'
            }
        },
        tooltip: {
            valueSuffix: ' permohonan'
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [
          {
            name: '2025',
            data: [546, 224, 654, 213, 123, 678, 546, 224, 654, 213, 123, 678, 789, 567]
          },
          {
            name: '2024',
            data: [234, 213, 456, 232, 245, 267, 245, 232, 234, 289, 213, 234, 245, 213]
          },
          {
            name: '2023',
            data: [123, 145, 165, 128, 123, 156, 178, 189, 195, 153, 124, 143, 134, 142]
          },
        ]
      });
    
    } catch (e) { throw new Error(); }
  }

  this.setDtDisplay = function (_dtDisplay) {
    dtDisplay = _dtDisplay;
  };

  this.setModalConfirmAction = function (_modalConfirmAction) {
    modalConfirmAction = _modalConfirmAction;
  };
  
  this.setModalConfirmDelete = function (_modalConfirmDelete) {
    modalConfirmDelete = _modalConfirmDelete;
  };
}