import ProductDetails from "@/components/ProductDetails";
import { GetStaticPaths, GetStaticProps } from "next";
import { IProduct } from "@/components/types/product";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/product";
interface ProductPageProps {
  product: IProduct;
}

export default function Id({ product }: ProductPageProps) {
  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect();
  const products = await Product.find({}, "_id").lean();

  const paths = products.map((p) => {
    return {
      params: { id: p._id.toString() },
    };
  });

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async (
  context,
) => {
  await dbConnect();
  const { params } = context;

  if (!params || typeof params.id !== "string") {
    return { notFound: true };
  }

  const product = await Product.findById(params.id).lean();

  if (!product) return { notFound: true };

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
};
