const express = require("express");
const router = express.Router();
const controller = require("./controller");

router.get("/getAllUserData", controller.findAllData);
router.get("/searchText", controller.searchText)
router.get("/getListOfCountry", controller.listOfCountry);
router.get("/getListOfStateUsingCountry", controller.listOfState);
router.get("/getListOfCityUsingCountryAndState", controller.listOfCity);
router.get("/getUserData", controller.getUserData);

module.exports = router;
