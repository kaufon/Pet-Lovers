"use client";
import React from "react";
import {
  HandPlatter,
  House,
  NotebookTabs,
  PawPrint,
  ShoppingBasket,
  Menu,
} from "lucide-react";
import {
  Navbar as NavBarRoot,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import { Drawer } from "../drawer";

export const NavBar = () => {
  return (
    <NavBarRoot className="bg-white md:bg-sky-200  shadow-none md:shadow">
      <NavbarContent className="hidden md:flex justify-center text-black gap-8">
        <NavbarItem
          as={Link}
          href="/"
          className="font-black text-3xl flex flex-row items-center gap-2"
        >
          <House />
          Home
        </NavbarItem>
        <NavbarItem
          as={Link}
          href="/products"
          className="font-black text-3xl flex flex-row items-center gap-2"
        >
          <ShoppingBasket />
          Produtos
        </NavbarItem>
        <NavbarItem
          as={Link}
          href="/services"
          className="font-black text-3xl flex flex-row items-center gap-2"
        >
          <HandPlatter />
          Serviços
        </NavbarItem>
        <NavbarItem
          as={Link}
          href="/lists"
          className="font-black text-3xl flex flex-row items-center gap-2"
        >
          <NotebookTabs />
          Listagens
        </NavbarItem>
      </NavbarContent>
      <div className="flex md:hidden items-center">
        <Drawer
          trigger={
            <button className="p-2">
              <Menu size={24} />
            </button>
          }
          direction="left"
          zIndex={1000}
        >
          {(closeDrawer) => (
            <div className="flex flex-col p-4 text-black space-y-4">
              <NavbarItem
                as={Link}
                href="/"
                className="font-black text-2xl flex items-center gap-2"
                onClick={closeDrawer}
              >
                <House />
                Home
              </NavbarItem>
              <NavbarItem
                as={Link}
                href="/pets"
                className="font-black text-2xl flex items-center gap-2"
                onClick={closeDrawer}
              >
                <PawPrint />
                Pets
              </NavbarItem>
              <NavbarItem
                as={Link}
                href="/products"
                className="font-black text-2xl flex items-center gap-2"
                onClick={closeDrawer}
              >
                <ShoppingBasket />
                Produtos
              </NavbarItem>
              <NavbarItem
                as={Link}
                href="/services"
                className="font-black text-2xl flex items-center gap-2"
                onClick={closeDrawer}
              >
                <HandPlatter />
                Serviços
              </NavbarItem>
              <NavbarItem
                as={Link}
                href="/lists"
                className="font-black text-2xl flex items-center gap-2"
                onClick={closeDrawer}
              >
                <NotebookTabs />
                Listagens
              </NavbarItem>
            </div>
          )}
        </Drawer>
      </div>
    </NavBarRoot>
  );
};
