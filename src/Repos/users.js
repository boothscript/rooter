const cyrpto = require("crypto");
const utils = require("util");

const Repo = require("./repo");
const scrypt = utils.promisify(cyrpto.scrypt);

class UserRepo extends Repo {
  async create(attrs) {
    const records = await this.getAll();
    attrs.id = this.randomId();
    const salt = cyrpto.randomBytes(8).toString("hex");
    const buf = await scrypt(attrs.password, salt, 32);
    const hashAndSalt = `${buf.toString("hex")}.${salt}`;
    const record = { ...attrs, password: hashAndSalt };

    records.push(record);
    await this.writeAll(records);
    return record;
  }

  async checkPassword(attrs) {
    const user = await this.getOneBy({ email: attrs.email });
    if (user) {
      const [hash, salt] = user.password.split(".");
      const buf = await scrypt(attrs.password, salt, 32);
      if (buf.toString("hex") === hash) {
        return true;
      } else {
        throw new Error("Incorrect Password");
      }
    }
  }
}

module.exports = new UserRepo("data/users.json");
