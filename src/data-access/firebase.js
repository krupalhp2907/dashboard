export default function makeFirebase({app, employee, auth, rfid}) {
	return Object.freeze({
		getEmployees,
		save,
		login,
		authListner,
		getEmployeeById
	})
	function getEmployees() {
		return employee.get()
	}

	function getEmployeeById(id) {
		return employee.doc(id)
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