"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Disclosure } from "@headlessui/react";
import { MenuIcon,XIcon } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Predict", href: "/predict" },
];

export default function NavBar() {
  const path = usePathname();

  return (
    <Disclosure
      as="nav"
      className="fixed w-full z-50 bg-white/70 backdrop-blur-md shadow"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              {/* Brand */}
              <Link href="/" className="flex items-center">
                <span className="text-2xl font-extrabold text-indigo-600">
                  CrimeSense
                </span>
              </Link>

              {/* Desktop Links */}
              <div className="hidden md:flex md:space-x-4">
                {navigation.map((item) => {
                  const isActive = path === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-indigo-50 text-indigo-600"
                          : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              {/* CTA on desktop */}
              <div className="hidden md:flex md:items-center">
                <Link
                  href="/predict"
                  className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition"
                >
                  Predict Now
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                  <span className="sr-only">
                    {open ? "Close menu" : "Open menu"}
                  </span>
                  {open ? (
                    <XIcon className="block h-6 w-6" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Links Panel */}
          <Disclosure.Panel className="md:hidden bg-white/90 backdrop-blur-sm shadow-inner">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => {
                const isActive = path === item.href;
                return (
                  <Disclosure.Button
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      isActive
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                    }`}
                  >
                    {item.name}
                  </Disclosure.Button>
                );
              })}
              <div className="mt-3 px-3">
                <Link
                  href="/predict"
                  className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 transition"
                >
                  Predict Now
                </Link>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
