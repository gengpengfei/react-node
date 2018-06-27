import Router from "koa-router";
import user from "../controllers/user_controller";

const router = new Router({ prefix: "/user" });
router.get("/getUserInfo", user.getUserInfo);
router.post("/checkUserLogin", user.checkUserLogin);
export default router;
