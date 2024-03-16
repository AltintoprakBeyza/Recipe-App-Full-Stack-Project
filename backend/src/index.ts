import express from "express";
import cors from "cors";
import "dotenv/config";
import * as RecipeAPI from "./recipe-api";
import { PrismaClient } from "@prisma/client";

const app = express();
const prismaClient = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/api/recipes/search", async (req, res) => {
  const searchTerm = req.query.searchTerm as string;
  const page = parseInt(req.query.page as string);
  const results = await RecipeAPI.searchRecipes(searchTerm, page);

  return res.json(results);
});

app.get("/api/recipes/:recipeId/summary", async (req, res) => {});

app.post("/api/recipes/favourite", async (req, res) => {});

app.get("/api/recipes/favourite", async (req, res) => {});

app.delete("/api/recipes/favourite", async (req, res) => {});

app.listen(5050, () => {
  console.log("server running on localhost:5050");
});
