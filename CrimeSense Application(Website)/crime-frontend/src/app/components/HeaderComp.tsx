// "use client";

// import CloseIcon from "@mui/icons-material/Close";
// import ExpandLessIcon from "@mui/icons-material/ExpandLess";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import MenuIcon from "@mui/icons-material/Menu";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";

// import { Button } from "./Button";
// import TextView from "./TextView";

// const DropdownMenu = ({
//   title,
//   items,
//   wide = false,
// }: {
//   title: string;
//   items?: {
//     category: string;
//     links: { label: string; href: string; text: string; icon: any }[];
//   }[];
//   wide?: boolean;
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement | null>(null);
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleDropdown = () => {
//     setIsOpen((prev) => !prev);
//   };
//   const closeDropdown = () => {
//     setIsOpen(false);
//   };

//   return (
//     <div ref={dropdownRef} style={{ position: "relative" }}>
//       <div
//         onClick={toggleDropdown}
//         className={`flex cursor-pointer hover:text-[#4B8F72] ${
//           isOpen ? "text-[#4B8F72]" : ""
//         }`}
//         style={{ gap: "4px" }}
//       >
//         {title}
//       </div>
//       {isOpen && items && (
//         <Box
//           className="menudrop"
//           style={{ border: "1px solid #d9d9d9" }}
//           sx={{
//             // width: wide ? '700%' : '400%',
//             // height: 'adaptive',
//             maxWidth: wide ? "none" : "auto",
//             minWidth: "200px",
//             background: "#ffffff",
//             position: "absolute",
//             top: "45px",
//             left: "0",
//             display: "grid",
//             gridTemplateColumns: wide ? "1fr 1fr" : "1fr",
//             // flexDirection: 'row',
//             boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//             padding: "16px",
//             borderRadius: "8px",
//             gap: 2,
//           }}
//         >
//           {items?.map((item, index) => (
//             <div key={index}>
//               <h3
//                 className={`mb-4 font-semibold ${
//                   item.category === "Monitoring"
//                     ? "text-[#7C25FF]"
//                     : item.category === "Underwriting"
//                     ? "text-[#3370FF]"
//                     : ""
//                 }`}
//                 style={{ textTransform: "uppercase" }}
//               >
//                 {item.category}
//               </h3>
//               {item.links.map((link, linkIndex) => (
//                 <Link
//                   key={linkIndex}
//                   href={link.href}
//                   className="mb-4 block rounded px-3 py-2 text-gray-600 hover:bg-[#0000000A]"
//                   onClick={closeDropdown}
//                 >
//                   <div className="flex flex-col gap-0.5 p-1 font-medium text-[#000000]">
//                     <div className="flex flex-row gap-2">
//                       {link.icon}
//                       <span className="font-bold">{link.label}</span>
//                     </div>
//                     <span className="pl-8 text-sm font-normal">
//                       {link.text}
//                     </span>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           ))}
//         </Box>
//       )}
//     </div>
//   );
// };

// function MobileNavigation() {
//   const [open, setOpen] = useState(false);
//   const toggleDrawer = (openState: boolean) => {
//     setOpen(openState);
//   };

//   const menuList = (
//     <Box
//       sx={{ width: "100vw", p: 2 }}
//       role="presentation"
//       onClick={() => toggleDrawer(false)}
//       onKeyDown={() => toggleDrawer(false)}
//     >
//       <List>
//         <Box className="flex items-center justify-between">
//           <>hii</>
//           <Box
//             onClick={() => toggleDrawer(false)}
//             className="hover:cursor-pointer"
//           >
//             <CloseIcon />
//           </Box>
//         </Box>

//         <Box
//           sx={{
//             justifyContent: "space-evenly",
//             display: "flex",
//             flexDirection: "column",
//             gap: 1,
//             my: 2,
//           }}
//         >
//           <TextView text={"ABOUT"} />
//           <Link
//             href={"/about"}
//             className="flex items-center gap-3 hover:bg-[#0000000A]"
//           ></Link>
//         </Box>

//         <TextView text={"Contact"} />
//         <Link href={"/contact"} className="flex items-center gap-3"></Link>
//         <Box
//           sx={{
//             justifyContent: "space-evenly",
//             display: "flex",
//             flexDirection: "column",
//             gap: 1,
//             my: 2,
//           }}
//         ></Box>
//       </List>
//     </Box>
//   );

//   return (
//     <div className="flex flex-row gap-2">
//       <div></div>
//       <div className="flex justify-center pt-2 hover:cursor-pointer">
//         <Box>
//           <MenuIcon onClick={() => toggleDrawer(true)} />
//         </Box>
//       </div>
//     </div>
//   );
// }

// const HeaderCSR = () => {
//   return (
//     <nav className="relative flex items-center justify-between bg-white">
//       <Box sx={{ display: { xs: "none", md: "flex" } }} style={{ gap: "16px" }}>
//         <DropdownMenu title="About" wide={true} />
//         <DropdownMenu title="Predict" wide={false} />
//         <DropdownMenu title="Contact" wide={false} />
//       </Box>

//       <Box sx={{ display: { xs: "block", md: "none" } }}>
//         <MobileNavigation />
//       </Box>
//     </nav>
//   );
// };

// export default HeaderCSR;


"use client";

import { useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import TextView from "./TextView";

const MobileNavigation = () => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (state: boolean) => setOpen(state);

  return (
    <>
      <MenuIcon
        onClick={() => toggleDrawer(true)}
        className="text-3xl text-gray-700 hover:text-green-600 cursor-pointer transition-colors duration-200"
      />
      <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}>
        <Box sx={{ width: 250, p: 2 }} role="presentation">
          <div className="flex justify-between items-center mb-4">
            <TextView text="Menu" fontWeight="medium" variant="text-xl" />
            <CloseIcon
              onClick={() => toggleDrawer(false)}
              className="cursor-pointer text-gray-700 hover:text-green-600 transition-colors duration-200"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Link
              href="/about"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="/predict"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors duration-200"
            >
              Predict
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors duration-200"
            >
              Contact
            </Link>
          </div>
        </Box>
      </Drawer>
    </>
  );
};

const HeaderCSR = () => {
  return (
    <nav className="w-full bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          {/* <Link href="/" className="text-2xl font-bold text-green-800">
            Crime Sense
          </Link> */}

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-12">
            <Link
              href="/about"
              className="text-lg font-medium text-gray-700 hover:text-green-600 transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="/predict"
              className="text-lg font-medium text-gray-700 hover:text-green-600 transition-colors duration-200"
            >
              Predict
            </Link>
            <Link
              href="/contact"
              className="text-lg font-medium text-gray-700 hover:text-green-600 transition-colors duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <MobileNavigation />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderCSR;
