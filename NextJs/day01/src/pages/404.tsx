import CustomError from "@/components/CustomError";
import React from "react";
import type { NextPage } from "next";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

const Custom404: NextPageWithLayout = () => {
  return (
    <div>
      <CustomError />
    </div>
  );
};

Custom404.getLayout = (page: React.ReactElement): React.ReactNode => {
  return <>{page}</>;
};

export default Custom404;
