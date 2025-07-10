"use client"

import SectionHeader from "./section-header"
import ImageCard from "./image-card"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"



export default function MidSect() {
  const{t}=useTranslation();
  const services = [
  {
    iconSrc: "/Icons/RevonateHome.png",
    label: t('services.Renovate-Your-Home'),
    link: "/Ask?type=home-renovate",
  },
  {
    iconSrc: "/Icons/kitchen.png",
    label:  t('services.Kitchen-remodeling'),
    link: "/Ask?type=kitchen",
  },
  {
    iconSrc: "/Icons/AskTechnichal.png",
    label:  t('services.Ask-to-Technical'),
    link: "/Ask?type=worker",
  },
  {
    iconSrc: "/Icons/FurnishHome.png",
    label:  t('services.Furnish-your-home'),
    link: "/Ask?type=furnish-house",
  },
  {
    iconSrc: "/Icons/RequestDesign.png",
    label:  t('services.Request-design'),
    link: "/Ask?type=request-design",
  },
  {
    iconSrc: "/Icons/AskEngineer.png",
    label:  t('services.Ask-to-Engineer'),
    link: "/Ask?type=engineer",
  },
  {
    iconSrc: "/Icons/ShopNow.png",
    label:  t('services.Shop-now'),
    link: "/Ask?type=shop",
  },
]
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredService, setHoveredService] = useState<number | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])
  return (
    <main className="max-w-[90rem] mx-auto px-4 py-8">
      <div
        className={`mb-16 transition-all duration-1000 delay-200 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{t('services.Services')}</h2>
          <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors"> {t('services.See-all')}</button>
        </div>

        {/* Updated responsive grid: 4 on lg, 3 on md, 2 on smaller screens */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 mb-8">
          {services.map((service, index) => (
            <Link key={index} to={service?.link}>
              <div
                className={`flex flex-col items-center text-center group cursor-pointer transition-all duration-500 hover:scale-105 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
                onMouseEnter={() => setHoveredService(index)}
                onMouseLeave={() => setHoveredService(null)}
              >
                <div
                  className={`w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 p-3 ${
                    hoveredService === index ? "bg-blue-100 scale-110" : ""
                  }`}
                >
                  <img
                    src={service.iconSrc }
                    alt={service.label}
                    width={40}
                    height={40}
                    className="w-full h-full object-contain transition-all duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                  {service.label}
                </h3>
               
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* More reasons to shop section */}
        <div className="md:col-span-1 flex flex-col h-full bg-white p-4">
          <SectionHeader text={t('MidSection.More-reasons')} />
          <div className="grid grid-cols-2 gap-4 flex-grow">
            <ImageCard imageSrc="/ProductImages/prod4.png" bgColor="bg-green-100" />
            <ImageCard imageSrc="/ProductImages/prod5.png" bgColor="bg-yellow-100" />
            <ImageCard imageSrc="/ProductImages/prod6.png" bgColor="bg-red-50" />
            <ImageCard imageSrc="/ProductImages/prod7.png" bgColor="bg-yellow-100" />
          </div>
        </div>

        {/* Mega deals section */}
        <div className="md:col-span-1 bg-purple-200 p-4 flex flex-col h-full">
          <SectionHeader text={t('MidSection.Mega-deals')} />
          <div className="grid grid-cols-2 gap-4 flex-grow">
            <ImageCard imageSrc="/ProductImages/prod8.png" badgeText={t('MidSection.Fashion-deals')}  />
            <ImageCard imageSrc="/ProductImages/prod9.png" badgeText={t('MidSection.Gaming-deals')} />
            <ImageCard imageSrc="/ProductImages/prod10.png" badgeText={t('MidSection.Baby-deals')}  />
            <ImageCard imageSrc="/ProductImages/prod11.png" badgeText={t('MidSection.Stationery-deals')}  />
          </div>
        </div>

        {/* In focus section */}
        <div className="md:col-span-1 flex flex-col h-full bg-white p-4">
          <SectionHeader text={t('MidSection.In focus')}/>
          <div className="flex flex-col gap-4 flex-grow">
            <ImageCard imageSrc="/ProductImages/prod2.jpg" bgColor="bg-blue-50" fullHeight style="w-full" />
            <ImageCard imageSrc="/ProductImages/prod3.jpg" bgColor="bg-red-50" fullHeight style="w-full" />
          </div>
        </div>
      </div>
    </main>
  )
}
