import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "@/lib/mongodb";
import Product from "@/models/product";

async function getProducts(req: NextApiRequest, res: NextApiResponse) {
  try {
    const products = await Product.find();

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

async function createProduct(req: NextApiRequest, res: NextApiResponse) {
  try {
    const product = await Product.create(req.body);

    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      success: false,
      message: "Invalid Product Data",
    });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      return getProducts(req, res);

    case "POST":
      return createProduct(req, res);

    default:
      return res.status(405).json({
        success: false,
        message: "Method Not Allowed",
      });
  }
}
