// import BaseController from './base';
'use strict';
const BaseController = require('./base');

class AppController extends BaseController {
    async index() {
        await this.ctx.render('app/app.js', {
            url: this.ctx.url.replace(/\/app/, '')
        });
    }
}
module.exports = AppController;
