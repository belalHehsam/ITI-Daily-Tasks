import dbConnect from "@/lib/db";
import Recipe from "@/models/Recipe";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const recipes = await Recipe.find({}).sort({ id: 1 }); // ترتيب تصاعدي بالـ id
    return NextResponse.json({ success: true, data: recipes }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch recipes" },
      { status: 500 },
    );
  }
}
