"use client"

import type React from "react"

import { ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ErrorMessage } from "../product-form"
import type { FormikErrors, FormikTouched } from "formik"
import { Label } from "@/components/ui/label"
import { useProductData } from "@/lib/product-data"
import { IBusinessType } from "@/interfaces"
import { useTranslation } from "react-i18next"

interface ProductBasicInfoProps {
  values: {
    businessType: string
    productNameEn: string
    productNameAr: string
    price: string
    baseUnit: string
    descriptionEn: string
    descriptionAr: string
  }
  errors: FormikErrors<ProductBasicInfoProps["values"]>
  touched: FormikTouched<ProductBasicInfoProps["values"]>
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  setFieldValue: (field: string, value: string | number, shouldValidate?: boolean) => void
}

export default function ProductBasicInfo({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
}: ProductBasicInfoProps) {
  const { data,businessTypes } = useProductData()
const{t}=useTranslation()
  return (
    <>
      {/* Category Select */}
      <div className="space-y-2">
        <Label htmlFor="businessType">{t("Product-basic-info.Business-Type")}</Label>
        <div className="relative">
          <Select value={values.businessType} onValueChange={(value) => setFieldValue("businessType", value)}>
            <SelectTrigger
              id="businessType"
              name="businessType"
              className={`w-full border-[#e5e7eb] ${errors.businessType && touched.businessType ? "border-red-500" : ""}`}
            >
              <SelectValue placeholder={t("Product-basic-info.Select-business-type")} />
            </SelectTrigger>
            <SelectContent>
              {businessTypes?.map((type:IBusinessType) => (
                <SelectItem key={type.id} value={type.code}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronDown className="h-4 w-4 opacity-50" />
          </div>
        </div>
        {errors.businessType && touched.businessType && <ErrorMessage message={errors.businessType} />}
      </div>

      {/* Product Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="productNameEn">{t("Product-basic-info.Product-Name-(English)")} </Label>
          <Input
            id="productNameEn"
            name="productNameEn"
            placeholder={t("Product-basic-info.Product-Name-En")} 
            className={`border-[#e5e7eb] ${errors.productNameEn && touched.productNameEn ? "border-red-500" : ""}`}
            value={values.productNameEn}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.productNameEn && touched.productNameEn && <ErrorMessage message={errors.productNameEn} />}
        </div>

        <div className="space-y-2">
          <Label htmlFor="productNameAr">{t("Product-basic-info.Product-Name-(Arabic)")} </Label>
          <Input
            id="productNameAr"
            name="productNameAr"
            placeholder={t("Product-basic-info.Product-Name-Ar")} 
            dir="rtl"
            className={`border-[#e5e7eb] ${errors.productNameAr && touched.productNameAr ? "border-red-500" : ""}`}
            value={values.productNameAr}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.productNameAr && touched.productNameAr && <ErrorMessage message={errors.productNameAr} />}
        </div>
      </div>

      {/* Price and Base Unit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">{t("Product-basic-info.Price")} </Label>
          <Input
            id="price"
            name="price"
            type="text"
            placeholder={t("Product-basic-info.Price")}
            className={`border-[#e5e7eb] ${errors.price && touched.price ? "border-red-500" : ""}`}
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.price && touched.price && <ErrorMessage message={errors.price} />}
        </div>

        <div className="space-y-2">
          <Label htmlFor="baseUnit">{t("Product-basic-info.Base-Unit")}</Label>
          <div className="relative">
            <Select value={values.baseUnit} onValueChange={(value) => setFieldValue("baseUnit", value)}>
              <SelectTrigger
                id="baseUnit"
                name="baseUnit"
                className={`w-full border-[#e5e7eb] ${errors.baseUnit && touched.baseUnit ? "border-red-500" : ""}`}
              >
                <SelectValue placeholder={t("Product-basic-info.Base-unit-placeholder")}/>
              </SelectTrigger>
              <SelectContent>
                {data?.productBaseUnits.map((unit) => (
                  <SelectItem key={unit.id} value={unit.code}>
                    {unit.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="h-4 w-4 opacity-50" />
            </div>
          </div>
          {errors.baseUnit && touched.baseUnit && <ErrorMessage message={errors.baseUnit} />}
        </div>
      </div>

      {/* Description Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="descriptionEn">{t("Product-basic-info.Description-(English)")}</Label>
          <Textarea
            id="descriptionEn"
            name="descriptionEn"
            placeholder={t("Product-basic-info.Product-Description-En")}
            className={`min-h-[100px] border-[#e5e7eb] ${errors.descriptionEn && touched.descriptionEn ? "border-red-500" : ""}`}
            value={values.descriptionEn}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.descriptionEn && touched.descriptionEn && <ErrorMessage message={errors.descriptionEn} />}
        </div>

        <div className="space-y-2">
          <Label htmlFor="descriptionAr">{t("Product-basic-info.Description-(Arabic)")}</Label>
          <Textarea
            id="descriptionAr"
            name="descriptionAr"
            placeholder={t("Product-basic-info.Product-Description-Ar")}
            dir="rtl"
            className={`min-h-[100px] border-[#e5e7eb] ${errors.descriptionAr && touched.descriptionAr ? "border-red-500" : ""}`}
            value={values.descriptionAr}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.descriptionAr && touched.descriptionAr && <ErrorMessage message={errors.descriptionAr} />}
        </div>
      </div>
    </>
  )
}

