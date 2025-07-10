// "use client";

// import { useContext, useEffect, useState } from "react";
// import { ChevronDown, List, Menu } from "lucide-react";
// import user from "/user.webp";
// import vector from "/Vector.png";

// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// import { Link } from "react-router-dom";
// import { UserContext } from "../Contexts/UserContext";
// import axios from "axios";
// import Logo from "/Logo.png";
// import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
// import { useTranslation } from "react-i18next";
// import { SimpleCartIcon } from "@/Pages/Cart/CartIcon"

// export default function Navbar() {
//   const { t } = useTranslation();
//   const userContext = useContext(UserContext);
//   if (!userContext) {
//     throw new Error("UserContext must be used within a UserContextProvider");
//   }
//   const { userToken, setUserToken, setUserId, setShowAddProject } = userContext;

//   function logout() {
//     setUserToken("");
//     setUserId(null);
//     localStorage.removeItem("userToken");
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("user-id");
//     localStorage.removeItem("user-type");
//         localStorage.removeItem("user-business")
//     localStorage.removeItem("user-business-id")
//   }

//   return (
//     <header
//       className={` sticky top-0 z-50 w-full border-b  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 `}
//     >
//       <div className="container flex h-16 items-center justify-between px-4 md:px-8">
//         <Link
//           to="/"
//           className="flex items-center gap-2 text-xl font-bold text-[#2D2D4C] md:text-2xl group"
//         >
//           <img src={Logo} alt="Logo" className=" h-14 w-30 " />
//           {/* <Home className="h-6 w-6 transition-transform duration-300 group-hover:rotate-[360deg]" /> */}
//         </Link>

//         {userToken && (
//           <nav className="hidden md:flex items-center space-x-6">
//             <Link
//               to="/"
//               className="text-base font-normal  leading-[23.52px] transition-colors hover:text-primary"
//             >
//               {t("Profile_Navbar.Home")}
//             </Link>
//             <Link
//               to="/products"
//               className="text-base font-normal  leading-[23.52px] transition-colors hover:text-primary"
//             >
//               {t("Profile_Navbar.Products")}
//             </Link>
//             <Link
//               to="/categories"
//               className="text-base font-normal  leading-[23.52px] transition-colors hover:text-primary"
//             >
//               {t("Profile_Navbar.Categories")}
//             </Link>
//             <Link
//               to="/brands"
//               className="text-base font-normal  leading-[23.52px] transition-colors hover:text-primary"
//             >
//               {t("Profile_Navbar.Brands")}
//             </Link>
//           </nav>
//         )}

//         <div
//           className={`flex items-center ml-auto  ${
//             userToken && " md:ml-0"
//           }  gap-4 `}
//         >
//           <div className="flex items-center gap-4">
//             {!userToken && (
//               <div className="hidden md:flex items-center gap-4">
//                 <JoinUsButton />
//                 <LoginButton />
//               </div>
//             )}
//             {!userToken && (
//               <div className="flex md:hidden items-center justify-center flex-grow gap-2 w-full max-w-[300px]">
//                 <JoinUsButton />
//                 <LoginButton />
//               </div>
//             )}

//             <Sheet>
//               <SheetTrigger asChild>
//                 <Button variant="ghost" size="icon" className="md:hidden">
//                   <Menu className="h-5 w-5" />
//                   <span className="sr-only">Toggle navigation menu</span>
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="left">
//                 {userToken && (
//                   <nav className="grid gap-4">
//                     <Link to="/" className="text-lg font-semibold">
//                       {t("Profile_Navbar.Home")}
//                     </Link>
//                     <Link to="/products" className="text-lg font-semibold">
//                       {t("Profile_Navbar.Products")}
//                     </Link>
//                     <Link to="/categories" className="text-lg font-semibold">
//                       {t("Profile_Navbar.Categories")}
//                     </Link>
//                     <Link to="/brands" className="text-lg font-semibold">
//                       {t("Profile_Navbar.Brands")}
//                     </Link>
                  
//       {/* new */}
//                     {/* Add Project/Product buttons in mobile menu */}
//                     {userToken &&
//                     (localStorage.getItem("user-type") === "engineer" ||
//                       localStorage.getItem("user-type") === "technical worker") ? (
//                       <Link to="/profile">
//                         <Button
//                           className="w-full text-[#2D2D4C] border border-[#2D2D4C] font-bold bg-white primary-grad hover:bg-gradient-to-r from-[#B8BCC5] to-[#F0ECE6] hover:opacity-90 transition-opacity duration-700 ease-in-out"
//                           onClick={() => setShowAddProject(true)}
//                         >
//                           Add Project
//                         </Button>
//                       </Link>
//                     ) : userToken &&
//                       (localStorage.getItem("user-type") === "store" ||
//                         localStorage.getItem("user-type") === "exhibition") ? (
//                       <div className="flex items-center gap-4">
//                         <Link to="/productlist">
//                           <Button className="text-[#2D2D4C]  font-bold bg-white primary-grad hover:bg-gradient-to-r from-[#B8BCC5] to-[#F0ECE6] hover:opacity-90 transition-opacity duration-700 ease-in-out rounded-xl">
//                             <List className="w-5 h-5" />
//                             Product List
//                           </Button>
//                         </Link>
//                         <Link to="/addproduct">
//                           <Button className="text-[#2D2D4C] border border-[#2D2D4C] font-bold bg-white hover:bg-gradient-to-r from-[#B8BCC5] to-[#F0ECE6] hover:opacity-90 transition-opacity duration-700 ease-in-out rounded-xl">
//                             <img src={vector || "/placeholder.svg"} alt="Logo" className="w-5 h-5" />
//                             Add Product
//                           </Button>
//                         </Link>
//                       </div>
//                     ) : null}
//   {/* new */}
//                     {/* Cart icon in mobile menu for general users */}
//                   </nav>
//                 )}
//               </SheetContent>
//             </Sheet>
//           </div>

//           {/* {userToken && (
//             <div className="hidden md:flex items-center gap-4">
//               <Link to="/upgrade">
//                 <Button className="text-[#2D2D4C] border border-[#2D2D4C] font-bold bg-white hover:bg-gradient-to-r from-[#B8BCC5] to-[#F0ECE6] hover:opacity-90 transition-opacity duration-700 ease-in-out">
//                   {t("Profile_Navbar.Upgrade_to_pro")}
//                 </Button>
//               </Link>
//             </div>
//           )} */}
//                                             {/* ..........................new ...........................*/}
//           {/* {userToken && (
//             <div className="hidden md:flex items-center gap-4">
//               <Link to="/profile">
//                 <Button
//                   className="text-[#2D2D4C] border border-[#2D2D4C] font-bold bg-white primary-grad hover:bg-gradient-to-r from-[#B8BCC5] to-[#F0ECE6] hover:opacity-90 transition-opacity duration-700 ease-in-out"
//                   onClick={() => setShowAddProject(true)}
//                 >
//                   {t("Profile_Navbar.Add_Project")}
//                 </Button>
//               </Link>
//             </div>
//           )} */}
//           {/* Modified to show on all screen sizes by removing "hidden md:flex" */}
//           {userToken &&
//           (localStorage.getItem("user-type") === "engineer" ||
//             localStorage.getItem("user-type") === "technical worker") ? (
//             <div className="hidden md:flex items-center gap-4">
//               <Link to="/profile">
//                 <Button
//                   className="text-[#2D2D4C] border-none font-bold bg-white primary-grad hover:bg-gradient-to-r from-[#B8BCC5] to-[#F0ECE6] hover:opacity-90 transition-opacity duration-700 ease-in-out"
//                   onClick={() => setShowAddProject(true)}
//                 >
//                   Add Project
//                 </Button>
//               </Link>
//             </div>
//           ) : userToken &&
//             (localStorage.getItem("user-type") === "store" ||
//               localStorage.getItem("user-type") === "exhibition") ? (
//             <div className="hidden md:flex items-center gap-4">
//               <Link to="/productlist">
//                 <Button className="text-[#2D2D4C] border-none ring-0 font-bold bg-white primary-grad hover:bg-gradient-to-r from-[#B8BCC5] to-[#F0ECE6] hover:opacity-90 transition-opacity duration-700 ease-in-out rounded-xl">
//                   <List className="w-5 h-5" />
//                   Product List
//                 </Button>
//               </Link>
//               <Link to="/addproduct">
//                 <Button className="text-[#2D2D4C] border border-[#2D2D4C] font-bold bg-white hover:bg-gradient-to-r from-[#B8BCC5] to-[#F0ECE6] hover:opacity-90 transition-opacity duration-700 ease-in-out rounded-xl">
//                   <img src={vector} alt="Logo" className="w-5 h-5" /> 
//                   Add Product
//                 </Button>
//               </Link>
//             </div>
//           ) : null}
//                                             {/* ..........................new ...........................*/}


//           {/* Cart Icon - Show only for general users when authenticated */}
//           {userToken && localStorage.getItem("user-type") === "general user" && <SimpleCartIcon size="lg" />}

//           {userToken && (
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="icon" className="rounded-full">
//                   <img
//                     alt="Avatar"
//                     className="rounded-full w-8 h-8"
//                     height="32"
//                     src={user}
//                     style={{
//                       aspectRatio: "1 / 1",
//                       objectFit: "cover",
//                     }}
//                     width="32"
//                   />
//                   <span className="sr-only">Toggle user menu</span>
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuItem className=" p-0  ">
//                   <Link to="/profile" className="flex w-full p-1 ">
//                     {t("Navbar.Profile")}
//                   </Link>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem className=" p-0  ">
//                   <Link
//                     to="/client"
//                     className="flex w-full p-1 "
//                     onClick={logout}
//                   >
//                     {t("Navbar.Logout")}
//                   </Link>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           )}

//           <LanguageSwitcher />
//         </div>
//       </div>
//     </header>
//   );
// }

// function LoginButton() {
//   const { t } = useTranslation();
//   return (
//     <Link
//       to={"/client"}
//       className="primary-grad  rounded-[8px] px-10  py-2 btn text-base font-bold leading-6 text-center"
//     >
//       {t("Navbar.Login_btn")}
//     </Link>
//   );
// }

// interface IUserTypes {
//   id: number;
//   code: string;
//   name: string;
// }

// function JoinUsButton() {
//   const { t, i18n } = useTranslation();
//   const userContext = useContext(UserContext);

//   if (!userContext) {
//     throw new Error("UserContext must be used within a UserContextProvider");
//   }
//   const { pathUrl } = userContext;

//   const [isOpen, setIsOpen] = useState(false);
//   const [userTypes, setUserTypes] = useState<IUserTypes[]>([]);

//   // get All user types

//   useEffect(() => {
//     async function getUserTypes() {
//       try {
//         const { data } = await axios.get(`${pathUrl}/api/v1/user-types`, {
//           headers: { "Accept-Language": i18n.language },
//         });
//         setUserTypes(data.data);
//       } catch (error) {
//         console.error("Error fetching User Types:", error);
//       }
//     }
//     getUserTypes();
//   }, [pathUrl, i18n.language]);

//   return (
//     <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
//       <DropdownMenuTrigger asChild>
//         <Button className=" bg-transparent rounded-[8px]  px-4 py-2 btn text-base font-bold leading-6 text-center text-[#2D2D4C] hover:bg-gradient-to-r from-[#B8BCC5] to-[#F0ECE6] ">
//           {t("Navbar.JoinUs_btn")}
//           <ChevronDown
//             className={`ml-2 h-4 w-4 transition-transform duration-200 ${
//               isOpen ? "rotate-180" : ""
//             }`}
//           />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-[160px] animate-in slide-in-from-top-2 duration-200">
//         {userTypes.map((userType) => (
//           <Link to={`/Join-as/${userType.name}`} key={userType.id}>
//             <DropdownMenuItem className="cursor-pointer transition-colors hover:bg-secondary">
//               {userType.name}
//             </DropdownMenuItem>
//           </Link>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }


"use client"

import type React from "react"

import { useContext, useEffect, useState } from "react"
import { ChevronDown, List, Menu, Heart, User, Search } from "lucide-react"
import vector from "/Vector.png"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../Contexts/UserContext"
import axios from "axios"
import Logo from "/Logo.png"
import { SimpleCartIcon } from "@/Pages/Cart/CartIcon"
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function Navbar() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")

  const userContext = useContext(UserContext)
  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider")
  }
  const { userToken, setShowAddProject, logout } = userContext

  const userType = localStorage.getItem("user-type")
  const isEngineerOrTechnical = userType === "engineer" || userType === "technical worker"
  const isStoreOrExhibition = userType === "store" || userType === "exhibition"

  function handleLogout() {
    logout()
    navigate("/client")
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Handle search functionality here
      console.log("Searching for:", searchQuery)
      // You can navigate to search results page or trigger search
      // navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  // If user is not authenticated, show login/signup navbar
  if (!userToken) {
    return (
    
      <header className="sticky top-0 z-[9999] w-full border-b" style={{ backgroundColor: "#2D2D4C" }}>
        <div className="container flex h-16 items-center justify-between px-4 md:px-8">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white md:text-2xl group">
            <img src={Logo || "/placeholder.svg"} alt="Logo" className="h-14 w-30" />
          </Link>

          {/* Search Bar for Non-Authenticated Users */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="flex w-full">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-4 pr-12 rounded-l-lg border-0 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-white/20"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-0 top-0 h-10 px-3 rounded-r-lg bg-orange-500 hover:bg-orange-600 text-white border-0"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </div>

          <div className="flex items-center gap-4">
            {/* Desktop Login/Signup */}
            <div className="hidden md:flex items-center gap-4">
              <JoinUsButton />
              <div className="w-px h-6 bg-white/30"></div>
              <LoginButton />
            </div>

            {/* Mobile Login/Signup */}
            <div className="flex md:hidden items-center gap-2">
              <JoinUsButton />
              <LoginButton />
            </div>
          </div>
        </div>
      </header>
    )
  }

  // Unified authenticated navbar for all user types
  return (
    <header className="sticky top-0 z-50 w-full border-b" style={{ backgroundColor: "#2D2D4C" }}>
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white md:text-2xl group">
          <img src={Logo || "/placeholder.svg"} alt="Logo" className="h-14 w-30" />
        </Link>

        {/* Search Bar for Authenticated Users */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <form onSubmit={handleSearch} className="flex w-full">
            <div className="relative flex-1">
              <Input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-4 pr-12 rounded-l-lg border-0 bg-white text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-white/20"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-0 top-0 h-10 px-3 rounded-r-lg bg-orange-500 hover:bg-orange-600 text-white border-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>

        <div className="flex items-center gap-4">
          {/* Action Buttons for Different User Types */}
          {isEngineerOrTechnical && (
            <div className="hidden md:flex items-center gap-2">
              <Button
                className="text-white border border-white/30 font-bold bg-transparent hover:bg-white/10 transition-all duration-300 ease-in-out"
                onClick={() => setShowAddProject(true)}
              >
                Add Project
              </Button>
              <div className="w-px h-6 bg-white/30"></div>
            </div>
          )}

          {isStoreOrExhibition && (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/productlist">
                <Button className="text-white border border-white/30 font-bold bg-transparent hover:bg-white/10 transition-all duration-300 ease-in-out rounded-xl">
                  <List className="w-5 h-5" />
                  Product List
                </Button>
              </Link>
              <Link to="/addproduct">
                <Button className="text-white border border-white/30 font-bold bg-transparent hover:bg-white/10 transition-all duration-300 ease-in-out rounded-xl">
                  <img src={vector || "/placeholder.svg"} alt="Add Product" className="w-5 h-5" />
                  Add Product
                </Button>
              </Link>
              <div className="w-px h-6 bg-white/30"></div>
            </div>
          )}

          {/* Language Toggle */}
          {/* <button className="text-base font-normal leading-[23.52px] text-white hover:text-orange-300 transition-colors">
            العربية
          </button> */}
            <LanguageSwitcher />

          <div className="w-px h-6 bg-white/30"></div>

          {/* Common Features for All Users */}
          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="text-base font-normal leading-[23.52px] text-white hover:text-orange-300 transition-colors"
          >
            <Heart className="h-6 w-6" />
          </Link>

          <div className="w-px h-6 bg-white/30"></div>

          {/* Cart */}
          <div className="text-white">
            <SimpleCartIcon size="lg" />
          </div>

          <div className="w-px h-6 bg-white/30"></div>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-white/10">
                <User id="user-icon" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200">
              {/* Common Menu Items for All Users */}
              <DropdownMenuItem className="p-0">
                <Link to="/orders" className="flex w-full items-center gap-2 p-2 text-gray-700 hover:bg-gray-50">
                  <span>📦</span>
                  Orders
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <Link to="/addresses" className="flex w-full items-center gap-2 p-2 text-gray-700 hover:bg-gray-50">
                  <span>📍</span>
                  Addresses
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <Link to="/payments" className="flex w-full items-center gap-2 p-2 text-gray-700 hover:bg-gray-50">
                  <span>💳</span>
                  Payments
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <Link to="/credits" className="flex w-full items-center gap-2 p-2 text-gray-700 hover:bg-gray-50">
                  <span>💰</span>
                  Credits
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <Link to="/returns" className="flex w-full items-center gap-2 p-2 text-gray-700 hover:bg-gray-50">
                  <span>↩️</span>
                  Returns
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <Link to="/warranty" className="flex w-full items-center gap-2 p-2 text-gray-700 hover:bg-gray-50">
                  <span>🛡️</span>
                  Warranty Claims
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <Link to="/profile" className="flex w-full items-center gap-2 p-2 text-gray-700 hover:bg-gray-50">
                  <span>👤</span>
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <Link to="/help" className="flex w-full items-center gap-2 p-2 text-gray-700 hover:bg-gray-50">
                  <span>❓</span>
                  Need Help?
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="p-0">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 p-2 text-left text-gray-700 hover:bg-gray-50"
                >
                  <span>🚪</span>
                  Sign Out
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-white">
              <nav className="grid gap-4 mt-8">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="mb-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="What are you looking for?"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full h-10 pl-4 pr-12 rounded-lg border border-gray-300"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      className="absolute right-1 top-1 h-8 px-2 rounded bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </form>

                {/* Action Buttons for Mobile */}
                {isEngineerOrTechnical && (
                  <Button
                    className="w-full text-[#2D2D4C] border border-[#2D2D4C] font-bold bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out"
                    onClick={() => setShowAddProject(true)}
                  >
                    Add Project
                  </Button>
                )}

                {isStoreOrExhibition && (
                  <div className="flex flex-col gap-2">
                    <Link to="/productlist">
                      <Button className="w-full text-[#2D2D4C] border border-[#2D2D4C] font-bold bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out rounded-xl">
                        <List className="w-5 h-5 mr-2" />
                        Product List
                      </Button>
                    </Link>
                    <Link to="/addproduct">
                      <Button className="w-full text-[#2D2D4C] border border-[#2D2D4C] font-bold bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out rounded-xl">
                        <img src={vector || "/placeholder.svg"} alt="Add Product" className="w-5 h-5 mr-2" />
                        Add Product
                      </Button>
                    </Link>
                  </div>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

function LoginButton() {
  return (
    <Link
      to={"/client"}
      className="bg-orange-500 hover:bg-orange-600 text-white rounded-[8px] px-10 py-2 btn text-base font-bold leading-6 text-center transition-colors"
    >
      Login
    </Link>
  )
}

interface IUserTypes {
  id: number
  code: string
  name: string
}

function JoinUsButton() {
  const userContext = useContext(UserContext)

  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider")
  }
  const { pathUrl } = userContext

  const [isOpen, setIsOpen] = useState(false)
  const [userTypes, setUserTypes] = useState<IUserTypes[]>([])

  useEffect(() => {
    async function getUserTypes() {
      try {
        const { data } = await axios.get(`${pathUrl}/api/v1/user-types`, {
          headers: { "Accept-Language": "en" },
        })
        setUserTypes(data.data)
      } catch (error) {
        console.error("Error fetching User Types:", error)
      }
    }
    getUserTypes()
  }, [pathUrl])

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent border border-white/30 rounded-[8px] px-4 py-2 btn text-base font-bold leading-6 text-center text-white hover:bg-white/10 transition-colors">
          Join Us
          <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[160px] animate-in slide-in-from-top-2 duration-200 bg-white border border-gray-200">
        {userTypes.map((userType) => (
          <Link to={`/Join-as/${userType.name}`} key={userType.id}>
            <DropdownMenuItem className="cursor-pointer transition-colors hover:bg-gray-50 text-gray-700">
              {userType.name}
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
