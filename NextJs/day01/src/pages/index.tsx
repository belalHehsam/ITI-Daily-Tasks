import HomeHero from "@/components/HomeHero";
import { GetServerSideProps } from "next";

export interface Quote {
  id: number;
  quote: string;
  author: string;
}

interface HomeProps {
  initialQuote: Quote | null;
}

export default function Home({ initialQuote }: HomeProps) {
  return (
    <div>
      <HomeHero />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
    if (!res.ok) {
      throw new Error("Failed to fetch quote");
    }
    const data = (await res.json()) as Quote;
    return {
      props: {
        initialQuote: data,
      },
    };
  } catch (error) {
    console.error("Error fetching initial quote in getServerSideProps:", error);
    return {
      props: {
        initialQuote: null,
      },
    };
  }
};
