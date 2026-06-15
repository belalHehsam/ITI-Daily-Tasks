import dbConnect from "@/lib/mongodb";
import Product from "@/models/product";
import type { NextApiRequest, NextApiResponse } from "next";

async function getProductById(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    await dbConnect();
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

async function updateProduct(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    await dbConnect();
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      validators: true,
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }
    return res.status(200).json({
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

async function deleteProduct(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    await dbConnect();
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
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
      return getProductById(req, res);

    case "PUT":
      return updateProduct(req, res);

    case "DELETE":
      return deleteProduct(req, res);

    default:
      return res.status(405).json({
        success: false,
        message: "Method Not Allowed",
      });
  }
}
