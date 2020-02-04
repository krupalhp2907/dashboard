import {employee} from "../entity"

export default function buildMakeGetEmployees({getEmployees}) {
    return function() {
        return new Promise((res, rej) => {
            getEmployees().then(snap => {
                let emps = []
                snap.forEach(element => {
                    let employees = [],
                        departments= {};
                    data.forEach(element => {
                        let id = element.id, doc = element.data()
                        const emp = new employee({id, ...doc})
                        employees.push(emp)

                        let empDepartment = emp.getDepartment()
                        if(empDepartment !== "") {
                            if(empDepartment in departments) {
                                departments[empDepartment] = [emp]
                            } else {
                                departments[empDepartment].push(emp)
                            }
                        }
                    });
                });
            })
            res(Object.freeze({
                employees: emps,
                byDepartment: departments
            })).catch(err => {
                rej(err)
            })
        })
    }
}