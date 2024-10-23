import express, { Request, Response } from "express";
const router = express.Router();

const {
  ListAllTodo,
  PostAddTodo,
  DeleteAddTodo,
  EditAddTodo,
} = require("../controller/post.controller");

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: API for managing todos.
 */

/**
 * @swagger
 * /:
 *   get:
 *     tags: [Todos]
 *     summary: Retrieve all todos
 *     description: Get a list of all todos.
 *     responses:
 *       200:
 *         description: A list of todos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Server error
 */
router.get("/", ListAllTodo);

/**
 * @swagger
 * /post:
 *   post:
 *     tags: [Todos]
 *     summary: Create a new todo
 *     description: Add a new todo to the list.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: Todo created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post("/post", PostAddTodo);

/**
 * @swagger
 * /post/{id}:
 *   delete:
 *     tags: [Todos]
 *     summary: Delete a todo
 *     description: Remove a todo by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the todo to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo deleted successfully.
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */
router.delete("/post/:id", DeleteAddTodo);

/**
 * @swagger
 * /post/{id}:
 *   put:
 *     tags: [Todos]
 *     summary: Update a todo
 *     description: Update a todo by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the todo to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Todo updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Todo not found
 *       500:
 *         description: Server error
 */
router.put("/post/:id", EditAddTodo);

module.exports = router;
