const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json("token valid:");
});

module.exports = router;
