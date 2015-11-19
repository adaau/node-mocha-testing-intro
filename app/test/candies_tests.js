var should    = require("chai").should();
var expect    = require("chai").expect;
var supertest = require("supertest");

api           = supertest("http://localhost:3000")

// test to make sure that a request to the index path /candies returns a http status 200:
describe("Candies", function(done){

  // TESTING GET /CANDIES
  describe("GET /candies", function() {

    // description of test
    it("should return a 200 response", function(){
      // make a request
      api.get("/candies")
      // get something back
      // could be "application/html" if we are testing html data
      .set("Accept", "application/json")
      // this is what we expect
      // 2nd argument is "done" so will move on to next
      .expect(200, done)
    })

    it("should return an array", function(done){
      api.get("/candies")
      .set("Accept", "application/json")
      .end(function(error, response){
        // note: response.body in tests because we are testing the api response (vs request.body in controllers)
        // to debug: console.log(response) | curl -XGET http://localhost:3000/candies
        expect(response.body).to.be.an('array');
        done()
      })
    })

    it("should return an object that have a field called 'name' ", function(done){
      api.get("/candies")
      .set("Accept", "application/json")
      .end(function(error, response){
        expect(response.body[0]).to.have.property('name');
        done()
      })
    })

    it("should return an object that have 'id', 'name' and 'color' and not 'fer' ", function(done){
      api.get("/candies")
      .set("Accept", "application/json")
      .end(function(error, response){
        var firstCandy = response.body[0];
        expect(firstCandy).to.have.all.keys('id', 'name', 'color');
        // expect(response.body[0]).to.have.property('id');
        // expect(response.body[0]).to.have.property('name');
        // expect(response.body[0]).to.have.property('color');
        expect(response.body[0]).not.to.have.property('fer');
        done()
      })
    })

    it("should return only four elements in the array", function(done) {
      api.get("/candies")
      .set("Accept", "application/json")
      .end(function(error, response){
        expect(response.body.length).to.equal(4);
        done()
      })
    })
  })

  describe("POST /candies", function() {
    // will run this function before every test in POST, i.e. make this request when you test POSTS
    before(function(done){
      api.post("/candies")
      .set("Accept", "application/json")
      .send({
        "id": 5,
        "name": "Lollipop",
        "color": "Red"
      }).end(done)
    })

    it("should add a candy object to the collection candies and return it", function(done){
      api.get("/candies")
      .set("Accept", "application/json")
      .end(function(error, response){
        expect(response.body.length).to.equal(5);
        done()
      })
    })



  })
})