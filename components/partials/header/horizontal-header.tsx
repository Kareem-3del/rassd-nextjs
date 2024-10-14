import React from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import SiteLogo from "@/components/logo/SiteLogo";
const horizontalHeader = ({ handleOpenSearch }: { handleOpenSearch: () => void; }) => {
  return (
    <div className="flex items-center lg:gap-12 gap-3 ">
      <div>
        <Link
          href="/dashboard"
          className=" text-primary flex items-center gap-2"
        >
          <SiteLogo className="h-7 w-7" />
          <span className=" text-xl font-semibold lg:inline-block hidden">
            {" "}
            رصد
          </span>
        </Link>
      </div>
      <button
        onClick={handleOpenSearch}
        className=" inline-flex lg:gap-2 lg:mr-0 mr-2 items-center text-default-600 text-sm"
      >

      </button>
    </div>
  );
};

export default horizontalHeader;
