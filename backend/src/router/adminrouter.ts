import { Router } from "express";
import {
  accessTokenVerify,
  createArticle,
  deletepost,
  fetchAllPostsSlug,
  fetchPostByQuery,
  fetchPostBySlug,
  loginCheckFunc,
  loginFunc,
  logoutfunc,
  signupFunc,
  SSE,
  updatepost,
} from "../controller/admincontroller.js";
import { adminAuthCheckFn } from "../controller/middlewares.js";
import { ErrorHandler } from "../errorhandling.js";

const router = Router();

router.route("/loginRoute").post(loginFunc);
router.route("/loginCheckRoute").get(loginCheckFunc);
router.route("/logout").get(logoutfunc);
router.route("/signupRoute").post(signupFunc);
router.route("/sse").get(SSE);

router.route("/createarticle").post(adminAuthCheckFn, createArticle);
router.route("/fetchAllPostsSlug").get(adminAuthCheckFn, fetchAllPostsSlug);
router.route("/deletepost").delete(adminAuthCheckFn, deletepost);
router.route("/updatepost").post(adminAuthCheckFn, updatepost);
router.route("/fetchPostBySlug").get(fetchPostBySlug);
router.route("/accessTokenVerify").post(accessTokenVerify);
router.route("/trendingSender").get(ErrorHandler(fetchPostByQuery));

export default router;
