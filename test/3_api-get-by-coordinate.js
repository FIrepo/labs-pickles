const
    request = require('supertest');

describe('GET /drivers?coordinate={lat},{lng}', function () {

    it('Requesting invalid latitude should return specific message', function (done) {
        require('../server/app')()
            .then((app) => {
                request(app)
                    .get('/drivers')
                    .query({ coordinates: "A,2.345917" })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect((res) => {
                        res.body = { message: res.body.message }
                    })
                    .expect(500, {
                        message: "Invalid latitude"
                    }, done);
            });
    });

    it('Requesting invalid longitude should return specific message', function (done) {
        require('../server/app')()
            .then((app) => {
                request(app)
                    .get('/drivers')
                    .query({ coordinates: "48.856165,B" })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect((res) => {
                        res.body = { message: res.body.message }
                    })
                    .expect(500, {
                        message: "Invalid longitude"
                    }, done);
            });
    });

    it('Requesting coordinates that are 2km close to John should return John', function (done) {
        require('../server/app')()
            .then((app) => {
                request(app)
                    .get('/drivers')
                    .query({coordinates: "48.856165,2.345917"})
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect((res) => {
                        res.body = { length: res.body.data.length }
                    })
                    .expect(200, {
                        length: 1
                    }, done);
            });
    });

    it('Requesting coordinates that are 2km away from John should not return John', function (done) {
        require('../server/app')()
            .then((app) => {
                request(app)
                    .get('/drivers')
                    .query({coordinates: "48.904471,2.467811" })
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect((res) => {
                        res.body = { length: res.body.data.length }
                    })
                    .expect(200, {
                        length: 0
                    }, done);
            });
    });
});


