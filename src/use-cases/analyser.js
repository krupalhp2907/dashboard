import employee from "../entity"

export default function buildGetEmployee({getEmployees, dateDiffInDays, getDate}) {
    return function(opts = {}) {
        return new Promise((res, rej) => {
            const {companyStartingTime = 8, companyEndingTime = 6, companyBelowCritical = 35, companyAboveCritical = 75} = opts
            getEmployees().then(data => {
                let employees = []
                data.forEach(element => {
                    let id = element.id, doc = element.data()
                    const emp = new employee({id, ...doc})
                    employees.push(emp)
                });

                const getAnalysisInRange = (d1, d2) => {
                    let Analyser = {
                        productivity: {
                            label: "Productivity",
                            value: [],
                            count: 0
                        },
                        present: {
                            label: "Present",
                            value: [],
                        },
                        absent: {
                            label: "Absent",
                            value: []
                        },
                        earlyArrival: {
                            label: "Early",
                            value: []
                        },
                        today: {
                            productivity: {
                                label: "Productivity",
                                value: [],
                                count: 0
                            },
                            present: {
                                label: "Present",
                                value: [],
                                count: 0,
                            },
                            absent: {
                                label: "Absent",
                                value: [],
                                count: 0
                            },
                            earlyArrival: {
                                label: "Early",
                                value: [],
                                count: 0
                            },
                            online: {
                                label: "Online",
                                value: [],
                                count: 0
                            },
                            offline: {
                                label: "Offline",
                                value: [],
                                count: 0
                            }
                        },
                        companyStats: {
                            regular: {
                                label: "Above Critical Attendence",
                                count: 0,
                                value: []
                            },
                            irregular: {
                                label: "Above Critical Attendence",
                                count: 0,
                                value: []
                            }
                        },
                        total: {
                            data: [],
                            count: 0
                        },
                        departments: {
                            value: {},
                            count: 0,
                            today: {
                                present: {},
                                absent: {},
                                earlyArrival: {},
                                productivity: {},
                                online: {},
                                offline: {}
                            }
                        },
                        sample: 0,
                        dates: []
                    }
                    //confirms and edits that date2 > date1
                    let date2 = new Date(d2 >= d1 ? d2 : d1)
                    let date1 = new Date(d2 >= d1 ? d1 : d2)
                    let i=0
                    let totalDays = dateDiffInDays(date2, date1)
                    let criticalBelowDate = (totalDays * companyBelowCritical) / 100
                    let criticalAboveDate = (totalDays * companyAboveCritical) / 100
                    let dates = []

                    while(date1 <= date2) {
                        /**
                         * perform ith day analysis
                         */
                        dates.push(new Date(date1))
                        let ithDay = date1
                        let ithDayProductivity = 0,
                            ithDayAbsent = 0,
                            ithDayPresent = 0,
                            ithDayEarlyArrival = 0,
                            ithDayAbsentData = [],
                            ithDayPresentData = [],
                            ithDayProductivityData = [],
                            ithDayEarlyArrivalData = [];
    
                            
                        employees.forEach((emp, idx) => {
                            /**
                             * Perform Todays Analysis
                             * Default for each data
                             * calculate per employee
                             */
                            if(i==0) {
                                const today = new Date()

                                  /**
                                 * Perform departmental calculation
                                 */
                                let empDepartment = emp.getDepartment()
                                if(empDepartment !== "") {
                                    if(Analyser.departments.value.hasOwnProperty(empDepartment)) {
                                        Analyser.departments.value[empDepartment].push(emp)
                                    } else {
                                        Analyser.departments.value[empDepartment] = [emp]
                                        Analyser.departments.count += 1

                                        /**Initiate Review */
                                        Analyser.departments.today.present[empDepartment] = 0
                                        Analyser.departments.today.absent[empDepartment] = 0
                                        Analyser.departments.today.earlyArrival[empDepartment] = 0
                                        Analyser.departments.today.productivity[empDepartment] = 0
                                        Analyser.departments.today.online[empDepartment] = 0
                                        Analyser.departments.today.offline[empDepartment] = 0
                                    }
                                }

                                if(emp.checkIsOnline(today)) {
                                    Analyser.today.online.count += 1
                                    Analyser.today.online.value.push(emp)

                                    /**Handle department Present */
                                    Analyser.departments.today.online[empDepartment]+=1
                                } else {
                                    Analyser.today.offline.value.push(emp)
                                    Analyser.today.offline.count += 1

                                    /**Handle department Absent */
                                    Analyser.departments.today.offline[empDepartment]+=1
                                }
                                if(emp.checkIsPresent(today)) {
                                    Analyser.today.present.count += 1
                                    Analyser.today.present.value.push(emp)

                                    /**Handle Department present */
                                    Analyser.departments.today.present[empDepartment]+=1

                                    if(emp.checkEarlyArrival(today)) {
                                        Analyser.today.earlyArrival.count += 1
                                        Analyser.today.earlyArrival.value.push(emp)
                                        /**Handle Department present */
                                        Analyser.departments.today.earlyArrival[empDepartment]+=1
                                    }
                                    /**
                                     * Productivity Remaining
                                     */
                                } else {
                                    Analyser.today.absent.count += 1
                                    Analyser.today.absent.value.push(emp)
                                }

                                /**
                                 * Note below 2 calcs
                                 * are not valued in same date
                                 */
                                let totalDaysPresent = emp.countAttnInRange(d1,d2)
                                
                                if(totalDaysPresent >= criticalAboveDate) {
                                    Analyser.companyStats.regular.count += 1
                                    Analyser.companyStats.regular.value.push(emp)
                                }
                                if(totalDaysPresent <= criticalBelowDate) {
                                    Analyser.companyStats.irregular.count += 1
                                    Analyser.companyStats.irregular.value.push(emp)
                                }
                            }


                            if(emp.checkIsPresent(ithDay)) {
                                ithDayPresent += 1
                                ithDayPresentData.push(emp)
                                if(emp.checkEarlyArrival(ithDay)) {
                                    ithDayEarlyArrival += 1
                                    ithDayEarlyArrivalData.push(emp)
                                }
                                /**
                                 * Productivity Remaining
                                 */
                            } else {
                                ithDayAbsent += 1
                                ithDayAbsentData.push(emp)
                            }
                        })
                        /**
                         * Productivity
                         */
                        Analyser.productivity.count += ithDayProductivity
                        Analyser.productivity.value.push(ithDayProductivityData)
    
                        /**
                         * Present
                         */
                        Analyser.present.value.push(ithDayPresentData)
    
                        /**
                         * Absent
                         */
                        Analyser.absent.value.push(ithDayAbsentData)
    
                        /**
                         * Early Arrival
                         */
                        Analyser.earlyArrival.value.push(ithDayEarlyArrivalData)

                        i+=1
                        date1.setDate(date1.getDate() + 1)
                    }
                    Analyser.total.data = employees
                    Analyser.total.count = employees.length
                    Analyser.sample = i
                    Analyser.dates = dates
                    return Analyser
                }
    
                
                /**
                 * The Analyser
                 */
                res(Object.freeze({
                    getAnalysisInRange
                }))
            }).catch(err => {
                /**
                 * Handle known Errors
                 */
            })
        })
    }
}