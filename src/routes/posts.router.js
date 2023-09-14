import express from "express";
import { prisma } from "../utils/prisma/index.js";

// const express = require('express');
// const { Posts } = require('../models');

const router = express.Router();

// (1) 게시글 생성
router.post("/posts", async (req, res, next) => {
  const { postId } = req.params;
  const { title, content } = req.body;

  const createNewPost = await prisma.posts.create({
    data: {
      title,
      content,
    },
  });

  return res.status(200).json({ data: createNewPost });
});

// (2) 게시글 전체 조회
router.get("/posts", async (req, res, next) => {
  const { postId } = req.params;

  const getAllPosts = await prisma.posts.findMany({
    select: {
      postId: true,
      title: true,
      content: true,
    },
  });

  return res.status(200).json({ data: getAllPosts });
});

// (3) 게시글 수정
router.put("/posts/:postId", async (req, res, next) => {
  const { postId } = req.params;
  const { title, content } = req.body;

  try {
    const updatePost = await prisma.posts.update({
      where: { postId: +postId },
      data: {
        title,
        content,
      },
    });
    return res.status(200).json({ data: updatePost });
  } catch (error) {
    return res.status(404).json({ message: "게시글 수정에 실패했습니다." });
  }
});

// (4) 게시글 삭제
router.delete("/posts/:postId", async (req, res, next) => {
  const { postId } = req.params;
  try {
    const deletePostById = await prisma.posts.delete({
      where: { postId: +postId },
    });
    return res.status(200).json({ data: deletePostById });
  } catch (error) {
    return res.status(404).json({ message: "게시글 삭제에 실패했습니다." });
  }
});

export default router;


