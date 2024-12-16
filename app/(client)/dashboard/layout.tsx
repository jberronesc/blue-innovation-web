import { signOut } from "@/auth";
import Sidebar from "./(overview)/components/Sidebar";
import Navbar from "./(overview)/components/Navbar";
import { ToastContainer } from "react-toastify";
import { SpinerScreen, SpinerTop } from "@component/spiner";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const exit = async () => {
    "use server";
    await signOut();
  };

  return (
    <>
      <SpinerScreen />
      <SpinerTop />

      <div className="flex h-screen">
        <Sidebar exit={exit} />
        <main className="h-screen flex-1">
          <Navbar />

          <div>{children}</div>
        </main>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        limit={3}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
