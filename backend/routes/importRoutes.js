const express = require("express");
const router = express.Router();

const { fetchPlacesFromOSM } = require("../controllers/importController");

router.get("/osm", fetchPlacesFromOSM);

module.exports = router;