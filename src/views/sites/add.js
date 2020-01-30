const layout = require("../layout");

module.exports = () => {
  return layout(`
  <div class="columns has-background-light">
  <div class="column is-8 is-offset-2">
    <form class="form">
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Box Number</label>
            <div class="control">
              <input class="input" placeholder="FM0001" />
            </div>
          </div>
          <div class="field">
            <label class="label">Site Name</label>
            <div class="control">
              <input class="input" placeholder="The Queens Elbow" />
            </div>
          </div>
          <div class="field">
            <label class="label">Address Line 1</label>
            <div class="control">
              <input class="input" placeholder="33 The strand" />
            </div>
          </div>
          <div class="field">
            <label class="label">Address Line 2</label>
            <div class="control">
              <input class="input" placeholder="The Echo Bridge" />
            </div>
          </div>
          <div class="field">
            <label class="label">Town</label>
            <div class="control">
              <input class="input" placeholder="Frome" />
            </div>
          </div>
          <div class="field">
            <label class="label">PostCode</label>
            <div class="control">
              <input class="input" placeholder="FR3 8LJ" />
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Contact Name</label>
            <div class="control">
              <input class="input" placeholder="Miss Smith" />
            </div>
          </div>
          <div class="field">
            <label class="label">Contact Number</label>
            <div class="control">
              <input class="input" placeholder="0771122334" />
            </div>
          </div>
          <div class="field">
            <label class="label">Collection Frequency</label>
            <div class="control">
              <input class="input" placeholder="6" />
            </div>
          </div>
          <div class="field">
            <label class="label">Previous Collection Amount</label>
            <div class="control">
              <input class="input" placeholder="£87.09" />
            </div>
          </div>
          <div class="field">
            <label class="label">Notes</label>
            <div class="control">
              <textarea
                class="textarea"
                placeholder="Free parking availiable"
              /></textarea>
            </div>
          </div>

        </div>
      </div>
      <div class="field">
        <input
          type="submit"
          class="button is-primary is-pulled-right"
          value="Add Site"
        />
      </div>
    </form>
  </div>
</div>
    `);
};
