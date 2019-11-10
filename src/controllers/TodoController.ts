import Todo from '../models/Todo';
import { Request, Response } from "express";
import mongoose from "mongoose"
import _ from "lodash"

export class TodoController {
  
    public async getTodos(req: Request, res: Response) {
        try {
            const todos = await Todo.aggregate([
                { $match: { isDeleted: false } },
                {
                    $lookup: {
                        from: "users",
                        let: { userId: "$userId" },
                        pipeline: [{ $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
                        {
                            $project: {
                                name: "$name",
                                userId: "$_id", _id: 0, username: "$username", profilePicture: "$profilePicture",
                                occupation: "$occupation", email: "$email", address: "$address"
                            }
                        }],
                        as: "user"
                    }
                },
                {
                    $project: {
                        task: "$task", createdAt: "$createdAt",
                        completed: "$completed", todoId: { $toString: "$_id" },
                        _id: 0, user: { $arrayElemAt: ["$user", 0] }
                    }
                }
            ])
            return res.status(200).send({
                status: true,
                message: "Todo lists.",
                data: todos
            })
        } catch (error) {
            return res.status(200).send({
                status: false,
                message: error.message,
                data: []
            })
        }
    }

    public async getTodoById(req: Request, res: Response) {
        try {
            const todoId = req.params.todoId
            const todos = await Todo.aggregate([
                { $match: { _id: mongoose.Types.ObjectId(todoId), isDeleted: false } },
                {
                    $lookup: {
                        from: "users",
                        let: { userId: "$userId" },
                        pipeline: [
                            { $match: { $expr: { $eq: ["$_id", "$$userId"] } } },
                            {
                                $project: {
                                    name: "$name", serId: "$_id", _id: 0, email: "$email", address: "$address",
                                    username: "$username", profilePicture: "$profilePicture", occupation: "$occupation"
                                }
                            }],
                        as: "user"
                    }
                },
                {
                    $project: {
                        task: "$task",
                        createdAt: "$createdAt",
                        completed: "$completed",
                        todoId: { $toString: "$_id" },
                        _id: 0,
                        user: { $arrayElemAt: ["$user", 0] }
                    }
                }
            ])

            return res.status(200).send({
                status: true,
                message: "Todo item by todoId.",
                data: _.get(todos, "[0]", [])
            })
        } catch (error) {
            return res.status(200).send({
                status: false,
                message: error.message,
                data: []
            })
        }
    }

    public async deleteTodo(req: Request, res: Response) {
        try {
            const todoId = req.params.todoId
            const todo = await Todo.findOneAndUpdate(
                { _id: mongoose.Types.ObjectId(todoId) },
                { $set: { isDeleted: true } },
                { new: true }
            )
            return res.status(200).send({
                status: true,
                message: "Todo item deleted successfully.",
                data: todo
            })
        } catch (e) {
            return res.status(200).send({
                status: false,
                message: "Invalid Request.",
                data: []
            })
        }
    }

    public async  updateTodo(req: Request, res: Response) {
        try {
            const payload = req.body
            const todo = await Todo.findOneAndUpdate(
                { _id: mongoose.Types.ObjectId(payload.todoId) },
                { $set: { status: payload.status } },
                { new: true }
            )
            return res.status(200).send({
                status: true,
                message: "Todo updated successfully.",
                data: todo
            })
        } catch (e) {
            return res.status(200).send({
                status: false,
                message: "Invalid Request.",
                data: []
            })
        }
    }

    public async  createTodo(req: Request, res: Response) {
        try {
            const payload = req.body
            const todo = await Todo.create(payload)
            return res.status(200).send({
                status: true,
                message: "Todo create successfully.",
                data: todo
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
