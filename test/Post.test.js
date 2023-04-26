const chai = require("chai");
const expect = chai.expect;

const should = chai.should();

const chaiHttp = require("chai-http");
const server = require("../server");

chai.use(chaiHttp);

let token = null;

before(async () => {
  token = null;
});

after(async () => {
  token = null;
});

describe("POST /api/authenticate", () => {
  it("should return a JWT token", async () => {
    const res = await chai
      .request(server.app)
      .post("/api/authenticate")
      .send({ email: "user@example.com", password: "password" });

    expect(res).to.have.status(200);
    expect(res.body).to.have.property("token");
    token = res.body.token;
  });
});
