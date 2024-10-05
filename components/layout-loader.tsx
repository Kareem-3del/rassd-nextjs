"use client";
import React from "react";
import { Loader2 } from "lucide-react";
import SiteLogo from "@/components/logo/SiteLogo";
const LayoutLoader = () => {
  return (
    <div className=" h-screen flex items-center justify-center flex-col space-y-2">
{/*
      <SiteLogo className=" h-10 w-10 text-primary" />
*/}
        <SiteLogo width={120} className="h-64 w-64 2xl:w-34 2xl:h-24 text-primary" />

        <span className=" inline-flex gap-1">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        جاري التحميل...
      </span>
    </div>
  );
};

export default LayoutLoader;
