"use client";
import React, { useState } from "react";
import { cn, isLocationMatch, getDynamicPath } from "@/lib/utils";
import SidebarLogo from "../common/logo";
import { menusConfig } from "@/config/menus";
import MenuLabel from "../common/menu-label";
import SingleMenuItem from "./single-menu-item";
import SubMenuHandler from "./sub-menu-handler";
import NestedSubMenu from "../common/nested-menus";
import { useSidebar, useThemeStore } from "@/store";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import AddBlock from "../common/add-block";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUser } from "@/components/user-provider"; 
const PopoverSidebar = ({ trans }: { trans: string }) => {
  const { collapsed, sidebarBg } = useSidebar();
  const { layout, isRtl } = useThemeStore();
  const { user } = useUser();
  const menus = menusConfig?.sidebarNav?.classic || [];
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [activeMultiMenu, setMultiMenu] = useState<number | null>(null);
  const router = useRouter();
  const toggleSubmenu = (i: number) => {
    if (activeSubmenu === i) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(i);
    }
  };

  const toggleMultiMenu = (subIndex: number) => {
    if (activeMultiMenu === subIndex) {
      setMultiMenu(null);
    } else {
      setMultiMenu(subIndex);
    }
  };
  const handleLogout = () => {
  document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
  toast.success("تم تسجيل الخروج بنجاح");
  router.push("/auth/login");
  };
  const pathname = usePathname();
  const locationName = getDynamicPath(pathname);

  React.useEffect(() => {
    let subMenuIndex = null;
    let multiMenuIndex = null;
    menus?.map((item: any, i: number) => {
      if (item?.child) {
        item.child.map((childItem: any, j: number) => {
          if (isLocationMatch(childItem.href, locationName)) {
            subMenuIndex = i;
          }
          if (childItem?.multi_menu) {
            childItem.multi_menu.map((multiItem: any, k: number) => {
              if (isLocationMatch(multiItem.href, locationName)) {
                subMenuIndex = i;
                multiMenuIndex = j;
              }
            });
          }
        });
      }
    });
    setActiveSubmenu(subMenuIndex);
    setMultiMenu(multiMenuIndex);
  }, [locationName]);

 
  const filteredMenus = user?.role === "admin"
    ? menus 
    : menus.filter(
        (item) =>
          item.title === "مهماتي" || item.title === "المحادثات" 
      );

  return (
    <div
      className={cn("fixed  top-0  border-r  ", {
        "w-[248px]": !collapsed,
        "w-[72px]": collapsed,
        "m-6 bottom-0   bg-card rounded-md": layout === "semibox",
        "h-full   bg-card ": layout !== "semibox",
      })}
    >
      {sidebarBg !== "none" && (
        <div
          className="absolute left-0 top-0 z-[-1] w-full h-full bg-cover bg-center opacity-[0.07]"
          style={{ backgroundImage: `url(${sidebarBg})` }}
        ></div>
      )}
      <SidebarLogo />
      <Separator />
      <ScrollArea
        className={cn("sidebar-menu h-[calc(100%-80px)]", {
          "px-4": !collapsed,
        })}
      >
        <ul
          dir={isRtl ? "rtl" : "ltr"}
          className={cn(" space-y-1", {
            "space-y-2 text-center": collapsed,
          })}
        >
          {filteredMenus.map((item, i) => (
            <li key={`menu_key_${i}`}>
              {/* single menu  */}
              {!item.child && !item.isHeader && (
                <SingleMenuItem
                  item={item}
                  collapsed={collapsed}
                  trans={trans}
                />
              )}

              {/* menu label */}
              {item.isHeader && !item.child && !collapsed && (
                <MenuLabel item={item} trans={trans} />
              )}

              {/* sub menu */}
              {item.child && (
                <>
                  <SubMenuHandler
                    item={item}
                    toggleSubmenu={toggleSubmenu}
                    index={i}
                    activeSubmenu={activeSubmenu}
                    collapsed={collapsed}
                    menuTitle={item.title}
                    trans={trans}
                  />
                  {!collapsed && (
                    <NestedSubMenu
                      toggleMultiMenu={toggleMultiMenu}
                      activeMultiMenu={activeMultiMenu}
                      activeSubmenu={activeSubmenu}
                      item={item}
                      index={i}
                      trans={trans}
                    />
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-4  w-full">
            <button  onClick={handleLogout}  className=" bg-red-500 w-full text-white px-4 py-2 rounded hover:bg-red-600 flex gap-4 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=" w-[24px] h-[24px]">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
</svg>

            تسجيل الخروج
            </button>
          </div>
        {!collapsed && (
          <div className="-mx-2 ">
            <AddBlock />
          </div>
        )}
      </ScrollArea>
     
    </div>
  );
};

export default PopoverSidebar;
