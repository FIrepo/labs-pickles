const
    _ = require('lodash'),
    request = require('supertest');

describe('POST /drivers', () => {

    it('Creating a driver with a wrong email should trigger a specific message', (done) => {
        require('../server/app')()
            .then((app) => {
                request(app)
                    .post('/drivers')
                    .set('Accept', 'application/json')
                    .field('name', 'John')
                    .field('email', 'xyz')
                    .field('lat', '-45.123992')
                    .field('lng', '-47.945552')
                    .expect((res) => {
                        res.body = {message: res.body.message}
                    })
                    .expect(500, {
                        message: "Invalid email"
                    }, done);
            });
    });

    it('Creating a driver with a wrong latitude should trigger a specific message', (done) => {
        require('../server/app')()
            .then((app) => {
                request(app)
                    .post('/drivers')
                    .set('Accept', 'application/json')
                    .field('name', 'John')
                    .field('email', 'john@cena.com')
                    .field('lat', '005AB')
                    .field('lng', '-47.945552')
                    .expect((res) => {
                        res.body = {message: res.body.message}
                    })
                    .expect(500, {
                        message: "Invalid latitude"
                    }, done);
            });
    });

    it('Creating a driver with a wrong longitude should trigger a specific message', (done) => {
        require('../server/app')()
            .then((app) => {
                request(app)
                    .post('/drivers')
                    .set('Accept', 'application/json')
                    .field('name', 'John')
                    .field('email', 'john@bar.com')
                    .field('lat', '-47.945552')
                    .field('lng', '005AB')
                    .expect((res) => {
                        res.body = { message: res.body.message }
                    })
                    .expect(500, {
                        message: "Invalid longitude"
                    }, done);
            });
    });

    it('Creating a driver should return the created driver', (done) => {
        require('../server/app')()
        .then((app) => {
            request(app)
                .post('/drivers')
                .set('Accept', 'application/json')
                .field('name', 'John')
                .field('email', 'john@gmail.com')
                .field('lat', '-45.123992')
                .field('lng', '-47.945552')
                .expect((res) => {
                    res.body = res.body.data
                })
                .expect(200, {
                    id: 1,
                    name: "John",
                    email: "john@gmail.com",
                    lat: "-45.123992",
                    lng: "-47.945552"
                }, done);
        });
    });
    
    it('Creating a driver with an e-mail that already exists should trigger a specific message', (done) => {
        require('../server/app')()
            .then((app) => {
                request(app)
                    .post('/drivers')
                    .set('Accept', 'application/json')
                    .field('name', 'Johnsons Bar')
                    .field('email', 'john@gmail.com')
                    .field('lat', '48.858357')
                    .field('lng', '2.348363')
                    .expect((res) => {
                        res.body = { message: res.body.message }
                    })
                    .expect(500, {
                        message: "This email has been taken!"
                    }, done);
            });
    });
});


