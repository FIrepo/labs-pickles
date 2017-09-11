const
    _ = require('lodash'),
    fs = require('fs-extra'),
    path = require('path'),
    request = require('supertest');

describe('DELETE /drivers/{id}', () => {
    
    it('Deleting a driver should return Status: 1', (done) => {
        require('../server/app')()
            .then(async (app) => {
                request(app)
                    .delete(`/drivers/1`)
                    .set('Accept', 'application/json')
                    .expect((res) => {
                        res.body = { status: res.body.status }
                    })
                    .expect(200, {
                        status: 1
                    }, done);
            });
    });

    it('Deleting a driver that doesn\'t exists should return a specific message', (done) => {
        require('../server/app')()
            .then(async (app) => {
                request(app)
                    .delete(`/drivers/000`)
                    .set('Accept', 'application/json')
                    .expect((res) => {
                        res.body = { message: res.body.message }
                    })
                    .expect(500, {
                        message: "Not found!"
                    }, done);
            });
    });
});


