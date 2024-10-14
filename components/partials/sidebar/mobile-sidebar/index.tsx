"use client";
import React, { useState } from "react";
import { cn, isLocationMatch } from "@/lib/utils";
import { useSidebar, useThemeStore } from "@/store";
import SidebarLogo from "../common/logo";
import { menusConfig } from "@/config/menus";
import MenuLabel from "../common/menu-label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePathname } from "next/navigation";
import SingleMenuItem from "./single-menu-item";
import SubMenuHandler from "./sub-menu-handler";
import NestedSubMenu from "../common/nested-menus";
import { useUser } from "@/components/user-provider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const MobileSidebar = ({ className, trans }: { className?: string, trans: any }) => {
  const { sidebarBg, mobileMenu, setMobileMenu } = useSidebar();
  const { user } = useUser();
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [activeMultiMenu, setMultiMenu] = useState<number | null>(null);
  const menus = menusConfig?.sidebarNav?.classic || [];
  const { collapsed } = useSidebar();
  const router = useRouter();
  const toggleSubmenu = (i: number) => {
    if (activeSubmenu === i) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(i);
    }
  };
  const handleLogout = () => {
    document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
    toast.success("تم تسجيل الخروج بنجاح");
    router.push("/auth/login");
    };
  const toggleMultiMenu = (subIndex: number) => {
    if (activeMultiMenu === subIndex) {
      setMultiMenu(null);
    } else {
      setMultiMenu(subIndex);
    }
  };

  const locationName = usePathname();

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
    if (mobileMenu) {
      setMobileMenu(false);
    }
  }, [locationName]);

  const filteredMenus =
    user?.role === "admin"
      ? menus
      : menus.filter((item) => item.title === "مهماتي" || item.title === "المحادثات");

  return (
    <>
      <div
        className={cn(
          "fixed top-0 bg-card h-full w-[248px] z-[9999] ",
          className,
          {
            " -left-[300px] invisible opacity-0  ": !mobileMenu,
            " left-0 visible opacity-100  ": mobileMenu,
          }
        )}
      >
        {sidebarBg !== "none" && (
          <div
            className=" absolute left-0 top-0   z-[-1] w-full h-full bg-cover bg-center opacity-[0.07]"
            style={{ backgroundImage: `url(${sidebarBg})` }}
          ></div>
        )}
        <SidebarLogo hovered={collapsed} />
        <ScrollArea
          className={cn("sidebar-menu  h-[calc(100%-80px)] ", {
            "px-4": !collapsed,
          })}
        >
          <ul
            className={cn("", {
              " space-y-2 text-center": collapsed,
            })}
          >
            {filteredMenus.map((item, i) => (
              <li key={`menu_key_${i}`}>
                {/* single menu  */}

                {!item.child && !item.isHeader && (
                  <SingleMenuItem item={item} collapsed={collapsed} />
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
                    />

                    {!collapsed && (
                      <NestedSubMenu
                        toggleMultiMenu={toggleMultiMenu}
                        activeMultiMenu={activeMultiMenu}
                        activeSubmenu={activeSubmenu}
                        item={item}
                        index={i}
                        title={item.title}
                        trans={trans}
                      />
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>

          {/* Button with 'Hello' text */}
          <div className="mt-4  w-full">
            <button onClick={handleLogout} className=" bg-red-500 w-full text-white px-4 py-2 rounded hover:bg-red-600 flex gap-4 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className=" w-[24px] h-[24px]">
  <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
</svg>

            تسجيل الخروج
            </button>
          </div>
        </ScrollArea>
      </div>

      {mobileMenu && (
        <div
          onClick={() => setMobileMenu(false)}
          className="overlay bg-black/60 backdrop-filter backdrop-blur-sm opacity-100 fixed inset-0 z-[999]"
        ></div>
      )}
    </>
  );
};

export default MobileSidebar;
