export default function makeFirebase({app, employee, auth, rfid}) {
	return Object.freeze({
		getEmployees,
		save,
		login,
		authListner,
		getEmployeeById,
		rfidListner,
		getEmployeeByEmail
	})
	function getEmployees() {
		return employee.get()
	}

	function rfidListner(id) {
		return rfid.doc(id)
	}

	function getEmployeeById(id) {
		return employee.doc(id)
	}

	function getEmployeeByEmail(email) {
		return employee.where("email", "==", email).get()
	}
	
	function login(email, password) {
		return auth.signInWithEmailAndPassword(email, password)
	}

	function authListner(cb) { 
		return auth.onAuthStateChanged(cb)
	}
	
	async function save(data, id) {  
		if(!id) {
			return employee.add(data)
		} else {
			return employee.doc(id).update(data)
		}
	}
}