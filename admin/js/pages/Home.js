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

      Highcharts.chart("chrtStatusKesBersara2024", {
        chart: {
          type: "pie",
        },
        title: {
          text: "Status Kes Bersara 2024",
        },
        tooltip: {
          valueSuffix: "%",
        },
        /* plotOptions: {
          series: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: [
              {
                enabled: true,
                distance: 20,
              },
              {
                enabled: true,
                distance: -40,
                format: "{point.percentage:.1f}%",
                style: {
                  fontSize: "1.2em",
                  textOutline: "none",
                  opacity: 0.7,
                },
                filter: {
                  operator: ">",
                  property: "percentage",
                  value: 10,
                },
              },
            ],
          },
        }, */
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
                name: "Baharu",
                sliced: true,
                selected: true,
                y: 26.71,
              },
              {
                name: "Penyediaan Kertas",
                y: 55.02,
              },
              {
                name: "Penentuan Prima Facie",
                y: 1.09,
              },
              {
                name: "Surat Pertuduhan",
                y: 15.5,
              },
              {
                name: "Semakan Kertas",
                y: 1.68,
              },
            ],
            showInLegend: true
          },
        ],
      });

      Highcharts.chart("chrtStatusKesBersara2025", {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
        },
        title: {
          text: "Status Kes Bersara 2025",
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        accessibility: {
          point: {
            valueSuffix: "%",
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            // colors,
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
                name: "Baharu",
                y: 5,
              },
              {
                name: "Penyediaan Kertas",
                y: 10,
              },
              {
                name: "Penentuan Prima Facie",
                y: 10,
              },
              {
                name: "Surat Pertuduhan",
                y: 5,
              },
              {
                name: "Semakan Kertas",
                sliced: true,
                selected: true,
                y: 70,
              },
            ],
            showInLegend: true
          },
        ],
      });

      Highcharts.chart("chrtStatusKes", {
        chart: {
          type: "bar",
        },
        title: {
          text: "Status Kes Berdasarkan Peranan Pegawai",
        },
        xAxis: {
          categories: [
            "02) KPP OA1 - YUS YULANDY (OA)",
            "03) KPP OA2 - SHAHRIMAN (OA)",
            "04) KPP OA3 - FAEZAH (OA)",
            "06) KPP OA5 - EZLY (OA)",
            "09) PP OA3 - ELINI (OA)",
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
            text: "Status Kes",
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
            name: "B01) Penyediaan (PP)",
            data: [632, 727, 3202, 721],
          },
          {
            name: "C) Surat Pertuduhan (SP)",
            data: [814, 841, 2453, 726],
          },
          {
            name: "E02) Semakan (PH)",
            data: [1393, 1031, 2689, 745],
          },
          {
            name: "H) RAYUAN (Selesai)",
            data: [1393, 1031, 2689, 745],
          },
        ],
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