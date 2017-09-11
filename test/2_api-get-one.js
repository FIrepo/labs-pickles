const
    request = require('supertest');

describe('GET /drivers/{id}', function () {
    
    it('Returned driver should have name: John', function (done) {
        require('../server/app')()
            .then((app) => {
                request(app)
                    .get('/drivers/1')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect((res) => {
                        res.body = { name: res.body.data.name }
                    })
                    .expect(200, {
                        name: "John"
                    }, done);
            });
        });

    it('Trying to get a wrong ID should return a specific message', function (done) {
        require('../server/app')()
            .then((app) => {
                request(app)
                    .get('/drivers/000')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect((res) => {
                        res.body = { message: res.body.message }
                    })
                    .expect(500, {
                        message: "Not found!"
                    }, done);
            });
    });
});