const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Post = require("../model/posts");
const postController = require("../controllers/postController");

const { isAuth } = require("../service/auth");
const handleErrorAsync = require("../service/handleErrorAsync");

router
  .get(
    "/",
    [handleErrorAsync(postController.getPosts)]
    /*** #swagger.tags=['Posts-貼文']
     * #swagger.summary = '取得所有貼文'
     * #swagger.description='取得所有貼文'
     */
  ) //取得所有貼文
  .get(
    "/:id",
    [isAuth, handleErrorAsync(postController.getonePost)]
    /**
     * #swagger.tags=['Posts-貼文']
     * #swagger.summary = '取得單一貼文'
     * #swagger.description='取得單一貼文'*/
  )
  .post(
    "/",
    [isAuth, handleErrorAsync(postController.postPosts)]
    /** #swagger.tags=['Posts-貼文']
     * #swagger.summary = '新增貼文'
     * #swagger.description='新增貼文'*/
  )
  .get(
    "/user/:id",
    [isAuth, handleErrorAsync(postController.getuserpost)]
    /** #swagger.tags=['Posts-貼文']
     * #swagger.summary = '取得個人所有貼文列表'
     * #swagger.description='取得個人所有貼文列表'*/
  )
  .post(
    "/:id/comment",
    [isAuth, handleErrorAsync(postController.postcomment)]
    /** #swagger.tags=['Posts-貼文']
     * #swagger.summary = '取新增一則貼文的留言'
     * #swagger.description='新增一則貼文的留言'*/
  )
  .post(
    "/:id/likes",
    [isAuth, handleErrorAsync(postController.likspost)]
    /** #swagger.tags=['Posts-貼文']
     * #swagger.summary = '新增一則貼文的讚'
     * #swagger.description='新增一則貼文的讚'*/
  )
  .delete(
    "/:id/unlikes",
    [isAuth, handleErrorAsync(postController.deletelikepost)]
    /** #swagger.tags=['Posts-貼文']
     * #swagger.summary = '取消一則貼文的讚'
     * #swagger.description='取消一則貼文的讚'*/
  );

module.exports = router;
