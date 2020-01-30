const { body, check, validationResult } = require("express-validator");

module.exports = {
  checkBoxNumber: body("boxNumber")
    .not()
    .isEmpty()
    .withMessage("Box Number must be included.")
    .trim()
    .custom(value => {
      const boxNumRegex = /[A-Z][A-Z]\d\d\d/g;
      if (!boxNumRegex.test(value)) {
        throw new Error("Box Number does not match FR000 format.");
      }
      return true;
    }),
  checkSiteName: check("siteName")
    .not()
    .isEmpty()
    .withMessage("Site Name must be included")
    .trim()
    .isLength({ min: 3, max: 50 })
    .withMessage("Name but be between 3 and 50 characters."),
  checkAddressLine1: check("addressLine1")
    .not()
    .isEmpty()
    .withMessage("Address line must be included")
    .trim()
    .isLength({ min: 3, max: 80 })
    .withMessage("Line but be between 3 and 80 characters."),
  checkAddressLine2: check("addressLine2")
    .trim()
    .isLength({ max: 80 })
    .withMessage("Line must be no longer than 80 characters."),
  checkPostCode: body("postCode")
    .not()
    .isEmpty()
    .withMessage("Post code must be included")
    .trim()
    .custom(value => {
      const postCodeRegex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/g;
      if (!postCodeRegex.test(value)) {
        throw new Error("Invalid Postcode");
      }
      return true;
    }),
  checkTown: check("town")
    .not()
    .isEmpty()
    .withMessage("Town must be included")
    .trim()
    .isLength({ max: 80 })
    .withMessage("Town must be no longer than 80 characters."),
  checkContactName: check("contactName")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Town must be no longer than 50 characters."),
  checkContactNumber: body("contactNumber")
    .trim()
    .custom(value => {
      if (value !== "") {
        const ukNumberRegex = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/g;
        if (!ukNumberRegex.test(value)) {
          throw new Error("Invalid UK phone number.");
        }
      }

      return true;
    }),
  checkCollectionFequency: check("collectionFrequency")
    .not()
    .isEmpty()
    .withMessage("Must be a number bewtween 1 and 12 (months)")
    .toInt()
    .isInt({ min: 1, max: 12 })
    .withMessage("Must be a number bewtween 1 and 12 (months)"),
  checkPreviousCollectionAmount: check("previousCollectionAmount")
    .trim()
    .isCurrency({ symbol: "£" })
    .withMessage("Invalid currency amount."),
  checkNotes: check("notes")
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes must be no longer than 500 characters."),
  checkCollectionDate: check("collectionDate").trim()
};
