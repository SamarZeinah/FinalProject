// Define the interfaces
interface Service {
  id: string;
  code: string;
  nameEn: string;
  nameAr: string;
}
interface AddServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (value: IUser) => void;
  userData: IUser | undefined;
}

import { useContext, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserContext } from "@/Contexts/UserContext";
import axios from "axios";
import { IServices, IUser } from "@/interfaces";
import Alert from "./Alert";
import { useTranslation } from "react-i18next";


export function AddServiceDialog({
  open,
  onOpenChange,
  onAdd,
  userData,
}: AddServiceDialogProps) {
  const [selected, setSelected] = useState<string>(""); // Keep the selected value as ID
  const [serviceOptions, setServiceOptions] = useState<Service[]>([]);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
    show: boolean;
  } | null>(null);

  let user_type = localStorage.getItem("user-type");   
  // user_type = user_type ? user_type.replace(/\s+/g, "-") : null;
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }
  const { userToken, pathUrl} = userContext;
  const{t,i18n}=useTranslation();

  let apiUrl;    
  if (user_type === "عامل فني" || user_type === "technical worker") {
    apiUrl = `${pathUrl}/api/v1/technical-worker-services/service/${userData?.type?.id}` ;
  } else {
    apiUrl = `${pathUrl}/api/v1/engineer-services/service/${userData?.type?.id}`;
  }
  //fetchServices
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await axios.get(apiUrl,
          // `${pathUrl}/api/v1/${user_type}-services/service/${userData?.type?.id}`,
          // `${pathUrl}/api/v1/engineer-services/service/${userData?.type?.id}`,
          // `${pathUrl}/api/v1/technical-worker-services/service/${userData?.type?.id}`,


          {
            headers: {
              Authorization: `Bearer ${userToken}`,
              "Accept-Language": i18n.language,
            },
          }
        );

        if (data.success) {
          setServiceOptions(
            data.data.map((item: IServices) => ({
              id: item.id,
              code: item.code,
              nameEn: item.name,
              nameAr: item.nameAr || item.name,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, [userData?.type?.id, userToken, pathUrl, user_type,i18n.language]);

  //Add Services
  const handleAddService = async () => {
    if (!selected) return;

    const selectedService = serviceOptions.find(
      (service) => service.id === selected
    );
    if (!selectedService) return;
console.log("user_typeuser_type",user_type)
    const userServiceField =
      // user_type === "technical-worker" ? "workerServs" : "engineerServ";
      user_type === "technical worker" || user_type === "عامل فني" ? "workerServs" : "engineerServ";
      const isAlreadyAdded = userData?.[userServiceField]?.some(
      (service) => service.code === selectedService.code
    );

    if (isAlreadyAdded) {
      setAlert({
        message:t('Sidebar.Services_Add_DialogContent.Services_Exists'),
        type: "error",
        show: true,
      });
      return;
    }

    const updatedUserService = [
      ...(userData?.[userServiceField] || []),
      selectedService,
    ];
    const payload = { ...userData, [userServiceField]: updatedUserService };
    let updateType;    
    if (user_type === "عامل فني" || user_type === "technical worker") {
      updateType = `${pathUrl}/api/v1/technical-workers` ;
    } else {
      updateType = `${pathUrl}/api/v1/engineers`
    }
console.log("user_type from add",user_type);
    try {
      const response = await axios.put(
        updateType,
        // `${pathUrl}/api/v1/${user_type}s`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
            "Accept-Language": i18n.language,
          },
        }
      );

      setSelected("");
      setAlert({
        message:t('Sidebar.Services_Add_DialogContent.Services_added'),
        type: "success",
        show: true,
      });

      setTimeout(() => {
        setAlert(null);
        onOpenChange(false);
      }, 1500);

      onAdd(response.data);
    } catch (error) {
      console.error(t('Sidebar.Services_Add_DialogContent.error_adding'), error);
      setAlert({ message:t('Sidebar.Services_Add_DialogContent.error_adding'), type: "error", show: true });
    }
  };

  const handleCloseAlert = () => {
    setAlert((prev) => (prev ? { ...prev, show: false } : null));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md border-none bg-white p-6 shadow-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
          {t('Sidebar.Services_Add_DialogContent.Add_Service_btn')}
          </DialogTitle>
        </DialogHeader>

        {alert && alert.show && (
          <Alert
            message={alert.message}
            type={alert.type}
            isVisible={alert.show}
            onClose={handleCloseAlert}
          />
        )}

        <div className="mt-6">
          <Select value={selected} onValueChange={setSelected}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder={t('Sidebar.Services_Add_DialogContent.Select_service')} />
            </SelectTrigger>
            <SelectContent>
              {serviceOptions.map((service) => (
                <SelectItem key={service.id} value={service.id}>
                  {/* {service.nameEn} */}
                  {i18n.language === 'ar' ? service.nameAr : service.nameEn}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
          {t('Sidebar.Services_Add_DialogContent.Cancel')}
          </Button>
          <Button onClick={handleAddService} disabled={!selected}>
          {t('Sidebar.Services_Add_DialogContent.Add_Service_btn')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}



