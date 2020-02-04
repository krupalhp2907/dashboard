import employee from "../entity"


export default function buildSaveEmployee({save}) {
    return function (data, id) {
        
        // const emp = employee({
            // firstName: data.firstName,
            // lastName: data.lastName,
            // email: data.email,
            // streetName: data.streetName,
            // city: data.city,
            // state: data.state,
            // department: data.department,
            // zip: data.zip,
            // description: data.description
        // })   
        // const newEmployee = {
        //     firstName: emp.getFirstName(),
        //     lastName: emp.getLastName(),
        //     street: emp.getStreetName(),
        //     email: emp.getEmail(),
        //     city: emp.getCity(),
        //     state: emp.getState(),
        //     zip: emp.getZip(),
        //     description: emp.getDescription(),
        //     hash: emp.getHash(),
        //     joinedOn: emp.getJoindeOn(),
        //     modifiedOn: new Date(),
        //     attendences: emp.getAttendences()
        // }
        // console.log(newEmployee)

        return new Promise((res, rej) => {
            const {firstName, lastName, email, streetName, city, state, zip, description, department} = {}
    
            const emp = employee({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                streetName: data.streetName,
                city: data.city,
                state: data.state,
                department: data.department,
                zip: data.zip,
                description: data.description
            })

            const newEmployee = {
                firstName: emp.getFirstName(),
                lastName: emp.getLastName(),
                streetName: emp.getStreetName(),
                email: emp.getEmail(),
                city: emp.getCity(),
                state: emp.getState(),
                zip: emp.getZip(),
                description: emp.getDescription(),
                hash: emp.getHash(),
                joinedOn: emp.getJoindeOn(),
                modifiedOn: new Date(),
                attendences: emp.getAttendences(),
                department: emp.getDepartment()
            }
            
            save(newEmployee).then(doc => {
                const id = doc.id
                res(employee({
                    id,
                    ...newEmployee
                }))
            }).catch(err => {
                return rej({
                    log: err
                })
            })
        })
    }
}