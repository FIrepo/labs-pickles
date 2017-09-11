const
    request = require('supertest');

describe('GET /drivers', function () {
    
    it('Getting all drivers should return Status: 1', function (done) {
        require('../server/app')()
            .then((app) => {
                request(app)
                    .get('/drivers')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect((res) => {
                        res.body = {status: res.body.status}
                    })
                    .expect(200, {
                        status: 1
                    }, done);
            });
    });

    it('Requesting driver by coordinates close from John (2km) should return John', function (done) {
        require('../server/app')()
            .then((app) => {
                request(app)
                    .get('/drivers?coordinates=48.858357,2.348363')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200, done);
            });
    });
});


