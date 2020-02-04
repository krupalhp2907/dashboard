import buildProductivityPresenter from "./productivity-presenter"
import buildSmallStatsPresenter from "./smallStats-presenter"
import buildTablePresenter from "./table-presenter"


const smallStatsPresenter = buildSmallStatsPresenter()
const productivityPresenter = buildProductivityPresenter()
const tablePresenter = buildTablePresenter()

export default Object.freeze({
    smallStatsPresenter,
    tablePresenter,
    productivityPresenter
})

export {smallStatsPresenter, tablePresenter, productivityPresenter}