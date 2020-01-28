const fs = require("fs");
const assert = require("assert");
const Repo = require("../../src/Repos/repo");
const crypto = require("crypto");

// main runs tests and clear up
const main = async () => {
  await runTests();
  clearUp();
};
main();

runTests = async () => {
  await it("Create new file when making new instance of repo", () => {
    const randomFileName = crypto.randomBytes(8).toString("hex") + ".json";
    try {
      fs.unlinkSync(randomFileName);
    } catch {}
    const repo = new Repo(randomFileName);

    console.log(fs.accessSync(randomFileName));
    assert.equal(fs.readFileSync(randomFileName), "[]");
  });

  await it("Create method adds items to repo", async () => {
    const randomFileName = crypto.randomBytes(8).toString("hex") + ".json";
    const repo = new Repo(randomFileName);

    const record = await repo.create({ name: "steve" });

    const records = JSON.parse(await fs.promises.readFile(randomFileName));

    assert.strictEqual(records[0].name, "steve");
    assert.strictEqual(records[0].id, record.id);
  });

  await it("Add multiple records to repo and test getOne and getOneBy methods", async () => {
    const randomFileName = crypto.randomBytes(8).toString("hex") + ".json";
    const repo = new Repo(randomFileName);

    // generate test records
    let testRecords = [];
    for (let i = 0; i < 10; i++) {
      const record = {};
      record.name = crypto.randomBytes(8).toString("hex");
      record.number = Math.floor(Math.random() * 999);
      testRecords.push(await repo.create(record));
    }

    // getOne tests
    for (let r of testRecords) {
      assert.deepEqual(r, await repo.getOne(r.id));
    }

    // getOneBy tests
    const rndNum = Math.floor(Math.random() * 10);
    const record = await repo.getOneBy(testRecords[rndNum]);
    assert.deepEqual(record, testRecords[rndNum]);
  });
};

const clearUp = () => {
  for (let file of fs.readdirSync(process.cwd())) {
    if (file.includes(".json")) {
      fs.unlinkSync(file);
    }
  }
};
