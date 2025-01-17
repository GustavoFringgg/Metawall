const express = require("express");
const router = express.Router();
const handleErrorAsync = require("../service/handleErrorAsync"); //處理全域的catch
const { isAuth } = require("../service/auth");
const userController = require("../controllers/userController");
const passport = require("passport");
const User = require("../model/users");

router
  .patch("/updatePassword", [isAuth(false), handleErrorAsync(userController.updatePassword)] /*** #swagger.tags=['Users-會員']*/) //重設密碼
  .get("/profile/:id", [isAuth(false), handleErrorAsync(userController.profile)] /*** #swagger.tags=['Users-會員']*/) //取得個人資料
  .patch("/profile/", [isAuth(false), handleErrorAsync(userController.patchprofile)] /*** #swagger.tags=['Users-會員']*/) //更新個人資料
  .get("/getLikeList", [isAuth(false), handleErrorAsync(userController.getLikeList)] /*** #swagger.tags=['Users-會員']*/) //取得個人案讚列表
  .post("/:user_id/follow", [isAuth(false), handleErrorAsync(userController.follow)] /*** #swagger.tags=['Users-會員']*/) //user id 追蹤朋友
  .get("/getFollowingList", [isAuth(false), handleErrorAsync(userController.getFollowingList)] /*** #swagger.tags=['Users-會員']*/) //取得個人追蹤名單
  .delete("/:id/unfollow", [isAuth(false), handleErrorAsync(userController.unfollow)] /*** #swagger.tags=['Users-會員']*/) //取消追蹤朋友
  .delete("/userimage/:id", [isAuth(false), handleErrorAsync(userController.userimage)])
  .get("/checkout", [isAuth(true), handleErrorAsync(userController.tokencheck)])
  .get("/google", passport.authenticate("google", { scope: ["email", "profile"] }))
  .get("/google/callback", passport.authenticate("google", { session: false }), handleErrorAsync(userController.googleapis))
  .post("/googleClient/callback", passport.authenticate("google", { session: false }), handleErrorAsync(userController.googleapis));
module.exports = router;
