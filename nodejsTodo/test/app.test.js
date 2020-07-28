import app from "../server";
import chai, { assert, expect } from "chai";
import chaiHttp from "chai-http";
import { isUserCorrect } from "../src/user/user.model";
import { listAll } from "../src/user/user.controller";
chai.use(chaiHttp);
describe("Server!", () => {
  it("welcomes user to the api", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        if (err) console.log(err);
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        expect(res.body.result).to.equals("Hello World!");
        done();
      });
  });
});

/*
beforeEach(function() {
  return db.clear().then(function() {
    return db.save([tobi, loki, jane]);
  });
});
*/

describe("Users!", () => {
  it("should not pass the email verification (no arrobase)", (done) => {
    const { email } = isUserCorrect("Jean Ventura", "jean.venturagmail.com");
    assert.isNotTrue(email);
    done();
  });
  it("shouldn't pass the username verification (too long)", (done) => {
    const { username } = isUserCorrect(
      "YjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjskYjsk",
      "jean.ventura@gmail.com"
    );
    assert.isNotTrue(username);
    done();
  });
  it("shoud pass the user verification", (done) => {
    [
      {
        username: "Jean Ventura",
        email: "jean.ventura@gmail.com",
      },
      {
        username: "Leon Blum",
        email: "l.blum@gmail.com",
      },
    ].forEach((item) => {
      const userCh = isUserCorrect(item.username, item.email);
      assert.isTrue(userCh, "ok");
    });
    done();
  });
  it("Finding the user Jean Ventura and Leon Blum in db OK", (done) => {
    const userArray = listAll(["Jean Ventura", "Leon Blum"]);
    userArray.then((res) => {
      res.forEach((item, i) => {
        const userCh = isUserCorrect(item.username, item.email);
        assert.isTrue(userCh, "ok");
      });
      assert.equal(res.length, 2);
    });
    done();
  });
  it("All Users from db OK.", (done) => {
    chai
      .request(app)
      .get("/user/list")
      .end((err, res) => {
        if (err) console.log(err);
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        // assert.equal([1, 2, 3].indexOf(3), -1);
        res.body.result.forEach((item, i) => {
          const userCh = isUserCorrect(item.username, item.email);
          assert.isTrue(userCh, "ok");
        });
        done();
      });
  });
});
