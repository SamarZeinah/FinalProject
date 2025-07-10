"use client"

import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

// Furniture category data structure
interface CategoryProducts {
  id: number
  name: string
  image: string
}


export default function CategoryProducts() {
  const{t}=useTranslation()
// Furniture categories data
const categories: CategoryProducts[] = [
  {
    id: 1,
    name: t('Category-products.Desks-chairs'),
    image: "/ProductImages/prod4.png",
  },
  {
    id: 2,
    name: t('Category-products.TV-units'),
    image: "/ProductImages/prod7.png",
  },
  {
    id: 3,
    name:  t('Category-products.Bean-bags'),
    image: "/ProductImages/prod8.png",
  },
  {
    id: 4,
    name:  t('Category-products.Accent-furniture'),
    image: "/ProductImages/prod9.png",
  },
  {
    id: 5,
    name: t('Category-products.Bedroom-furniture'),
    image: "/ProductImages/prod10.png",
  },
  {
    id: 6,
    name:  t('Category-products.Coffee-side-tables'),
    image: "/ProductImages/prod11.png",
  },
  {
    id: 7,
    name: t('Category-products.Sofas-chairs'),
    image: "/ProductImages/prod12.png",
  },
]
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  return (
    <div className=" mx-auto px-2 py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-800">{t('Category-products.Furniture')}</h2>
    <Link
            to="/Ask?type=shop"
            className="border border-gray-800 px-6 py-2 text-gray-800 hover:bg-gray-800 hover:text-white transition-colors duration-300"
          >
           {t('Category-products.SHOP-ALL')}
          </Link>
      </div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {categories.map((category) => (
          <motion.div
            key={category.id}
            className="cursor-pointer group"
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.2 },
            }}
          >
            <div className="rounded-lg overflow-hidden mb-3 bg-gray-100">
              <div className="w-full h-48 relative">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </div>
            </div>
            <h3 className="text-gray-800 font-semibold text-xl text-center sm:text-left">{category.name}</h3>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
