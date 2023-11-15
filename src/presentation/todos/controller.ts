import { Request, Response } from "express";
const todos = [
  { id: 1, text: "comprar pan", completedAt: new Date() },
  { id: 2, text: "comprar leche", completedAt: new Date() },
  { id: 3, text: "comprar huevos", completedAt: new Date() },
  { id: 4, text: "comprar carne", completedAt: null },
  { id: 5, text: "comprar verduras", completedAt: new Date() },
]
export class TodosController{

    constructor(){}

    public getTodos = (req:Request, res:Response) => {
        return res.json(todos);
    }

    public getTodoById = (req:Request, res:Response) => {
        const id = Number(req.params.id);
        if(isNaN(id)) return res.status(400).json({error:"id is not a number"});
        const todo = todos.find(todo => todo.id === id);
        (todo) ? res.json(todo) : res.status(404).json({error:"todo not found"});
    }
    public createTodo = (req:Request, res:Response) => {
      const { text } = req.body;
      if(!text) res.status(400).json({error:"text is required"});
      const  newTodo = {id:todos.length+1,text:text,completedAt:new Date()};
      todos.push(newTodo);
      res.json(newTodo)

    }
    public updateTodo = (req:Request, res:Response) => {
      const id = Number(req.params.id);
      if(isNaN(id)) return res.status(400).json({error:"id is not a number"});
      const { text,completedAt } = req.body;
      //if(!text) res.status(400).json({error:"text is required"});
      const todo = todos.find(todo => todo.id === id);
      if(!todo) return res.status(404).json({error:`todo with id ${id} not found`});
      todo.text = text || todo.text;
      (completedAt === null) ? todo.completedAt = null : todo.completedAt = new Date(completedAt || todo.completedAt);
      res.json(todo)
    }
    public deleteTodo = (req:Request, res:Response) => {
      const id = Number(req.params.id);
      if(isNaN(id)) return res.status(400).json({error:"id is not a number"});
      const todo = todos.find(todo => todo.id === id);
      if(!todo) return res.status(404).json({error:`todo with id ${id} not found`});
      todos.splice(todos.indexOf(todo),1);
      res.json(todo);
    }
}