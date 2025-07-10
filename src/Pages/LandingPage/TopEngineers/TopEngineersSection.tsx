"use client"

import EngineersContainer from "./EngineersContainer"
import type { Engineer } from "../LandingPage"
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";

interface TopEngineersSectionProps {
  engineers: Engineer[]
}

export default function TopEngineersSection({ engineers }: TopEngineersSectionProps) {
  // Don't render the section if there are no engineers
  if (!engineers || engineers.length === 0) {
    return null
  }
const{t}=useTranslation()
  return (
    <div className="mx-auto py-8 w-full">
      <div className="mb-8">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-black">{t('Top-Engineers.TOP')}</span>{" "}
          <span className="text-red-600">{t('Top-Engineers.ENGINEERS')}</span>
        </motion.h1>
      </div>

      <EngineersContainer engineers={engineers} />
    </div>
  );
}
