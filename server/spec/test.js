const request = require('supertest');
const { expect } = require('chai');
const jwt = require('jsonwebtoken');

const app = require('../app');

describe('GET cafes data', () => {
  it('should respond with template', done => {
    request(app)
      .get('/api/view')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.cafeData.arrangemenet.length).to.eql(100);
        done();
      });
  });
});

describe('post /login', () => {
  it('If email are wrong, send following status and url', done => {
    request(app)
      .post('/api/login')
      .send({ email:'qwe@azxc', password: '123', password2:'123' })
      .expect(302)
      .end((err, res)=>{
        expect(res.text).to.include('Found. Redirecting to /login?error=nonemail');
        done();
      });
  });
  it('If the password is incorredt, send the following url', done => {
    request(app)
      .post('/api/login')
      .send({ email:'1@1', password: '2', password2:'2' })
      .expect(302)
      .end((err, res) => {
        expect(res.text).to.include('Found. Redirecting to /login?error=wrongpassword');
        done();
      });
  });
});

describe('POST /signup', () => {
  it('If two passwords are wrong, send following status and url', done => {
    request(app)
      .post('/api/signup')
      .send({ email:'newOnew@asd', password: '123', password2:'1234' })
      .expect(302)
      .expect('Location', '/signup?error=wrongpassword')
      .end((err, res)=>{
        done();
      });
  });
  it('If the email is duplicated, send the following status and url', done => {
    request(app)
      .post('/api/signup')
      .send({ email:'qwe@qwe', password: '123', password2:'123' })
      .expect(302)
      .expect('Location', '/signup?error=dupId')
      .end(done());
  });
});



// describe('POST /users', () => {
//   it('should add new user', done => {
//     request(app)
//       .post('/users')
//       .send({ id: 4, name: 'test' })
//       .expect('Content-Type', /json/)
//       .expect(201)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(USERS.length).to.eql(4);
//         expect(res.body).to.eql(USERS);
//         done();
//       });
//   });
// });