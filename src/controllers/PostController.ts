import Post from '../models/Todo';
import { Request, Response } from "express";
import mongoose from "mongoose"
import _ from "lodash"

export class PostController {
  
    public async getPosts(req: Request, res: Response) {
        try {
            const posts = await Post.aggregate([
                { $lookup: {
                    from: "users",
                    let: { userId: "$userId" },
                    pipeline: [
                      { $match: { $expr: { $eq: ["$_id", "$$userId"] } }}
                    ],
                    as: "user"
                  }
                },
                { $project: {
                    title: "$title",
                    createdAt: "$createdAt",
                    body: "$body",
                    id: { $toString: "$_id" },
                    _id: 0,
                    user: { $arrayElemAt: ["$user", 0] }
                  }
                },
                { $lookup: {
                    from: "comments",
                    let: { postId: "$id" },
                    pipeline: [
                      { $match: { $expr: { $eq: [{ $toString: "$postId" }, "$$postId"] } } },
                      { $lookup: {
                          from: "users",
                          let: { userId: "$userId" },
                          pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$userId"] } } }
                          ],
                          as: "user"
                        }
                      },
                      { $project: {
                          id: { $toString: "$_id" },
                          createdAt: "$createdAt",
                          user: { $arrayElemAt: ["$user", 0] },
                          _id: 0, comment: "$body"
                        }
                      }
                    ],
                    as: "comments"
                  }
                }
              ])
            return res.status(200).send({
                status: true,
                message: "Post lists.",
                data: posts
            })
        } catch (error) {
            return res.status(200).send({
                status: false,
                message: error.message,
                data: []
            })
        }
    }

    public async getPostById(req: Request, res: Response) {
        try {
            const postId = req.params.postId
            const posts = await Post.aggregate([
              { $match: { _id: mongoose.Types.ObjectId(postId) } },
              { $lookup: {
                  from: "users",
                  let: { userId: "$userId" },
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$userId"] } }}
                  ],
                  as: "user"
              }},
              { $project: {
                  title: "$title",
                  createdAt: "$createdAt",
                  body: "$body",
                  id: { $toString: "$_id" },
                  _id: 0,
                  user: { $arrayElemAt: ["$user", 0] }
              }},
              { $lookup: {
                  from: "comments",
                  let: { postId: "$id" },
                  pipeline: [
                    { $match: { $expr: { $eq: [{ $toString: "$postId" }, "$$postId"] } } },
                    { $lookup: {
                        from: "users",
                        let: { userId: "$userId" },
                        pipeline: [
                          { $match: { $expr: { $eq: ["$_id", "$$userId"] } } }
                        ],
                        as: "user"
                    }},
                    { $project: {
                        id: { $toString: "$_id" },
                        createdAt: "$createdAt",
                        user: { $arrayElemAt: ["$user", 0] },
                        _id: 0, comment: "$body"
                    }}
                  ],
                  as: "comments"
              }}]);
            return res.status(200).send({
                status: true,
                message: "Post item by userId.",
                data: _.get(posts, "[0]", [])
            })
        } catch (error) {
            return res.status(200).send({
                status: false,
                message: error.message,
                data: []
            })
        }
    }
  
    public async getPostByUserId(req: Request, res: Response) { 
       try  {
        const userId = req.params.userId
        const posts = await Post.aggregate([
          { $match: { userId: mongoose.Types.ObjectId(userId) } },
          { $lookup: {
              from: "users",
              let: { userId: "$userId" },
              pipeline: [
                { $match: { $expr: { $eq: ["$_id", "$$userId"] } }}
              ],
              as: "user"
          }},
          { $project: {
              title: "$title",
              createdAt: "$createdAt",
              body: "$body",
              id: { $toString: "$_id" },
              _id: 0,
              user: { $arrayElemAt: ["$user", 0] }
          }},
          { $lookup: {
              from: "comments",
              let: { postId: "$id" },
              pipeline: [
                { $match: { $expr: { $eq: [{ $toString: "$postId" }, "$$postId"] } } },
                { $lookup: {
                    from: "users",
                    let: { userId: "$userId" },
                    pipeline: [
                      { $match: { $expr: { $eq: ["$_id", "$$userId"] } } }
                    ],
                    as: "user"
                }},
                { $project: {
                    id: { $toString: "$_id" },
                    createdAt: "$createdAt",
                    user: { $arrayElemAt: ["$user", 0] },
                    _id: 0, comment: "$body"
                }}
              ],
              as: "comments"
          }}
        ])
        return res.status(200).send({
          status: true,
          message: "Post item by userId.",
          data: posts
        })
       } catch {

       }
    }

    public async  createTodo(req: Request, res: Response) {
        try {
            const payload = req.body
            const post = await Post.create(payload)
            return res.status(200).send({
                status: true,
                message: "Todo create successfully.",
                data: post
            })
        } catch (e) {
            return res.status(200).send({
                status: false,
                message: "Invalid Request.",
                data: []
            })
        }
 
    }
    
}
