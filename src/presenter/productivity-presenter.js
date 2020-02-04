export default function buildProductivityPresenter(getEmployeesUseCase) {
    return function({title, labels, data}) {
        let result = {
            title,
            labels,
            chartData: {
                datasets: []
            }
        }
        data.forEach((element, idx) => {
            if(idx === 0) {
                result.chartData.datasets.push({
                    label: element.label,
                    fill: "start",
                    data: element.data,
                    backgroundColor: "rgba(0,123,255,0.1)",
                    borderColor: element.color || "rgba(0,123,255,1)",
                    pointBackgroundColor: "#ffffff",
                    pointHoverBackgroundColor: element.color || "rgb(0,123,255)",
                    borderWidth: 1.5,
                    pointRadius: 0,
                    pointHoverRadius: 3
                })
            } else {
                result.chartData.datasets.push({
                    label: element.label,
                    fill: "start",
                    data: element.data,
                    backgroundColor: "rgba(255,65,105,0.1)",
                    borderColor: element.color || "rgba(255,65,105,1)",
                    pointBackgroundColor: "#ffffff",
                    pointHoverBackgroundColor: element.color || "rgba(255,65,105,1)",
                    borderDash: [3, 3],
                    borderWidth: 1,
                    pointRadius: 0,
                    pointHoverRadius: 2,
                    pointBorderColor: element.color || "rgba(255,65,105,1)"
                })
            }
        });
        return result
    }
}
// "rgba(255,65,105,1)"
// "rgba(0,123,255,0.1)"
