"use client";
import Image from "next/image";
import { Icon } from "@iconify/react";
import background from "@/public/images/auth/line.png";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Fragment, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LogInForm from "@/components/auth/login-form";
import SiteLogo from "@/components/logo/SiteLogo";
import Link from "next/link";
const LoginPage = () => {
  const [openVideo, setOpenVideo] = useState<boolean>(false);
  return (
    <Fragment>
      <div dir="rtl" className="min-h-screen bg-background  flex items-center  overflow-hidden w-full bg-custom-gradient">
   
        <div className="min-h-screen basis-full flex flex-wrap w-full  justify-center overflow-y-auto">
  
          <div
            className="basis-1/2  w-full  relative hidden xl:flex justify-center items-center "
          >
            <div className="relative z-10   py-14 px-16 2xl:py-[84px] 2xl:pl-[50px] 2xl:pr-[136px] rounded max-w-[640px]">
              <div>
              <Link href="/dashboard" className=" block ">
      <SiteLogo width={120} className="h-[300px] w-[300px] 2xl:w-34 2xl:h-24 text-white" />
    </Link>
                <div className="text-2xl text-white leading-[50px] 2xl:text-4xl 2xl:leading-[72px] font-bold mt-2.5">
              
                    مرحبًا بك!.<br/>
               

                </div>
                <span className="text-white leading-[30px] text-lg fon-bold mt-4 dark:text-default-50">
                                      منصة "رصد" هي تطبيق ميداني رقابي يستخدم لمتابعة إجراءات الرعاية الصحية المغطاة بالتأمين. يتيح للمستفيدين مراقبة الجودة والدقة في الفحص، ويقدم تقارير مخصصة يومية وأسبوعية وشهرية حول التقدم والزيارات الميدانية والسرية <br/>

                  </span>
                <div className="mt-5 2xl:mt-8 text-white dark:text-default-200  text-xs font-medium">
                  "جميع الحقوق محفوظة © [منصة رصد] [2024]."
                </div>
              </div>
            </div>
          </div>

          <div className=" min-h-screen basis-full md:basis-1/2 w-full px-4 py-5 flex justify-center items-center ">
            <div className="lg:w-[600px] bg-white px-10 rounded-[24px] ">
              <LogInForm/>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={openVideo}>
        <DialogContent size="lg" className="p-0" hiddenCloseIcon>
          <Button
            size="icon"
            onClick={() => setOpenVideo(false)}
            className="absolute -top-4 -right-4 bg-default-900"
          >
            <X className="w-6 h-6" />
          </Button>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/8D6b3McyhhU?si=zGOlY311c21dR70j"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default LoginPage;
