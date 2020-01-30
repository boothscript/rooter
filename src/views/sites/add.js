const layout = require("../layout");
const { getErrors } = require("../helpers");

module.exports = ({ errors }) => {
  return layout(`
  <div class="columns has-background-light">
  <div class="column is-8 is-offset-2">
    <form class="form" method="POST">
      <div class="columns">
        <div class="column">
          <div class="field">
            <label class="label">Box Number</label>
            <div class="control">
              <input class="input" placeholder="FM001" name="boxNumber"/>
            </div>
            <p class="help is-danger">${getErrors(errors, "boxNumber")}</p>
          </div>
          <div class="field">
            <label class="label">Site Name</label>
            <div class="control">
              <input class="input" placeholder="The Queens Elbow" name="siteName" />
            </div>
            <p class="help is-danger">${getErrors(errors, "siteName")}</p>
          </div>
          <div class="field">
            <label class="label">Address Line 1</label>
            <div class="control">
              <input class="input" placeholder="33 The strand" name="addressLine1"/>
            </div>
            <p class="help is-danger">${getErrors(errors, "addressLine1")}</p>
          </div>
          <div class="field">
            <label class="label">Address Line 2</label>
            <div class="control">
              <input class="input" placeholder="The Echo Bridge" name="addressLine2"/>
            </div>
            <p class="help is-danger">${getErrors(errors, "addressLine2")}</p>
          </div>
          <div class="field">
            <label class="label">Town</label>
            <div class="control">
              <input class="input" placeholder="Frome" name="town" />
            </div>
            <p class="help is-danger">${getErrors(errors, "town")}</p>
          </div>
          <div class="field">
            <label class="label">PostCode</label>
            <div class="control">
              <input class="input" placeholder="FR3 8LJ" name="postCode" />
            </div>
            <p class="help is-danger">${getErrors(errors, "postCode")}</p>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">Contact Name</label>
            <div class="control">
              <input class="input" placeholder="Miss Smith" name="contactName"/>
            </div>
            <p class="help is-danger">${getErrors(errors, "contactName")}</p>
          </div>
          <div class="field">
            <label class="label">Contact Number</label>
            <div class="control">
              <input class="input" placeholder="0771122334" name="contactNumber"/>
            </div>
            <p class="help is-danger">${getErrors(errors, "contactNumber")}</p>
          </div>
          <div class="field">
            <label class="label">Collection Frequency</label>
            <div class="control">
              <input class="input" placeholder="6" name="collectionFrequency"/>
            </div>
            <p class="help is-danger">${getErrors(
              errors,
              "collectionFrequency"
            )}</p>
          </div>
          <div class="field">
            <label class="label">Previous Collection Amount</label>
            <div class="control">
              <input class="input" placeholder="£87.09" name="previousCollectionAmount"/>
            </div>
            <p class="help is-danger">${getErrors(
              errors,
              "previousCollectionAmount"
            )}</p>
          </div>
          <div class="field">
            <label class="label">Last Collection Date</label>
            <div class="control">
              <input class="input" type="date" placeholder="" name="collectionDate"/>
            </div>
            <p class="help is-danger">${getErrors(errors, "collectionDate")}</p>
          </div>
          
        </div>
      </div>
      <div class="field">
            <label class="label">Notes</label>
            <div class="control">
              <textarea
                class="textarea"
                placeholder="Free parking availiable" name="notes"
              /></textarea>
            </div>
            <p class="help is-danger">${getErrors(errors, "notes")}</p>
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
