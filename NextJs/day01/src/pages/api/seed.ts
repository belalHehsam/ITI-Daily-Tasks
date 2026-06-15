// import type { NextApiRequest, NextApiResponse } from "next";

// import dbConnect from "@/lib/mongodb";
// import Product from "@/models/product";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   try {
//     await dbConnect();

//     const response = await fetch("https://dummyjson.com/products");

//     const data = await response.json();

//     await Product.deleteMany({});

//     const products = await Product.insertMany(data.products);

//     return res.status(200).json({
//       success: true,
//       insertedCount: products.length,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to seed database",
//     });
//   }
// }
