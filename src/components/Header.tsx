import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  //home,create story,explore story, contact us
  const menuList = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Create Story",
      href: "/create",
    },
    {
      name: "Explore Story",
      href: "/explore",
    },
    {
      name: "Contact Us",
      href: "/contact",
    },
  ];
  return (
    <>
      <header className="flex h-16 items-center container mx-auto ">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Logo" width={40} height={40} />
            <h1 className="text-xl font-semibold">Stories Generator</h1>
          </Link>
        </div>
        <div className="flex gap-4 items-center ml-auto">
          <nav className="flex  gap-4">
            {menuList.map(menu => (
              <Link
                key={menu.name}
                href={menu.href}
                className="text-sm font-semibold text-gray-600 hover:text-gray-800"
              >
                {menu.name}
              </Link>
            ))}
          </nav>

          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({
                variant: "default",
                className: "bg-violet-600",
              })
            )}
          >
            Get Started
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
