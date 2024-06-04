import Header from "@/components/Header";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster"

export default function Layout() {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <div className="flex-1 w-full container p-4">
          <Outlet />
        </div>
      </main>
      <Footer />
      <Toaster />
    </>
  );
}
