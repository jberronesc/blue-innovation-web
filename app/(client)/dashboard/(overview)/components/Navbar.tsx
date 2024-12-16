import Image from "next/image";
import React from "react";
import GeneralLedgerSelect from "./GeneralLedgerSelect";
import HeaderExerciseLabel from "./HeaderExerciseLabel";

const Navbar = () => {
  return (
    <nav className="sticky inset-x-0 top-0 z-40 flex h-auto w-full items-center justify-center border-divider bg-background/70 backdrop-blur-lg backdrop-saturate-150 data-[menu-open=true]:border-none data-[menu-open=true]:backdrop-blur-xl">
      <header className="relative z-40 me-20 flex h-[64px] w-full flex-row flex-nowrap items-center justify-between gap-4 px-4 sm:px-6">
        <div className="box-border flex flex-grow basis-0 flex-row flex-nowrap items-center justify-start whitespace-nowrap bg-transparent text-medium no-underline">
          <button
            className="group mr-2 flex h-6 w-6 items-center justify-center rounded-small outline-none tap-highlight-transparent data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus sm:hidden"
            type="button"
            aria-pressed="false"
          >
            <span className="sr-only">open navigation menu</span>
            <span className="pointer-events-none flex h-full w-full flex-col items-center justify-center text-inherit transition-opacity before:block before:h-px before:w-6 before:-translate-y-1 before:rotate-0 before:bg-current before:transition-transform before:duration-150 before:content-[''] after:block after:h-px after:w-6 after:translate-y-1 after:rotate-0 after:bg-current after:transition-transform after:duration-150 after:content-[''] group-data-[pressed=true]:opacity-70 group-data-[open=true]:before:translate-y-px group-data-[open=true]:before:rotate-45 group-data-[open=true]:after:translate-y-0 group-data-[open=true]:after:-rotate-45"></span>
          </button>
          <svg fill="none" height="32" viewBox="0 0 32 32" width="32">
            <path
              clipRule="evenodd"
              d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
              fill="currentColor"
              fillRule="evenodd"
            ></path>
          </svg>
          <p className="font-bold text-default-600">{/*BLUE INNOVATION*/}</p>
        </div>

        <ul
          className="ml-auto flex h-12 max-w-fit flex-row flex-nowrap items-center gap-0 data-[justify=end]:flex-grow data-[justify=start]:flex-grow data-[justify=end]:basis-0 data-[justify=start]:basis-0 data-[justify=start]:justify-start data-[justify=end]:justify-end data-[justify=center]:justify-center"
          data-justify="end"
        >
          <li className="box-border list-none whitespace-nowrap px-2 text-medium data-[active=true]:font-semibold data-[active=true]:text-primary">
            <HeaderExerciseLabel />
          </li>
          <li className="box-border list-none whitespace-nowrap px-2 text-medium data-[active=true]:font-semibold data-[active=true]:text-primary">
            <GeneralLedgerSelect />
          </li>
          <li className="box-border list-none whitespace-nowrap text-medium data-[active=true]:font-semibold data-[active=true]:text-primary lg:hidden">
            <button
              className="group relative z-0 box-border inline-flex h-10 w-10 min-w-10 select-none appearance-none items-center justify-center !gap-0 gap-2 overflow-hidden whitespace-nowrap rounded-full bg-transparent px-0 text-small font-normal text-default-foreground subpixel-antialiased outline-none tap-highlight-transparent transition-transform-colors-opacity data-[focus-visible=true]:z-10 data-[pressed=true]:scale-[0.97] data-[hover=true]:bg-default/40 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus motion-reduce:transition-none"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="iconify iconify--solar text-default-500"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11.5" cy="11.5" r="9.5"></circle>
                  <path strokeLinecap="round" d="M18.5 18.5L22 22"></path>
                </g>
              </svg>
            </button>
          </li>
          <li className="box-border hidden list-none whitespace-nowrap text-medium data-[active=true]:font-semibold data-[active=true]:text-primary lg:flex">
            <button
              className="group relative z-0 box-border inline-flex h-10 w-10 min-w-10 select-none appearance-none items-center justify-center !gap-0 gap-2 overflow-hidden whitespace-nowrap rounded-full bg-transparent px-0 text-small font-normal text-default-foreground subpixel-antialiased outline-none tap-highlight-transparent transition-transform-colors-opacity data-[focus-visible=true]:z-10 data-[pressed=true]:scale-[0.97] data-[hover=true]:bg-default/40 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus motion-reduce:transition-none"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="iconify iconify--solar text-default-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="6"></circle>
                  <path
                    strokeLinecap="round"
                    d="M12 2v1m0 18v1m10-10h-1M3 12H2m17.07-7.07l-.392.393M5.322 18.678l-.393.393m14.141-.001l-.392-.393M5.322 5.322l-.393-.393"
                  ></path>
                </g>
              </svg>
            </button>
          </li>
          <li className="box-border hidden list-none whitespace-nowrap text-medium data-[active=true]:font-semibold data-[active=true]:text-primary lg:flex">
            <button
              className="group relative z-0 box-border inline-flex h-10 w-10 min-w-10 select-none appearance-none items-center justify-center !gap-0 gap-2 overflow-hidden whitespace-nowrap rounded-full bg-transparent px-0 text-small font-normal text-default-foreground subpixel-antialiased outline-none tap-highlight-transparent transition-transform-colors-opacity data-[focus-visible=true]:z-10 data-[pressed=true]:scale-[0.97] data-[hover=true]:bg-default/40 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus motion-reduce:transition-none"
              type="button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="iconify iconify--solar text-default-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M13.765 2.152C13.398 2 12.932 2 12 2c-.932 0-1.398 0-1.765.152a2 2 0 0 0-1.083 1.083c-.092.223-.129.484-.143.863a1.617 1.617 0 0 1-.79 1.353a1.617 1.617 0 0 1-1.567.008c-.336-.178-.579-.276-.82-.308a2 2 0 0 0-1.478.396C4.04 5.79 3.806 6.193 3.34 7c-.466.807-.7 1.21-.751 1.605a2 2 0 0 0 .396 1.479c.148.192.355.353.676.555c.473.297.777.803.777 1.361c0 .558-.304 1.064-.777 1.36c-.321.203-.529.364-.676.556a2 2 0 0 0-.396 1.479c.052.394.285.798.75 1.605c.467.807.7 1.21 1.015 1.453a2 2 0 0 0 1.479.396c.24-.032.483-.13.819-.308a1.617 1.617 0 0 1 1.567.008c.483.28.77.795.79 1.353c.014.38.05.64.143.863a2 2 0 0 0 1.083 1.083C10.602 22 11.068 22 12 22c.932 0 1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083c.092-.223.129-.483.143-.863c.02-.558.307-1.074.79-1.353a1.617 1.617 0 0 1 1.567-.008c.336.178.579.276.819.308a2 2 0 0 0 1.479-.396c.315-.242.548-.646 1.014-1.453c.466-.807.7-1.21.751-1.605a2 2 0 0 0-.396-1.479c-.148-.192-.355-.353-.676-.555A1.617 1.617 0 0 1 19.562 12c0-.558.304-1.064.777-1.36c.321-.203.529-.364.676-.556a2 2 0 0 0 .396-1.479c-.052-.394-.285-.798-.75-1.605c-.467-.807-.7-1.21-1.015-1.453a2 2 0 0 0-1.479-.396c-.24.032-.483.13-.82.308a1.617 1.617 0 0 1-1.566-.008a1.617 1.617 0 0 1-.79-1.353c-.014-.38-.05-.64-.143-.863a2 2 0 0 0-1.083-1.083Z"></path>
                </g>
              </svg>
            </button>
          </li>
          <li className="box-border flex list-none whitespace-nowrap text-medium data-[active=true]:font-semibold data-[active=true]:text-primary">
            <button
              className="group relative z-10 box-border inline-flex h-10 w-10 min-w-10 select-none appearance-none items-center justify-center !gap-0 gap-2 overflow-visible whitespace-nowrap rounded-full bg-transparent px-0 text-small font-normal text-default-foreground subpixel-antialiased outline-none tap-highlight-transparent transition-transform-colors-opacity aria-expanded:scale-[0.97] aria-expanded:opacity-70 data-[focus-visible=true]:z-10 data-[pressed=true]:scale-[0.97] data-[hover=true]:bg-default/40 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus motion-reduce:transition-none"
              type="button"
              data-slot="trigger"
              aria-expanded="false"
            >
              <div className="relative inline-flex shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  className="iconify iconify--solar text-default-500"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18.75 9.71v-.705C18.75 5.136 15.726 2 12 2S5.25 5.136 5.25 9.005v.705a4.4 4.4 0 0 1-.692 2.375L3.45 13.81c-1.011 1.575-.239 3.716 1.52 4.214a25.775 25.775 0 0 0 14.06 0c1.759-.498 2.531-2.639 1.52-4.213l-1.108-1.725a4.4 4.4 0 0 1-.693-2.375Z"></path>
                    <path
                      strokeLinecap="round"
                      d="M7.5 19c.655 1.748 2.422 3 4.5 3s3.845-1.252 4.5-3"
                    ></path>
                  </g>
                </svg>
                <span className="font-regular absolute right-[5%] top-[5%] z-10 box-border flex h-5 min-h-5 w-5 min-w-5 origin-center -translate-y-1/2 translate-x-1/2 scale-100 select-none flex-wrap place-content-center items-center whitespace-nowrap rounded-full border-0 border-transparent bg-danger px-0 text-small text-danger-foreground subpixel-antialiased opacity-100 !duration-300 !ease-soft-spring transition-transform-opacity data-[invisible=true]:scale-0 data-[invisible=true]:opacity-0">
                  5
                </span>
              </div>
            </button>
          </li>
          <li className="box-border list-none whitespace-nowrap px-2 text-medium data-[active=true]:font-semibold data-[active=true]:text-primary">
            <button
              className="z-10 h-10 w-8 subpixel-antialiased transition-transform aria-expanded:scale-[0.97] aria-expanded:opacity-70"
              data-slot="trigger"
              aria-haspopup="true"
              aria-expanded="false"
              id="react-aria4068106936-:r7:"
              type="button"
            >
              <div className="relative inline-flex shrink-0">
                <span className="relative z-0 box-border flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-default align-middle text-tiny text-default-foreground outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-focus">
                  <Image
                    src="/favicon.ico"
                    className="flex h-full w-full object-cover opacity-0 transition-opacity !duration-500 data-[loaded=true]:opacity-100"
                    alt="avatar"
                    data-loaded="true"
                    width={100}
                    height={10}
                  />
                </span>
                <span className="font-regular absolute bottom-[10%] right-[10%] z-10 box-border flex h-3.5 min-h-3.5 w-3.5 min-w-3.5 origin-center translate-x-1/2 translate-y-1/2 scale-100 select-none flex-wrap place-content-center items-center whitespace-nowrap rounded-full border-2 border-background bg-success px-1 text-small text-success-foreground subpixel-antialiased opacity-100 !duration-300 !ease-soft-spring transition-transform-opacity data-[invisible=true]:scale-0 data-[invisible=true]:opacity-0"></span>
              </div>
            </button>
          </li>
        </ul>
      </header>
    </nav>
  );
};

export default Navbar;
