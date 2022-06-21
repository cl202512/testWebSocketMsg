// import { readFileSync, accessSync, F_OK } from 'fs';
// import { lookup } from 'mime-types';
// import { resolve } from 'path';
// import { Controller } from 'egg';
'use strict';
const readFileSync = require('fs')
const accessSync = require('fs')
const F_OK = require('fs')
const lookup = require('mime-types')
const resolve = require('path')
const Controller = require('egg').Controller;

class BaseController extends Controller {
 
    log(data) {
        console.log('\x1b[36m')
        console.log('*************************** START *************************')
        console.log(data)
        console.log('*************************** END ***************************')
        console.log('\x1b[0m')
    }

    async apiRequest() {
        const { url } = this.ctx.request
        try {
            const servicePattern = /\/api\/\w+/
            const serviceName = url.match(servicePattern)[0].split('/')[2]
            const methodPattern = /\/api\/\w+\/\w+/
            const methodName = url.match(methodPattern)[0].split('/')[3]
            const result = await this.service[serviceName][methodName](this.params)
            this.writeResponse(result)
        } catch (err) {
            this.log(err)
            this.writeResponse({ code: 500, success: false, msg: `请求异常: ${url}`, data: err })
        }
    }

    writeResponse(result) {
        const success = result.code === 200 
        if (result.code === -1) {
            /// 异常
            console.error('\x1b[36m')
            console.error(result.msg)
            if (!!result.data) {
                console.error(result.data)
            }
            console.error('\x1b[0m')
            this.ctx.body = Object.assign({}, result, { success })
        } else if (result.code > 200 && result.code < 1000) {
            console.warn('\x1b[45m')
            console.warn(result)
            console.warn('\x1b[0m')
            this.ctx.body = Object.assign({}, result, {
                code: 500,
                success,
                data: {
                    errCode: result.code,
                    errMsg: result.msg
                },
            })
        } else {
            this.ctx.body = Object.assign({}, result, { success })
        }
    }

    success(Message, Data) {
        this.ctx.body = {
            success: true,
            code: 1,
            msg: Message,
            data: Data,
        };
    }

    fail(Message, code = 601) {
        console.warn('\x1b[45m')
        console.warn(Message, code)
        console.warn('\x1b[0m')
        this.ctx.body = {
            success: false,
            code,
            msg: Message,
            data: {}
        }
    }

    exception(Message, Data) {
        console.error('\x1b[36m')
        console.error(Data)
        console.error('\x1b[0m')
        this.ctx.body = {
            success: false,
            code: -1,
            msg: Message,
            data: Data
        };
    }

    get params() {
        const { method } = this.ctx.request
        return method === 'GET' ? this.ctx.query : this.ctx.request.body
    }

    get svrAndMethod() {
        let { url } = this.ctx
        if (url.indexOf('?') > 0) {
            url = url.substring(0, url.indexOf('?')).replace('/api/')
        }
        const items = url.split('/')
        return { svrName: items[0], methodName: items[1] }
    }

    /// read photo to base64 string
    readToBase64(fullName) {
        let filePath = resolve(fullName)
        let data = readFileSync(filePath);
        data = new Buffer(data).toString('base64')
        return 'data:' + lookup(filePath) + ';base64,' + data
    }

    fsExistsSync(path) {
        try {
            accessSync(path, F_OK);
        } catch (e) {
            return false;
        }
        return true;
    }
}
module.exports = BaseController;
