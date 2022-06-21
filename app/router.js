'use strict';

module.exports = app => {
    const methods = [
        {
            service: 'base',
            gets: [],
            posts: []
        },
        {
            service: 'wsmsg',
            gets: ['getWSMsg','saveWSMsg'],
            posts: []
        }
    ];

    const { controller } = app;
    const apiRequest = app.controller.base.apiRequest;

    app.get('/', controller.home.index);


    for (const route of methods) {
        const { service, gets, posts } = route;
        for (const method of gets) {
            app.get(`/api/${service}/${method}`, apiRequest);
        }
        for (const method of posts) { 
            if (route.service === 'file') {
                app.post(`/api/${service}/${method}`, app.jwt, apiRequest);
            } else {
                app.post(`/api/${service}/${method}`, apiRequest);
                // app.post(`/api/${service}/${method}`, app.jwt, apiRequest);
            } 
        }
    }
    app.get('/app(/.+)?', controller.app.index);
};
