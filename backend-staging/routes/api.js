const express = require("express")
const router = express.Router();

// user Routes
router.use("/user", require("./Api/v1/user"))

router.use("/audit", require("./Api/v1/audit"))

router.use("/front", require("./Api/v1/front"))

router.use("/customer", require("./Api/v1/customer"))

module.exports = router