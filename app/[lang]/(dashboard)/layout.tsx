import DashBoardLayoutProvider from "@/provider/dashboard.layout.provider";
import {redirect} from "next/navigation";
import {getDictionary} from "@/app/dictionaries";
import {api} from "@/config/axios.config";
import {UserProvider} from "@/components/user-provider";

const layout = async ({
                          children,
                          params: {lang},
                      }: {
    children: React.ReactNode;
    params: { lang: any };
}) => {
    // try {
    //   const response = await api.get("/auth/current-user");
    //   console.log({ userRes: response });
    //   if (response.status === 401) {
    //     redirect("/auth/login");
    //   }
    // } catch (error) {
    //   console.log({ error });
    //   redirect("/auth/login");
    // }

    const trans = await getDictionary(lang);

    return (
        <UserProvider>
            <DashBoardLayoutProvider trans={trans}>

                {children}
            </DashBoardLayoutProvider>

        </UserProvider>

    );
};

export default layout;
