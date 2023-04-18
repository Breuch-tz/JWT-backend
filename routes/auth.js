const express = require("express");
const router = express.Router();

router.get("/1", async (req, res) => {
  res.json("route: 1");
});

module.exports = router;
