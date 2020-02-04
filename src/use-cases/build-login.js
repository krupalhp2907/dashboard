export default function buildLogin({login, isValidEmail}) {
    return function (email, password, cb) {  
        return new Promise((res, rej) => {
            login(email, password).then((rem) => {
                res({
                    err: false,
                    user: rem
                })
            }).catch(err => {
                rej({
                    err: true,
                    msg: err.message,
                    log: err
                })
            })
        })
    }
}