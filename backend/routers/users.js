const express = require ("express")
const router = express.Router()
const  {addUsers,getUsers,login,logout} = require ("../controllers/users.controllers")
const test = require ("../middleware/auth")

router.get ("/getD",getUsers)
router.post("/add",addUsers)
router.post("/login",login)
router.get ("/test/token",test)
router.post("/logout",logout)

module.exports = router