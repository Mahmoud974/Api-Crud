import { Request, Response } from "express";
import { z } from "zod";
const PostModel = require("../model/post.model");
import mongoose from "mongoose";

module.exports.ListAllTodo = async (req: Request, res: Response) => {
  try {
    const todos = await PostModel.find();
    res.status(200).json(todos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des tâches", error });
  }
};
// Poster un message
module.exports.PostAddTodo = async (req: Request, res: Response) => {
  // Schéma Zod pour valider les données
  const schema = z.object({
    title: z
      .string()
      .min(1, "Le titre est obligatoire et doit contenir au moins un caractère")
      .max(255, "Le titre ne doit pas dépasser 255 caractères")
      .regex(/^[^\d]+$/, "Le titre ne doit pas contenir de chiffres"),
    content: z
      .string()
      .min(1, "Le contenu est obligatoire")
      .max(255, "Le contenu ne doit pas dépasser 255 caractères"),
    createdAt: z
      .string()
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
      })
      .optional(),
  });

  // Validation des données de req.body avec safeParse
  const validationResult = schema.safeParse(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      message: "Validation error",
      errors: validationResult.error.errors,
    });
  }

  const { title, content, createdAt } = validationResult.data;

  // Utiliser une date complète pour stocker dans la base de données
  const validDate = createdAt ? new Date(createdAt) : new Date();

  // Formater `createdAt` pour l'affichage ou le stockage
  const formattedDate = validDate.toISOString(); // Format ISO complet

  try {
    const post = await PostModel.create({
      title,
      content,
      createdAt: formattedDate, // Stocker la date complète
    });
    res.status(200).json(post);
  } catch (error) {
    // Gestion des erreurs Mongoose
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.DeleteAddTodo = async (req: Request, res: Response) => {
  const postId = req.params.id;

  const postModel = await PostModel.findByIdAndDelete(postId);

  try {
    if (!postModel) {
      return res.status(404).json({ message: "Post not found" });
    } else {
      res.status(200).json({ message: "supprimer" });
    }
  } catch (err) {
    res.status(500).json({ message: "Error servor" });
  }
};

module.exports.EditAddTodo = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const postModel = await PostModel.findByIdAndUpdate(postId, req.body, {
      new: true, // Renvoie le post mis à jour
    });
    if (!mongoose.Types.ObjectId.isValid(postModel)) {
      console.log(postModel);
    } else {
      res.status(200).json(postModel);
    }
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
