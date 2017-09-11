const
    request = require('supertest');

describe('GET /drivers', function () {
    
    it('Making a request without using Accept: application/json should return 405', function (done) {
        require('../server/app')()
            .then((app) => {
                request(app)
                    .get('/drivers')
                    .expect(405, done);
            });
    });

    it('Making an OPTIONS request should return 204', function (done) {
        require('../server/app')()
            .then((app) => {
                request(app)
                    .options('/drivers')
                    .expect(204, done);
            });
    });
});


