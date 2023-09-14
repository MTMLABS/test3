import express from "express";
import PostsRouter from "./routes/posts.router.js ";


// const express = require('express');
const app = express();
const PORT = 3000;

/** (구현) **/
app.use(express.json());
app.use("/api", [PostsRouter])

app.listen(PORT, () => {
  console.log(`Server listen ${PORT}`)
});