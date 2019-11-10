
import { Request, Response } from "express";
import { TodoController } from "../controllers/TodoController";
import { AuthController } from "../controllers/AuthController";
import { PostController } from "../controllers/PostController";

export class Routes {
    public todoController: TodoController = new TodoController();
    public authController: AuthController = new AuthController();
    public postController: PostController = new PostController();
    
    public routes(app): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            })

        app.route('/api/v1/login').post(this.authController.login)
        app.route('/api/v1/me').get(this.authController.authenticate)
        app.route('/api/v1/registration').post(this.authController.registration)
        

        // Todo List 
        app.route('/api/v1/todos').get(this.todoController.getTodos)
            // POST endpoint
            .post(this.todoController.createTodo)
        app.route('/api/v1/todos/:todoId')
            // get specific todo by Id
            .get(this.todoController.getTodoById)
            // Update specific todo
            .put(this.todoController.updateTodo)
            // Delete specific todo
            .delete(this.todoController.deleteTodo)
        
        // Post List 
        app.route('/api/v1/posts')
            // GET endpoint 
            .get(this.postController.getPosts)
            // POST endpoint
            .post(this.postController.createTodo)
        app.route('/api/v1/post/:postId')
            // get specific todo by Id
            .get(this.postController.getPostById)
        app.route('/api/v1/user/posts/:userId')
            // get specific todo by Id
            .get(this.postController.getPostByUserId)
            
    }
}