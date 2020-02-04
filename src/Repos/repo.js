const fs = require("fs");
const crypto = require("crypto");
class Repo {
  constructor(filename) {
    this.filename = filename;

    try {
      fs.accessSync(filename);
    } catch {
      fs.writeFileSync(filename, "[]");
    }
  }

  async create(attrs) {
    const newRecord = attrs;
    newRecord.id = this.randomId();
    const records = await this.getAll();
    records.push(newRecord);
    await this.writeAll(records);
    return newRecord;
  }
  async getAll() {
    return JSON.parse(await fs.promises.readFile(this.filename));
  }
  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }
  async getOne(id) {
    const records = await this.getAll();
    return records.find(record => record.id === id);
  }
  async getOneBy(attrs) {
    const records = await this.getAll();
    return records.find(record => {
      let found = false;

      for (let key in attrs) {
        if (record[key] !== attrs[key]) {
          return false;
        }
        found = true;
      }
      return found;
    });
  }

  async delete(id) {
    const records = await this.getAll();
    const newRecords = records.filter(record => record.id !== id);
    await this.writeAll(newRecords);
  }

  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find(record => record.id === id);
    Object.assign(record, attrs);
    await this.writeAll(records);
    console.log("written");
  }

  randomId() {
    return crypto.randomBytes(4).toString("hex");
  }
}

module.exports = Repo;
