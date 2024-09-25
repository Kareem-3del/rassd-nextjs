import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";
import { redirect } from "next/navigation";
import { getDictionary } from "@/app/dictionaries";
import api from "@/lib/api";

const layout = async ({ children, params: { lang } }: { children: React.ReactNode; params: { lang: any } }) => {
  api.get("/auth/current-user").catch(() => {
    redirect("/auth/login");
  });

  const trans = await getDictionary(lang);

  return (
    <DashBoardLayoutProvider trans={trans}>{children}</DashBoardLayoutProvider>
  );
};

export default layout;
