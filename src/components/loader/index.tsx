import { cn } from "@/lib/utils";
import React from "react";

import { Spinner } from "../spinner";

type LoaderProps = {
  loading: boolean;
  className?: string;
  noPadding?: boolean;
  children: React.ReactNode;
};

export const Loader = ({
  loading,
  children,
  noPadding,
  className,
}: LoaderProps) => {
  return loading ? (
    <div className={cn(className || "flex w-full justify-center py-5")}>
      <Spinner noPadding={noPadding} />
    </div>
  ) : (
    children
  );
};
