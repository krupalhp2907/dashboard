export default function buildMakeEmployee({ isValidEmail, getDate, dateDiffInDays }) {
	return function makeComment(obj = {}) {
		const {firstName,
				lastName,
				email,
				dateOfBirth,
				gender,
				streetName,
				city,
				state,
				zip,
				description,
				department,
				id,
				hash,
				attendences = {},
				joinedOn = new Date(),
				modifiedOn = new Date() } = obj
		
		if (!firstName || firstName.length < 2) {
			throw new Error('firstName')
		}
		if (!lastName) {
			throw new Error('lastName')
		}
		if (!isValidEmail(email)) {
			throw new Error("email")
		}
		// // if (["MALE", "FEMALE", "OTHERS"].indexOf(gender) == -1) {
		// // 	throw new Error("Gender is not valid")
		// // }
		if (!streetName) {
			throw new Error('streetName')
		}
		if (!city) {
			throw new Error('city')
		}
		if(!state) {
			throw new Error('state')
		}
		
		if(!department) {
			throw new Error('department')
		}

		let checkIsPresent = (d = new Date()) => {
			var date = new Date(String(d))

			var comparableRef = getDate(date)
			for (date in attendences) {
			}
			if (attendences.hasOwnProperty(comparableRef)) {
				return true
			}
			return false
		}

		return Object.freeze({
			id,
			getId: () => id,
			getEmail: () => email,
			getFirstName: () => firstName,
			getLastName: () => lastName,
			getFullName: () => firstName + " " +lastName,
			getDOB: () => dateOfBirth,
			getGender: () => gender,
			getStreetName: () => streetName,
			getCity: () => city,
			getState: () => state,
			getZip: () => zip,
			getFullAddress: () => `${streetName}, ${city}, ${state}, ${zip}`,
			getDescription: () => description,
			getDepartment: () => department,
			getHash: () => hash || makeHash(),
			getJoindeOn: () => joinedOn,
			getModifiedOn: () => modifiedOn,
			getAttendences: () => attendences,
			checkIsPresent,
			checkEarlyArrival: (date = new Date(), refHour=8) => {
				var comparableRef = getDate(date)
				if (attendences.hasOwnProperty(comparableRef)) {
					var firstScanned = new Date(attendences[comparableRef][0].seconds * 1000)
					if (firstScanned.getHours() < refHour) {
						return true
					}
				}
				return false
			},
			checkIsOnline: () => {
				const dateRef = getDate(new Date())
				if(attendences[dateRef]) {
					if(attendences[dateRef].length % 2 === 0) {
						return true
					}
				}
				return false
			},
			countAttnInRange: (d1, d2) => {
				//confirms and edits that date2 always > date1
				let date2 = d2 > d1 ? d2 : d1
				let date1 = d2 > d1 ? d1 : d2
				let count = 0
				while (date1 < date2) {
					if (checkIsPresent(attendences, date1)) {
						count += 1
					}
					date1.setDate(date1.getDate() + 1)
				}
				return count
			},
			getAnalysisInRange: (d1, d2) => {
				//confirms and edits that date2 always > date1
				let date2 = d2 > d1 ? d2 : d1
				let date1 = d2 > d1 ? d1 : d2
				let data = new Array()
				while (date1 < date2) {
					if (this.checkIsPresent(attendences, date1)) {
						data.push(1)
					} else {
						data.push(0)
					}
					date1.setDate(date1.getDate() + 1)
				}
				return data
			}
		})

		function makeHash() {
			return (
				firstName +
				lastName +
				email +
				department
			)
		}
	}
}