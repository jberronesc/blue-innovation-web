"use client";

import Image from "next/image";
import SidebarItems from "./SidebarItems";
import { useSelector } from "react-redux";
import { AppStore } from "@rdtkl/store";
import { IconBrandDocker } from "@tabler/icons-react";

const SidebarHeader = () => {
  const { user, group } = useSelector((store: AppStore) => store.auth);

  return (
    <>
      <div className="flex items-center gap-2 px-2 ps-3">
        <IconBrandDocker className="h-7 w-7 text-black" />
        <span className="text-default-600 text-xl font-bold uppercase">
          BLUE INNOVATION
        </span>
      </div>

      <span
        aria-hidden="true"
        className="block h-px w-px"
        style={{
          marginLeft: "0.25rem",
          marginTop: "3rem",
        }}
      ></span>

      <div className="flex items-center gap-3 px-4">
        <span className="dark:ring-offset-background-dark bg-default text-tiny text-default-foreground ring-default data-[focus-visible=true]:outline-focus relative z-0 box-border flex h-8 w-8 items-center justify-center overflow-hidden rounded-full align-middle outline-none ring-2 ring-offset-2 ring-offset-background data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2">
          <Image
            src="/favicon.ico"
            className="flex h-full w-full object-cover opacity-0 transition-opacity !duration-500 data-[loaded=true]:opacity-100"
            alt="avatar"
            width={100}
            height={24}
            data-loaded="true"
          />
        </span>
        <div className="flex flex-col">
          <p className="text-small text-default-600 font-medium">
            {user.namesShort}
          </p>
          <p className="text-tiny text-default-400 w-40 truncate">
            {user.email}
          </p>
          <p className="text-tiny text-default-400">{group.name}</p>
        </div>
      </div>
    </>
  );
};

const SidebarFooter = ({ exit }: { exit: () => void }) => {
  return (
    <>
      <div className="mt-auto flex flex-col">
        <button
          className="[&amp;>svg]:max-w-[theme(spacing.8)] rounded-medium text-small text-default-500 tap-highlight-transparent transition-transform-colors-opacity data-[hover=true]:bg-default/40 data-[focus-visible=true]:outline-focus group relative z-0 box-border inline-flex h-10 w-full min-w-20 select-none appearance-none items-center justify-start gap-2 overflow-hidden whitespace-nowrap bg-transparent px-4 font-normal subpixel-antialiased outline-none data-[focus-visible=true]:z-10 data-[pressed=true]:scale-[0.97] data-[hover=true]:text-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 motion-reduce:transition-none"
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            className="iconify iconify--solar text-default-500"
            focusable="false"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g fill="none">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="1.5"
                opacity=".5"
              ></circle>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M12 17v-6"
              ></path>
              <circle
                cx="1"
                cy="1"
                r="1"
                fill="currentColor"
                transform="matrix(1 0 0 -1 11 9)"
              ></circle>
            </g>
          </svg>
          Ayuda &amp; Informacion
        </button>
        <button
          className="[&amp;>svg]:max-w-[theme(spacing.8)] rounded-medium text-small text-default-500 tap-highlight-transparent transition-transform-colors-opacity data-[hover=true]:bg-default/40 data-[focus-visible=true]:outline-focus group relative z-0 box-border inline-flex h-10 min-w-20 select-none appearance-none items-center justify-start gap-2 overflow-hidden whitespace-nowrap bg-transparent px-4 font-normal subpixel-antialiased outline-none data-[focus-visible=true]:z-10 data-[pressed=true]:scale-[0.97] data-[hover=true]:text-foreground data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 motion-reduce:transition-none"
          type="button"
          onClick={() => exit()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            className="iconify iconify--solar text-default-500 rotate-180"
            focusable="false"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" opacity=".5"></circle>
              <path strokeLinecap="round" d="M15 12H9"></path>
            </g>
          </svg>
          Salir
        </button>
      </div>
    </>
  );
};

const Sidebar = ({ exit }: { exit: () => void }) => {
  return (
    <aside className="static h-screen w-[22rem]">
      {/* border-r-[1px] */}
      <div
        className="fixed flex h-screen w-[22rem] flex-col bg-gray-50 p-10"
        style={{}}
      >
        <SidebarHeader />
        <SidebarItems />
        <SidebarFooter exit={exit} />
      </div>
    </aside>
  );
};

export default Sidebar;
