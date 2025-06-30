import { UserContext } from "@/Contexts/UserContext"
import { IProductById } from "@/interfaces"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useContext } from "react"
import { useTranslation } from "react-i18next"

export default function useProductById(productId:number) {
const{i18n}=useTranslation()
    const userContext = useContext(UserContext)
    if (!userContext) {
      throw new Error("UserContext must be used within a UserContextProvider")
    }
    const { pathUrl ,userToken} = userContext

      function getProduct() {
        return axios.get(`${pathUrl}/api/v1/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
            "Accept-Language": i18n.language,

          },
        })
      }
    
      const {
        data: response,
        isLoading,
        error,isError
      } = useQuery({
        queryKey: ["getProductById", productId,i18n.language],
        queryFn: getProduct,
      })
  const product = response?.data?.data as IProductById | undefined

  return { product, isLoading, error , isError };
}
