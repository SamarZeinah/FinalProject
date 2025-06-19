"use client";
import { useContext, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import ConfirmDialog from "./confirm-dialog";
import axios from "axios";
import { UserContext } from "@/Contexts/UserContext";
import { IFormData } from "@/interfaces";
import ProjectForm from "./project-form";
import { Toaster } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

interface AddProjectProps {
  onClose: () => void;
}

export default function AddProject({ onClose }: AddProjectProps) {
  const{t}=useTranslation();
  const queryClient = useQueryClient();

  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserContextProvider");
  }
  const { pathUrl } = userContext;
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingData, setPendingData] = useState<IFormData | null>(null);

  const handleSubmit = async (formData: IFormData) => {
    setPendingData(formData);
    setShowConfirmDialog(true);
  };

  const handleConfirmedSubmit = async () => {
    if (!pendingData) return;
    setIsLoading(true);

    try {
      const formData = new FormData();

      const projectDataBlob = new Blob(
        [JSON.stringify(pendingData.projectData)],
        {
          type: "application/json",
        }
      );
      formData.append("projectData", projectDataBlob, "projectData.json");

      pendingData.images.forEach((image) => {
        formData.append("images", image);
      });

      if (pendingData.cover) {
        formData.append("cover", pendingData.cover);
      }

      const { data } = await axios.post(`${pathUrl}/api/v1/project`, formData, {
        headers: {
          "Accept-Language": "en",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response data:", data);

      if (data.success) {
                // Invalidate queries to refetch project data
                await queryClient.invalidateQueries(["project", data.data.id]);
                await queryClient.invalidateQueries(["projects"])
        setShowConfirmDialog(false);
        onClose();
        toast.success(t('addProject.Project_created_successfully'), {
          duration: 2000,
          position: "top-center",
          style: {
            minWidth: "400px",
            padding: "20px 24px",
            fontSize: "16px",
            fontWeight: "500",
            borderRadius: "12px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
            background: "#16a34a",
            color: "#fff",
          },
        });
      } else {
        throw new Error(data.message || t('addProject.Failed_create_project'));
      }
    } catch (error) {
      console.error(t('addProject.Error_creating_project'), error);
      toast.error(t('addProject.Failed_create_project'), {
        duration: 2000,
        position: "top-center",
        style: {
          minWidth: "400px",
          padding: "20px 24px",
          fontSize: "16px",
          fontWeight: "500",
          borderRadius: "12px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          background: "#dc2626",
          color: "#fff",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <div className="flex flex-row items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{t('addProject.title')}</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ProjectForm
            onSubmit={handleSubmit}
            isLoading={isLoading || showConfirmDialog}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>

      <ConfirmDialog
        showConfirmDialog={showConfirmDialog}
        setShowConfirmDialog={setShowConfirmDialog}
        handleConfirm={handleConfirmedSubmit}
        title={t('addProject.ConfirmDialog_title')}
        desc={t('addProject.ConfirmDialog_desc')}
        confirmText={t('addProject.ConfirmDialog_confirmText')}
        cancelText={t('addProject.ConfirmDialog_cancelText')}
        isLoading={isLoading}
      />

      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            minWidth: "400px",
            padding: "20px 24px",
            fontSize: "16px",
            fontWeight: "500",
            borderRadius: "12px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
          },
        }}
      />
    </>
  );
}
