"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingStepper } from "@/components/partials/onboarding";
import { DocumentsForm } from "@/components/forms";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getCookie, setCookie } from "@/utils/cookie";
import { getDocumentDetails, submitDocuments } from "@/service/onboarding.service";
import { Loader2 } from "lucide-react";
import { getS3BasePath } from "@/config/aws";

interface FileWithPreview extends File {
    preview: string;
}

const Documents = () => {
    const stepCompleted = getCookie("step_completed") || 0;
    const user_id = getCookie("id") || 0;
    const navigation = useRouter();
    const [chequeFile, setChequeFile] = useState<FileWithPreview | null>(null);
    const [gstFile, setGSTFile] = useState<FileWithPreview | null>(null);
    const [signatureFile, setSignatureFile] = useState<FileWithPreview | null>(null);
    const [personalFile, setPersonalFile] = useState<FileWithPreview | null>(null);
    const [personalIDType, setPersonalIDType] = useState<string | null>(null);
    const [previewChequeFile, setPreviewChequeFile] = useState<FileWithPreview | null>(null);
    const [previewGstFile, setPreviewGSTFile] = useState<FileWithPreview | null>(null);
    const [previewSignatureFile, setPreviewSignatureFile] = useState<FileWithPreview | null>(null);
    const [previewPersonalFile, setPreviewPersonalFile] = useState<FileWithPreview | null>(null);
    const [fileErrors, setFileErrors] = useState<{ [key: string]: string | null }>({
        chequeFile: null,
        gstFile: null,
        signatureFile: null,
        personalFile: null,
        personalIDType: null,
    });
    const documentsPath = getS3BasePath(`users/${user_id}/documents/`);

    const [isPending, startTransition] = React.useTransition();

    const { handleSubmit } = useForm({
        mode: "onSubmit",
    });

    const handleBack = () => {
        navigation.replace("/onboarding/verification");
    };

    useEffect(() => {
        if (stepCompleted >= "4") {
            fetchDocumentDetails();
        }
    }, []);

    const fetchDocumentDetails = async () => {
        try {
            const response = await getDocumentDetails();
            if (response?.status !== true && response?.statusCode !== 200) {
                toast.error(response?.message);
            }

            const documents = response?.data;
            documents?.forEach((document: any) => {
                switch (document.document_name) {
                    case "gstFile":
                        setPreviewGSTFile(documentsPath + document.document as any);
                        break;
                    case "signatureFile":
                        setPreviewSignatureFile(documentsPath + document.document as any);
                        break;
                    case "chequeFile":
                        setPreviewChequeFile(documentsPath + document.document as any);
                        break;
                    case "Aadhar card":
                    case "Pan card":
                    case "Passport":
                        setPreviewPersonalFile(documentsPath + document.document as any);
                        setPersonalIDType(document.document_name)
                        break;
                    default:
                        break;
                }
            });
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    const validateFile = () => {
        const errors: { [key: string]: string | null } = {};

        const validateSingleFile = (
            file: FileWithPreview | null,
            previewFile: FileWithPreview | string | null,
            fileKey: string,
            fileName: string
        ) => {
            // Skip validation if previewFile exists
            if (previewFile) return;

            // If previewFile does not exist, validate the uploaded file
            if (!file) {
                errors[fileKey] = `${fileName} is required`;
            } else if (!file.type.startsWith("image/")) {
                errors[fileKey] = `Only image files are allowed for the ${fileName.toLowerCase()}`;
            } else if (file.size > 2 * 1024 * 1024) {
                errors[fileKey] = `${fileName} size should be less than 2MB`;
            }
        };

        // Validate files or skip if a preview is available
        validateSingleFile(chequeFile, previewChequeFile, "chequeFile", "Cheque or Bank statement");
        validateSingleFile(gstFile, previewGstFile, "gstFile", "GST file");
        validateSingleFile(signatureFile, previewSignatureFile, "signatureFile", "Signature file");

        // Special handling for personal file validation
        if (!personalIDType) {
            errors.personalFile = "Personal identification type is required";
        } else {
            validateSingleFile(personalFile, previewPersonalFile, "personalFile", "Personal identification file");
        }

        setFileErrors(errors);
        return Object.keys(errors).length === 0;
    };


    const onSubmit = () => {
        if (!validateFile()) {
            toast.error("Please fix the errors before submitting the documents.");
            return;
        }
        const formData = new FormData();
        formData.append("personal_identification", String(personalIDType));

        // Add all files to FormData (adjust the file handling as needed)
        if (chequeFile) formData.append("chequeFile", chequeFile);
        if (gstFile) formData.append("gstFile", gstFile);
        if (signatureFile) formData.append("signatureFile", signatureFile);
        if (personalFile) formData.append("personalFile", personalFile);

        startTransition(async () => {
            try {
                const response = await submitDocuments(formData);
                if (response?.status && response?.statusCode === 200) {
                    toast.success(response?.message);
                    if (stepCompleted < "4") {
                        setCookie("step_completed", 4);
                        setCookie("onboarding_completed", true);
                    }
                    // navigation.replace("/dashboard");
                } else {
                    toast.error(response?.message || "An error occurred");
                }
            } catch (error: any) {
                toast.error(error?.message || "An error occurred");
            }
        });
    };

    return (
        <>
            <div className="">
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DocumentsForm
                            chequeFile={chequeFile}
                            setChequeFile={setChequeFile}
                            previewChequeFile={previewChequeFile}
                            setPreviewChequeFile={setPreviewChequeFile}
                            gstFile={gstFile}
                            setGSTFile={setGSTFile}
                            previewGSTFile={previewGstFile}
                            setPreviewGSTFile={setPreviewGSTFile}
                            signatureFile={signatureFile}
                            setSignatureFile={setSignatureFile}
                            previewSignatureFile={previewSignatureFile}
                            setPreviewSignatureFile={setPreviewSignatureFile}
                            personalFile={personalFile}
                            setPersonalFile={setPersonalFile}
                            previewPersonalFile={previewPersonalFile}
                            setPreviewPersonalFile={setPreviewPersonalFile}
                            personalIDType={personalIDType}
                            setPersonalIDType={setPersonalIDType}
                            fileErrors={fileErrors} // Pass the errors to the form component
                        />
                        <div className="flex pt-2 ">
                            <div className="flex-1 gap-4 " />
                            <div className="flex gap-2 ">
                                <Button
                                    type="button"
                                    size="lg"
                                    variant="outline"
                                    color="primary"
                                    className="cursor-pointer"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    size="lg"
                                    variant="outline"
                                    color="primary"
                                    className="cursor-pointer"
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Documents;