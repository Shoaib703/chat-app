import {Router} from "express"
import{
    registerUser,
    loginUser,
    logoutUser,
    changepassword,
    changecoverimage
}
from "../controllers/user.controller.js"
import{upload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router=Router()

router.route("/register").post(
    upload.fields([{
        name:"coverimage",
    maxCount:1}]),
    registerUser
)

router.route("/loginUser").post(upload.none(),loginUser)
router.route("/logoutUser").get(logoutUser)
router.route("/changepassword").patch(verifyJWT,upload.none(),changepassword)
router.route("/changecurrentimage").post(verifyJWT,upload.fields([{
    name:"coverimage",
    maxCount:1}]),
changecoverimage)



export default router;