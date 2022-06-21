'use strict';
const path = require('path');
const ip = require('ip');

module.exports = appInfo => {
    const config = exports = {};

    config.static = {
        prefix: '/public/',
        dir: path.join(appInfo.baseDir, 'public'),
    }; 

    exports.jwt = {
        secret: 'JfHseNseXooAo@35b*7l7ess',
        expiresIn: '7d',
        UserName: 'admin',
        Password: '12345'
    }; 
    
    config.security = {
        csrf: {
            enable: false,   // 前后端分离，post请求不方便携带_csrf
        }, 
        domainWhiteList: ['*']         //配置白名单
    };

    config.cors = {
        origin: '*',            //允许所有跨域访问，注释掉则允许上面 白名单 访问
        credentials: true,
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    };

    

    config.jsonp = {
        csrf: false,
    };
    
    
    return config;
};

exports.cache = {
    default: 'memory',
    stores: {
        memory: {
            driver: 'memory',
            max: 100,
            ttl: 0,
        },
    },
};


