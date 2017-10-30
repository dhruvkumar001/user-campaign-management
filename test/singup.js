
let mongoose = require("mongoose");
let User = require('../app/models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.Should();

chai.use(chaiHttp);

describe('Users', () => {
    beforeEach((done) => {
        User.remove({}, (err) => { 
           done();         
        });     
    });  
  /*
  * Test the /POST for user singup
  */
  describe('/POST user singup', () => {
      it('it should not add a User without email field', (done) => {
        let userObj = {
            companyname: "The Lord of the Rings",
            password: 123456
        }
        chai.request(server)
            .post('/adduser')
            .send(userObj)
            .end((err, res) => {
                res.should.have.status(400);
                chai.expect(res.body.message).to.be.equal('Validation Error! Try adding again!');
                // res.body.should.have.property('message');
              done();
            });
      });
      it('it should singup user with post item ', (done) => {
        let userObj = {
            companyname: "The Lord of the Rings",
            email: "darko@gmail.com",
            password: '123456'
        }
        chai.request(server)
            .post('/adduser')
            .send(userObj)
            .end((err, res) => {
                res.should.have.status(200);
                chai.expect(res.body.message).to.be.equal('New added');               
                // res.body.should.have.property('message');
              done();
            });
      });
  });

});