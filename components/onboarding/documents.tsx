"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingStepper } from "../partials/onboarding";
import { DocumentsForm } from "../forms";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getCookie, setCookie } from "@/utils/cookie";
import { getDocumentDetails, submitDocuments } from "@/service/onboarding.service";
import { Loader2 } from "lucide-react";

interface FileWithPreview extends File {
    preview: string;
}

const Documents = () => {
    const stepCompleted = getCookie("step_completed") || 0;
    const navigation = useRouter();
    const [chequeFile, setChequeFile] = useState<FileWithPreview | null>(null);
    const [gstFile, setGSTFile] = useState<FileWithPreview | null>(null);
    const [signatureFile, setSignatureFile] = useState<FileWithPreview | null>(null);
    const [personalFile, setPersonalFile] = useState<FileWithPreview | null>(null);
    const [personalIDType, setPersonalIDType] = useState<string | null>(null);
    const [fileErrors, setFileErrors] = useState<{ [key: string]: string | null }>({
        chequeFile: null,
        gstFile: null,
        signatureFile: null,
        personalFile: null,
        personalIDType: null,
    });

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
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    const validateFile = () => {
        const errors: { [key: string]: string | null } = {};

        const validateSingleFile = (
            file: FileWithPreview | null,
            fileKey: string,
            fileName: string
        ) => {
            if (!file) {
                errors[fileKey] = `${fileName} is required`;
            } else if (!file.type.startsWith("image/")) {
                errors[fileKey] = `Only image files are allowed for the ${fileName.toLowerCase()}`;
            } else if (file.size > 2 * 1024 * 1024) {
                errors[fileKey] = `${fileName} size should be less than 2MB`;
            }
        };

        validateSingleFile(chequeFile, "chequeFile", "Cheque or Bank statement");
        validateSingleFile(gstFile, "gstFile", "GST file");
        validateSingleFile(signatureFile, "signatureFile", "Signature file");

        if (!personalIDType) {
            errors.personalFile = "Personal identification type is required";
        } else {
            validateSingleFile(personalFile, "personalFile", "Personal identification file");
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
                    navigation.replace("/dashboard");
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
            <OnboardingStepper activestep="3" />
            <div className="">
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DocumentsForm
                            chequeFile={chequeFile}
                            setChequeFile={setChequeFile}
                            gstFile={gstFile}
                            setGSTFile={setGSTFile}
                            signatureFile={signatureFile}
                            setSignatureFile={setSignatureFile}
                            personalFile={personalFile}
                            setPersonalFile={setPersonalFile}
                            personalIDType={personalIDType}
                            setPersonalIDType={setPersonalIDType}
                            fileErrors={fileErrors} // Pass the errors to the form component
                        />
                        <div className="flex pt-2">
                            <Button
                                type="button"
                                size="lg"
                                variant="outline"
                                color="secondary"
                                className="cursor-pointer"
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                            <div className="flex-1 gap-4 " />
                            <div className="flex gap-2 ">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    color="success"
                                    className="cursor-pointer"
                                    disabled={isPending}
                                >
                                    {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {isPending ? "Loading" + "..." : "Finish"}
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