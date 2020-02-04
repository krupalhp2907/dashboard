import db from "../data-access"
import buildAnalyser from "./analyser"
import buildSaveEmployee from "./save-employee" 
import buildGetEmployee from "./get-Employees"
import buildLogin from "./build-login"

const {getEmployees, save, login} = db
const analyser = buildAnalyser({getEmployees, getDate,dateDiffInDays})
const saveEmployee = buildSaveEmployee({save})
const ge = buildGetEmployee({getEmployees})
const ll = buildLogin({login, isValidEmail})

export default Object.freeze({
	analyser,
	save: saveEmployee,
	getEmployees: ge,
	login: ll
})

// getDate
function getDate(today = new Date()) {
	today = new Date(String(today))
	var dd = today.getDate();

	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}

	if (mm < 10) {
		mm = '0' + mm;
	}
	return dd + '-' + mm + '-' + yyyy;
}


// a and b are javascript Date objects
// b > a
function dateDiffInDays(d1, d2) {
    //confirms and edits that b > a
    let b = d2 > d1 ? d2 : d1
    let a = d2 > d1 ? d1 : d2

    // Discard the time and time-zone information.
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}

function isValidEmail (email) {
	let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (email.match(mailformat)) {
		return true
	}
	else {
		return false
	}  
}