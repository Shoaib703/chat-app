import {Router} from "express"
import{
    getmessages
}from "../controllers/messages.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router=Router()

router.route("/getmessages/:conversation_id").get(verifyJWT,getmessages)

export default router