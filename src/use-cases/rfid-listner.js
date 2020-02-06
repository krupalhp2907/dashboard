import {employee} from "../entity"

export default function buildRfidListner({rfidListner}) {
    var unsub = null
    return function(id) {
        const setRfidRequest = () => {
            return new Promise((res, rej) => {
                rfidListner(id).set({
                    "init_time": new Date(),
                    "rfid": String("request pending"),
                    "rfid_request": true,
                    "last_edited": "client"
                }).then(success => {
                    res({
                        "request": "pending"
                    })
                }).catch(err => {
                    rej({
                        "request": "aborted",
                        "err": true
                    })
                })
            })
        }
        const rfidListnerFromBuffer = (cb) => {
            unsub = rfidListner(id).onSnapshot((snapshot, change) => {
                if (!snapshot.empty) {
                    var data = snapshot.data()
                    var source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
                    if(source === "Server") {
                        if (data.rfid_request === false && data.rfid !== "request pending" && data.last_edited !== "client") {
                            // alert("There is some change in document and that is rfid entered")
                            // Call custom call back 
                            console.log(data, "Am i runnning")
                            // String(data.rfid._binaryString)
                            cb.call(this,String(data.rfid), undefined, unsub)
                        } else if(data.rfid_request === true && data.rfid === "request pending" && data.last_edited === "client") {
                            cb.call(this,undefined, "requested", unsub)
                        } else {
                            cb.call(this,undefined, "bad request", unsub)
                        }
                    } else {
                        cb.call(this, undefined, "requested")
                    }
                }
            })
            return unsub
        }
        const rfidSetInit = () => {
            return new Promise((res, rej) => {
                rfidListner(id).set({
                    "init_time": new Date(),
                    "rfid": String("no thing to worry about"),
                    "rfid_request": false,
                    "last_edited": "client"
                }).then((success) => {
                    res({
                        err: "false"
                    })
                }).catch((err) => {
                    rej({
                        err: true,
                        msg: "unknown",
                        log: err
                    })
                })
            })
        }

        return Object.freeze({
            rfidSetInit,
            setRfidRequest,
            rfidListnerFromBuffer
        })
    }
}