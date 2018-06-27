import Router from "koa-router";
import store from "../controllers/store_controller";

const router = new Router({ prefix: "/store" });
router.get("/storeOrderCount", store.storeOrderCount);
export default router;
