import {Router} from "express"
import {
    creategroup,
    start_privateconversation,
    getmyconversation
}
from "../controllers/coversation.controller.js"
import{upload} from "../middlewares/multer.middleware.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router=Router()
// console.log("abcd")

router.route("/creategroup").patch(verifyJWT,
    upload.fields([{
    name:"avatar",
    maxCount:1
}]),
creategroup
)

router.route("/start_privateconversation").post(verifyJWT,
    upload.none(),
    start_privateconversation
)

router.route("/getmyconversation").get(verifyJWT,upload.none(),getmyconversation)


export default router;
