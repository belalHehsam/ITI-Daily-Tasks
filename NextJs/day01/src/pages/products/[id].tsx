import ProductDetails from "@/components/ProductDetails";
import { GetStaticPaths, GetStaticProps } from "next";
import { Product } from "@/components/types/product";
interface ProductPageProps {
  product: Product;
}

export default function Id({ product }: ProductPageProps) {
  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
      { params: { id: "4" } },
    ],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<ProductPageProps> = async (
  context,
) => {
  const { params } = context;

  if (!params || typeof params.id !== "string") {
    return { notFound: true };
  }

  const res = await fetch(`https://dummyjson.com/products/${params.id}`);

  if (!res.ok) {
    return { notFound: true };
  }

  const data: Product = await res.json();

  return {
    props: {
      product: data,
    },
  };
};
