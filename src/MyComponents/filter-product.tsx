
import { Formik, Form, Field } from "formik";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "@/Contexts/UserContext";

interface FiltersProps {
  onApplyFilters: (filters: FilterValues) => void;
}

interface FilterValues {
  category?: string | null;
  color?: number[] | null;
  priceRange?: [number, number];
  businessId: number;
  businessTypeIds?: number[] | null;
}

type Color = {
  id: number;
  name: string;
};

type BusinessType = {
  id: number;
  name: string;
};

type DataResponse = {
  colors: Color[];
  businessTypes: BusinessType[];
};

type ApiResponse = {
  success: boolean;
  data: DataResponse;
};

const Filters: React.FC<FiltersProps> = ({ onApplyFilters }) => {
  const [business, setBusiness] = useState<DataResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const initialValues: FilterValues = {
    category: null,
    color: [],
    priceRange: [0, 5000],
    businessId: 18,
    businessTypeIds: [], // Initialize as an empty array
  };

  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }

  const { userToken, pathUrl } = userContext;

  const fetchBusiness = async () => {
    try {
      const response = await axios.get<ApiResponse>(`${pathUrl}/api/v1/business-config`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Accept-Language": "en",
        },
      });
      if (response.data.success) {
        setBusiness(response.data.data);
      } else {
        setError("Failed to fetch Business.");
      }
    } catch (error) {
      setError("Failed to fetch Business.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusiness();
  }, [pathUrl, userToken]);

  const handleSubmit = (values: FilterValues) => {
    const filters = {
      searchCriteria: {
        businessId: values.businessId,
        minPrice: values.priceRange ? values.priceRange[0] : null,
        maxPrice: values.priceRange ? values.priceRange[1] : null,
        colorsIds: values.color?.length ? values.color : null,
        businessTypeIds: values.businessTypeIds?.length ? values.businessTypeIds : null,
      },
    };

    console.log("Filters for backend:", JSON.stringify(filters, null, 2));
    onApplyFilters(filters);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-4">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, setFieldValue }) => (
          <Form>
            <details className="border rounded-md">
              <summary className="cursor-pointer p-2 w-full text-left">Filtration</summary>
              <div className="space-y-2 p-2">
                {/* Business Type Selection (Checkboxes) */}
                <div className="w-full border rounded-md p-2 max-h-32 overflow-y-auto">
                  <label className="block font-semibold mb-1">Category:</label>
                  <div className="grid grid-cols-3 gap-1">
                    {business?.businessTypes.map((type) => (
                      <div key={type.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`businessType-${type.id}`}
                          name="businessTypeIds"
                          value={type.id}
                          checked={(values.businessTypeIds ?? []).includes(type.id)}
                          onChange={(e) => {
                            const selectedTypes = values.businessTypeIds ? [...values.businessTypeIds] : [];
                            if (e.target.checked) {
                              selectedTypes.push(type.id);
                            } else {
                              const index = selectedTypes.indexOf(type.id);
                              if (index > -1) {
                                selectedTypes.splice(index, 1);
                              }
                            }
                            setFieldValue("businessTypeIds", selectedTypes);
                          }}
                          className="w-4 h-4"
                        />
                        <label htmlFor={`businessType-${type.id}`} className="text-sm">{type.name}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Color Selection (Checkboxes) */}
                <div className="w-full border rounded-md p-2 max-h-32 overflow-y-auto">
                  <label className="block font-semibold mb-1">Colors:</label>
                  <div className="grid grid-cols-3 gap-1">
                    {business?.colors.map((color) => (
                      <div key={color.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`color-${color.id}`}
                          name="color"
                          value={color.id}
                          checked={(values.color ?? []).includes(color.id)}
                          onChange={(e) => {
                            const selectedColors = values.color ? [...values.color] : [];
                            if (e.target.checked) {
                              selectedColors.push(color.id);
                            } else {
                              const index = selectedColors.indexOf(color.id);
                              if (index > -1) {
                                selectedColors.splice(index, 1);
                              }
                            }
                            setFieldValue("color", selectedColors);
                          }}
                          className="w-4 h-4"
                        />
                        <label htmlFor={`color-${color.id}`} className="text-sm">{color.name}</label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range Slider */}
                <div>
                  <input
                    type="range"
                    min="1000"
                    max="3000"
                    step="100"
                    value={values.priceRange ? values.priceRange[0] : 1000}
                    onChange={(e) =>
                      setFieldValue("priceRange", values.priceRange ? [+e.target.value, values.priceRange[1]] : [1000, 3000])
                    }
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="1000"
                    max="3000"
                    step="100"
                    value={values.priceRange ? values.priceRange[1] : 3000}
                    onChange={(e) =>
                      setFieldValue("priceRange", values.priceRange ? [values.priceRange[0], +e.target.value] : [1000, 3000])
                    }
                    className="w-full mt-2"
                  />
                  <p className="text-sm mt-2">
                    ${values.priceRange ? values.priceRange[0] : 1000} - ${values.priceRange ? values.priceRange[1] : 3000}
                  </p>
                </div>

                {/* Apply Filters Button */}
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                  Apply Filters
                </button>
              </div>
            </details>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Filters;
