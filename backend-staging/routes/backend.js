const express = require("express");
const { route } = require("./api");
const router = express.Router();

router.use("/test", require("./Backend/test"));

router.use("/", require("./Backend/auth"))
router.use("/dashboard", require("./Backend/index"))
router.use("/site-settings", require("./Backend/site-settings"))
router.use("/admin", require("./Backend/admin"))
router.use("/user", require("./Backend/user"))
router.use("/nbc", require("./Backend/nbc"));
router.use("/regions", require("./Backend/regions"));
router.use("/weather", require("./Backend/weather"));
router.use("/assembly-category", require("./Backend/assembly-category"));
router.use("/assembly", require("./Backend/assembly"));
router.use("/assembly-elements", require("./Backend/assembly-elements"));
router.use("/auditor", require("./Backend/auditors"));
router.use("/customer", require("./Backend/customer"));
router.use("/leads", require("./Backend/leads"));
router.use("/audits", require("./Backend/audits"));

module.exports = router