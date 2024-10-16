const express = require("express")
const router = express.Router()
const smartbot = require("../ai_modals/AutoBot.js")
const censorbot = require("../ai_modals/CensorBot.js")

router.get("/smartbot",smartbot)

router.get("/censorbot",censorbot)



module.exports = router