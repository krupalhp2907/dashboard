import buildMakeEmployee from './employee'
const makeEmployee = buildMakeEmployee({ 
    isValidEmail, 
    getDate,
    isCurrentMonth, 
    isCurrentDate,
	secondsToTime,
	dateDiffInDays
})

export default makeEmployee

function isValidEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

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

function isCurrentMonth(date) {
	var refDate = new Date(date)
	var todaysDate = new Date()

	return (todaysDate.getMonth() === refDate.getMonth()) && (refDate.getFullYear() === todaysDate.getFullYear())
}

function isCurrentDate(date) {
	var refDate = new Date(date)
	var todaysDate = new Date()

	return (refDate.getDate() === todaysDate.getDate()) && (isCurrentMonth(date))
}

function secondsToTime(s) {
	s = Number(s);
	var m = Math.floor(s % 31536000 % 2628288 % 86400 % 3600 / 60);
	var h = Math.floor(s % 31536000 % 2628288 % 86400 / 3600);
	var d = Math.floor(s % 31536000 % 2628288 / 86400);
	var mo = Math.floor(s % 31536000 / 2628288);
	var y = Math.floor(s / 31536000)


	var yDisplay = y > 0 ? y + " Y " : ""
	var moDisplay = mo > 0 ? mo + " M " : ""
	var dDisplay = d > 0 ? d + " D " : ""
	var hDisplay = h > 0 ? h + " H " : ""
	var mDisplay = m > 0 ? m + " Min " : ""

	return yDisplay + moDisplay + dDisplay + hDisplay + mDisplay;
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