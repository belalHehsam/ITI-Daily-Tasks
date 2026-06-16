import dbConnect from "./db";
import Recipe from "../models/Recipe";

export async function seedRecipes() {
  try {
    await dbConnect();

    console.log("Fetching recipes from external API...");

    const res = await fetch("https://dummyjson.com/recipes?limit=30");
    if (!res.ok) throw new Error("Failed to fetch from external source");

    const data = await res.json();
    const externalRecipes = data.recipes;

    console.log(`Inserting ${externalRecipes.length} recipes into MongoDB...`);
    const insertedData = await Recipe.insertMany(externalRecipes);

    console.log(" Database Seeded Successfully!");
    return { message: "Success", count: insertedData.length };
  } catch (error) {
    console.error(" Error seeding database:", error);
    throw error;
  }
}
