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
    
});


