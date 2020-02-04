export default function buildsmallStatsPresenter() {
    return function (smallStatsData = []) { 
      let smallStats = []
      smallStatsData.forEach((value, idx) => {
        smallStats.push({
            label: String(value.label),
            value: String(value.count),
            chartLabels: value.data ? (new Array(value.data.length).fill(null)) : [null],
            attrs: { md: "6", sm: "6" },
            datasets: [
              {
                label: "Today",
                fill: "start",
                borderWidth: 1.5,
                backgroundColor: "rgba(0, 184, 216, 0.1)",
                borderColor: "rgb(0, 184, 216)",
                data: value.value || [0]
              }
            ]
      })
    })
    return smallStats
  }
}