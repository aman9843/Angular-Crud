const express = require('express')
const router = express.Router()
const {registeredUser,login,getUserById,getAllUser,deleteUser,updateUser} = require('../controllers/userController')
const {admin,protect} = require('../middleware/authMiddleware')

router.route('/').post(registeredUser).get(getAllUser)
router.route('/login').post(login)
router.route('/user/:id').get(getUserById).put(protect,updateUser).delete(deleteUser).put(protect,updateUser)



module.exports = router
