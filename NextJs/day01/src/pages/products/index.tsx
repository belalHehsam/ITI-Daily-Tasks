import Products from "@/components/Products";
import { GetStaticProps } from "next";
import { IProduct } from "@/components/types/product";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/product";

interface ProductsIndexProps {
  products: IProduct[];
}

export default function ProductsIndex({ products }: ProductsIndexProps) {
  return (
    <div className="bg-background min-h-screen transition-colors duration-300">
      <Products products={products} />
    </div>
  );
}

export const getStaticProps: GetStaticProps<ProductsIndexProps> = async () => {
  try {
    await dbConnect();

    const products = await Product.find().lean();
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)) || [],
      },
      revalidate: 3600, ///ISR
    };
  } catch (err) {
    console.error("Error in getStaticProps within products/indexxxx:", err);
    return {
      props: {
        products: [],
      },
    };
  }
};
