import employee from "../entity"

export default function buildMakeGetEmployees({getEmployees}) {
    return function() {
        return new Promise((res, rej) => {
            getEmployees().then(snap => {
                var employees = [],
                    departments= {};
                snap.forEach(element => {
                    let id = element.id, doc = element.data()
                    const emp = new employee({id, ...doc})
                    employees.push(emp)

                    let empDepartment = emp.getDepartment()
                    if(empDepartment !== "") {
                        if(empDepartment in departments) {
                            departments[empDepartment].push([emp])
                        } else {
                            departments[empDepartment] = [emp]
                        }
                    }
                });
                res(Object.freeze({
                    employees,
                    byDepartment: departments
                }))
            }).catch(err => {
                rej(err)
            })
        })
    }
}