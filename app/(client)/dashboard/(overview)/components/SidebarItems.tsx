"use client";

import clsx from "clsx";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { AppStore } from "@rdtkl/store";
import AuthSlice from "@rdtkl/slices/authSlice";
import ConfigSystemSlice from "@rdtkl/slices/configSystemSlice";

const SidebarMenus = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { menus } = useSelector((store: AppStore) => store.auth);

  return (
    <>
      {menus.map((menu) => (
        <li
          key={menu.id}
          role="option"
          aria-selected="false"
          aria-labelledby="react-aria6651468249-:ri:"
          data-key="cap_table"
          id="react-aria6651468249-:r0:-option-cap_table"
          data-selectable="true"
          className="data-[focus-visible=true]:dark:ring-offset-background-content1 group relative box-border flex h-auto w-full cursor-pointer items-center justify-between gap-2 rounded-small p-0 subpixel-antialiased outline-none tap-highlight-transparent data-[focus-visible=true]:z-10 data-[hover=true]:bg-default/40 data-[hover=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[hover=true]:transition-colors data-[selectable=true]:focus:bg-default/40 data-[selectable=true]:focus:text-default-foreground"
        >
          <span
            id="react-aria6651468249-:ri:"
            data-label="true"
            className="flex-1 truncate rounded-lg text-small font-medium text-default-500 group-data-[selected=true]:text-foreground"
          >
            <div className="w-full p-0" data-orientation="vertical">
              <div
                className="group-[.is-splitted]:rounded-medium group-[.is-splitted]:bg-content1 group-[.is-splitted]:px-4 group-[.is-splitted]:shadow-medium"
                aria-label="Cap Table"
                data-open="true"
              >
                <h2
                  className={clsx("pr-3", {
                    "bg-default-100": menu.isColored,
                  })}
                  data-open="true"
                  onClick={() => {
                    dispatch(
                      AuthSlice.actions.openMenu({
                        menuId: menu.id,
                        pathname,
                      }),
                    );
                  }}
                >
                  <button
                    className="flex h-full w-full items-center gap-3 p-0 outline-none transition-opacity tap-highlight-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus"
                    type="button"
                    id=":rk:"
                    aria-expanded="true"
                    style={{ userSelect: "none" }}
                    data-open="true"
                    aria-controls=":rl:"
                  >
                    <div className="flex flex-1 flex-col text-start">
                      <span
                        className="text-large text-foreground"
                        data-open="true"
                      >
                        <div className="flex h-11 items-center gap-2 px-3 py-1.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            role="img"
                            className="iconify iconify--solar text-default-500 group-data-[selected=true]:text-foreground"
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                          >
                            <g
                              fill="currentColor"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            >
                              <path d="M17.206 1.856c-1.063-.419-2.09-.135-2.817.512c-.71.63-1.139 1.602-1.139 2.632v4c0 .967.784 1.75 1.75 1.75h4c1.03 0 2.002-.43 2.633-1.139c.646-.727.93-1.754.51-2.817a8.776 8.776 0 0 0-4.937-4.938M14.75 9V5c0-.627.265-1.182.636-1.512c.353-.314.791-.425 1.27-.236a7.276 7.276 0 0 1 4.092 4.092c.189.479.078.917-.236 1.27c-.33.371-.885.636-1.512.636h-4a.25.25 0 0 1-.25-.25"></path>
                              <path d="M10.995 2.87c-.61-.396-1.2-.51-1.85-.396c-.55.096-1.14.36-1.767.641l-.067.03A10.25 10.25 0 1 0 20.855 16.69l.03-.068c.281-.627.545-1.217.641-1.768c.113-.648 0-1.239-.396-1.85c-.426-.657-1.01-.979-1.724-1.125c-.634-.13-1.426-.13-2.334-.129H15.5c-.964 0-1.612-.002-2.095-.066c-.461-.063-.659-.17-.789-.3c-.13-.13-.237-.328-.3-.79c-.064-.482-.066-1.13-.066-2.094V6.928c0-.908 0-1.7-.13-2.334c-.145-.714-.467-1.298-1.125-1.724M7.924 4.514c.719-.322 1.136-.503 1.48-.563c.265-.046.474-.018.776.178c.254.165.389.361.471.765c.095.467.099 1.104.099 2.106v1.552c0 .898 0 1.648.08 2.242c.084.628.27 1.195.726 1.65c.455.456 1.022.642 1.65.726c.594.08 1.344.08 2.242.08H17c1.002 0 1.639.004 2.106.099c.404.082.6.217.765.471c.196.302.224.511.178.777c-.06.343-.241.76-.563 1.48a8.755 8.755 0 0 1-4.638 4.507a8.75 8.75 0 0 1-6.924-16.07"></path>
                            </g>
                          </svg>
                          <span className="text-sm font-medium text-default-500 group-data-[selected=true]:text-foreground">
                            {menu.name}
                          </span>
                        </div>
                      </span>
                    </div>
                    <span
                      aria-hidden="true"
                      className="rotate-0 text-default-400 transition-transform data-[open=true]:-rotate-90 rtl:-rotate-180 rtl:data-[open=true]:-rotate-90"
                      data-open="true"
                    >
                      <svg
                        aria-hidden="true"
                        fill="none"
                        focusable="false"
                        height="1em"
                        role="presentation"
                        viewBox="0 0 24 24"
                        width="1em"
                      >
                        <path
                          d="M15.5 19l-7-7 7-7"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </h2>
                <section
                  style={{
                    overflowY: "hidden",
                    willChange: "auto",
                    opacity: "1",
                    height: "auto",
                  }}
                >
                  <div
                    data-open="true"
                    className="py-0 pl-4"
                    id=":rl:"
                    role="region"
                    aria-labelledby=":rk:"
                  >
                    <div
                      data-slot="base"
                      className="relative mt-0.5 flex w-full flex-col gap-1 p-1"
                    >
                      <ul
                        data-slot="list"
                        className={clsx(
                          "flex w-full flex-col gap-0.5 border-l border-default-200 pl-4 outline-none",
                          {
                            hidden: !menu.isSelected,
                          },
                        )}
                        role="listbox"
                        id="react-aria6651468249-:rp:"
                      >
                        {menu.modules.map((module) => (
                          <Link
                            key={`${menu.id}-${module.id}`}
                            role="option"
                            aria-labelledby="react-aria6651468249-:r11:"
                            href={module.url}
                            data-key="transactions_log"
                            id="react-aria6651468249-:rp:-option-transactions_log"
                            title="Transactions Log"
                            className={clsx(
                              "data-[focus-visible=true]:dark:ring-offset-background-content1 group relative box-border flex h-full w-full cursor-pointer items-center justify-between gap-2 rounded-lg rounded-small px-2 py-1.5 subpixel-antialiased outline-none tap-highlight-transparent data-[focus-visible=true]:z-10 data-[hover=true]:bg-default/40 data-[hover=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[hover=true]:transition-colors data-[selectable=true]:focus:bg-default/40 data-[selectable=true]:focus:text-default-foreground",
                              {
                                "bg-default-100":
                                  module.urlMatch.length > 10 &&
                                  pathname.indexOf(module.urlMatch) >= 0,
                              },
                            )}
                            onClick={() => {
                              const isHerePath =
                                module.urlMatch.length > 10 &&
                                pathname.indexOf(module.urlMatch) >= 0;

                              if (!isHerePath)
                                dispatch(
                                  ConfigSystemSlice.actions.updateLoadingSide(
                                    true,
                                  ),
                                );
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                              role="img"
                              className="iconify iconify--solar text-default-500 group-data-[selected=true]:text-foreground"
                              width="0"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <g
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              >
                                <path d="M16 4.002c2.175.012 3.353.109 4.121.877C21 5.758 21 7.172 21 10v6c0 2.829 0 4.243-.879 5.122C19.243 22 17.828 22 15 22H9c-2.828 0-4.243 0-5.121-.878C3 20.242 3 18.829 3 16v-6c0-2.828 0-4.242.879-5.121c.768-.768 1.946-.865 4.121-.877"></path>
                                <path
                                  strokeLinecap="round"
                                  d="M10.5 14H17M7 14h.5M7 10.5h.5m-.5 7h.5m3-7H17m-6.5 7H17"
                                ></path>
                                <path d="M8 3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5v1A1.5 1.5 0 0 1 14.5 6h-5A1.5 1.5 0 0 1 8 4.5z"></path>
                              </g>
                            </svg>
                            <span
                              id="react-aria6651468249-:r11:"
                              data-label="true"
                              className="flex-1 truncate text-small font-normal"
                            >
                              {module.name}
                            </span>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </span>
        </li>
      ))}
    </>
  );
};

const SidebarItems = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(AuthSlice.actions.defaultFirst({ pathname }));
  }, []);

  const goDahsboard = () => {
    dispatch(ConfigSystemSlice.actions.updateLoadingSide(true));
    dispatch(AuthSlice.actions.goDahsboard());
  };

  return (
    <div
      className="-mr-6 h-full max-h-full overflow-y-auto py-6 pr-6 data-[top-bottom-scroll=true]:[mask-image:linear-gradient(#000,#000,transparent_0,#000_var(--scroll-shadow-size),#000_calc(100%_-_var(--scroll-shadow-size)),transparent)] data-[top-scroll=true]:[mask-image:linear-gradient(0deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)] data-[bottom-scroll=true]:[mask-image:linear-gradient(180deg,#000_calc(100%_-_var(--scroll-shadow-size)),transparent)]"
      data-orientation="vertical"
      data-top-scroll="false"
      data-bottom-scroll="false"
      // style="--scroll-shadow-size: 40px;"
    >
      <div
        data-slot="base"
        className="relative flex w-full list-none flex-col gap-1 p-1"
      >
        <nav
          data-slot="list"
          className="flex w-full flex-col items-center gap-0.5 outline-none"
          role="listbox"
          id="react-aria8068982193-:rm:"
        >
          <Link
            role="option"
            aria-selected="true"
            aria-labelledby="react-aria8068982193-:rq:"
            href={"/dashboard"}
            data-key="home"
            id="react-aria8068982193-:rm:-option-home"
            //  icon="solar:home-2-linear"
            title="Home"
            data-selectable="true"
            className={clsx(
              "data-[focus-visible=true]:dark:ring-offset-background-content1 group relative mb-2 box-border flex h-[44px] min-h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-large px-3 py-1.5 subpixel-antialiased outline-none tap-highlight-transparent data-[focus-visible=true]:z-10 data-[hover=true]:bg-default/40 data-[selected=true]:bg-default-100 data-[hover=true]:text-default-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus data-[hover=true]:transition-colors data-[selectable=true]:focus:bg-default/40 data-[selectable=true]:focus:text-default-foreground",
              {
                "bg-default-100": pathname == "/dashboard",
              },
            )}
            onClick={goDahsboard}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              className="iconify iconify--solar text-default-500 group-data-[selected=true]:text-foreground"
              width="22"
              height="22"
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2 12.204c0-2.289 0-3.433.52-4.381c.518-.949 1.467-1.537 3.364-2.715l2-1.241C9.889 2.622 10.892 2 12 2c1.108 0 2.11.622 4.116 1.867l2 1.241c1.897 1.178 2.846 1.766 3.365 2.715c.519.948.519 2.092.519 4.38v1.522c0 3.9 0 5.851-1.172 7.063C19.657 22 17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.212C2 19.576 2 17.626 2 13.725z"></path>
                <path strokeLinecap="round" d="M12 15v3"></path>
              </g>
            </svg>
            <span
              id="react-aria8068982193-:rq:"
              data-label="true"
              className="flex-1 truncate text-small font-medium text-default-500 group-data-[selected=true]:text-foreground"
            >
              Home
            </span>
          </Link>

          <SidebarMenus />
        </nav>
      </div>
    </div>
  );
};

export default SidebarItems;
