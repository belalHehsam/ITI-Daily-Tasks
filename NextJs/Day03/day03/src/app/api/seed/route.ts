import { NextResponse } from "next/server";
import { seedRecipes } from "@/lib/seed";

export async function GET() {
  try {
    const result = await seedRecipes();
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Seed failed" },
      { status: 500 },
    );
  }
}
