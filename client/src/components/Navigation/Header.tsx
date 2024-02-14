"use client";

import Link from "next/link";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import ThemeSwitcher from "../Theme/ThemeSwither";

const clash = localFont({
  src: "../../fonts/ClashDisplay-Variable.ttf",
  variable: "--font-clash",
  display: "swap",
});

function Header() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("auth-token");
    router.push("/login");
  };
  return (
    <nav className="sticky h-16 inset-x-0 top-0 z-30 w-full border-b backdrop-blur-lg transition-all">
      <div className="mx-auto w-full max-w-screen-xl px-2.5 md:px-20">
        <div className="md:px-10 px-2.5">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex z-40 font-semibold items-center gap-2"
            >
              <div className={cn(clash.className, "text-xl space-x-1")}>
                <span>Anchit Sinha</span>
                <span className="text-primary">.</span>
              </div>
            </Link>
            <div className="hidden items-center space-x-4 sm:flex"></div>
            <div className="flex justify-center items-center flex-row space-x-4">
              <button
                className="group mx-auto flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black font-default dark:bg-white dark:text-black dark:hover:bg-stone-800 dark:hover:text-white"
                onClick={logout}
              >
                <p>Log Out</p>
              </button>
              <div className="hidden sm:block">
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
