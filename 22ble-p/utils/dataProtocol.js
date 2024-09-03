

class dataProtocol {
    constructor() {}
    netLock() {
        var obj = {
            post(params) {
                return "0x10";
            },
            get(value) {   
                return {
                    status: true,
                    msg:"操作成功"
                };
            },
        }
        return obj
    }
}
module.exports = {
    dataProtocol: new dataProtocol()
}