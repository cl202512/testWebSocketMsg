// import { Service } from 'egg';
'use strict';
const Service = require('egg').Service;

class BaseService extends Service {
    log(data) {
        console.log('\x1b[36m');
        console.log('===================== baseService.log: ', data);
        console.log('\x1b[0m');
    }
    
    // { _id, collection, data}
    async update(params) {
        try {
            this.log(params)
            let rst = {}
            if (!params._id) {
                rst = await this.ctx.model[params.collection].create(params.data);
                return { code: 200, msg: '', data: rst };
            }
            const { _id, collection, data } = params;
            await this.ctx.model[collection].updateOne({ _id }, data);
            rst = await this.ctx.model[collection].findById(_id);
            return { code: 200, msg: '', data: rst };
        } catch (err) {
            console.error(err);
            return { code: 500, msg: '更新数据发生异常', data: err };
        }
    }

    async deleteOne(params) {
        try {
            const { _id, collection } = params;
            const rst = await this.ctx.model[collection].updateOne({ _id }, { Flag: 0 });
            return { code: 200, msg: '', data: rst };
        } catch (err) {
            console.error(err);
            return { code: 500, msg: '删除新闻发生异常', data: err };
        }
    } 

    async findById(params) {
        try {
            const { _id, collection } = params;
            const rst = await this.ctx.model[collection].findById(_id); 
            return { code: 200, msg: '', data: rst }; 
        } catch (err) {
            console.error(err);
            return { code: 500, msg: '获取单条数据发生异常', data: err };
        }
    }

    async find(params) {
        try {
            const { collection, where } = params;
            const rst = await this.ctx.model[collection].find(where);
            return { code: 200, msg: '', data: rst };
        } catch (err) {
            console.error(err);
            return { code: 500, msg: '获取数据发生异常', data: err };
        }
    } 

     // 分页模糊search , page from 1
    async searchWith({ collection, page, rowsPerPage, where, isort }) {
        this.log({ collection, page, rowsPerPage, where, isort })
        const total = await this.ctx.model[collection].countDocuments(where)
        const hasMore = total > page * rowsPerPage
        const rst = await this.ctx.model[collection].find(where)
            .skip((parseInt(page) - 1) * parseInt(rowsPerPage))
            .limit(parseInt(rowsPerPage))
            .sort(isort);

        return { total, hasMore, rst }
    }


    async nameSearch(params) {
        try {
            const { collection, sortBy, descending, page, rowsPerPage, filter } = params 
            const reg = new RegExp(filter, 'i')
            const where = { Flag: 1, Name: { $regex: reg }} 
            const isort = descending ? `-${sortBy}` : `${sortBy}`
            const data = await this.searchWith({ collection, page, rowsPerPage, where, isort })
            return { code: 200, msg: '', data };
        } catch (err) {
            console.error(err);
            return { code: 500, msg: '搜索数据发生异常', data: err };
        }

    }

}
module.exports = BaseService; 
