"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { OnboardingStepper } from "../partials/onboarding";
import { generateUniqueFourDigitNumber } from "@/utils/verification-code";
import { useForm } from "react-hook-form";
import { getCookie, setCookie } from "@/utils/cookie";
import toast from "react-hot-toast";
import { getVerificationDetails, submitVerification } from "@/service/onboarding.service";
import { VerificationForm } from "../forms";
import { Button } from "@/components/ui/button";
import { getS3BasePath } from "@/config/aws";
import { Loader2 } from "lucide-react";

interface IVerification { }

interface FileWithPreview extends File {
    preview: string;
}

const Verfication: React.FC<IVerification> = () => {
    const stepCompleted = getCookie("step_completed") || 0;
    const user_id = getCookie("id") || 0;
    const navigation = useRouter();
    const [code, setCode] = useState<Number>();
    const [preview, setPreview] = useState<string>("");
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [fileError, setFileError] = useState<string | null>(null);
    const verificationPath = getS3BasePath(`users/${user_id}/verification/`);

    const [isPending, startTransition] = React.useTransition();

    const { handleSubmit, setValue } = useForm({
        mode: "onSubmit",
    });

    useEffect(() => {
        if (stepCompleted >= "3") {
            fetchVerificationDetails();
        } else {
            setCode(generateUniqueFourDigitNumber());
        }
    }, []);

    const fetchVerificationDetails = async () => {
        try {
            const response = await getVerificationDetails();
            if (response?.status !== true && response?.statusCode !== 200) {
                toast.error(response?.message);
            }
            setCode(response?.data?.code);
            setPreview(verificationPath + response.data.code_image);
        } catch (error: any) {
            toast.error(error?.message);
        }
    };

    const validateFile = (): string | true => {
        if (!files.length) return "File is required";
        const file = files[0];
        if (!file.type.startsWith("image/")) return "Only image files are allowed";
        if (file.size > 2 * 1024 * 1024) return "File size should be less than 2MB";
        return true;
    };

    const handleBack = () => {
        navigation.replace("/onboarding/bank-details");
    };

    const onSubmit = () => {
        const validation = validateFile();
        if (validation === true) {
            setFileError(null);
            const formData = new FormData();
            formData.append("code", String(code));
            formData.append("files", files[0]);
            startTransition(async () => {
                try {
                    const response = await submitVerification(formData);
                    if (response?.status === true && response?.statusCode === 200) {
                        toast.success(response?.message);
                        if (stepCompleted < "3") {
                            setCookie("step_completed", 3);
                        }
                        navigation.replace("/onboarding/documents");
                    } else {
                        toast.error(response?.message || "An error occurred");
                    }
                } catch (error: any) {
                    toast.error(error?.message || "An error occurred");
                }
            });
        } else {
            setFileError(validation as string);
        }
    };

    return (
        <>
            <OnboardingStepper activestep="2" />
            <div className="">
                <div className="container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <VerificationForm
                            stepCompleted={stepCompleted}
                            handleBack={handleBack}
                            code={code}
                            setFiles={setFiles}
                            files={files}
                            preview={preview}
                            setPreview={setPreview}
                            fileError={fileError}
                            setValue={setValue}
                        />
                        <div className="flex pt-2 ">
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
                            {preview ? (
                                <div className="flex gap-2 ">
                                    <Button
                                        type="button"
                                        size="lg"
                                        variant="outline"
                                        color="primary"
                                        className="cursor-pointer"
                                        onClick={()=> navigation.replace("/onboarding/documents")}
                                    >
                                        Next
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex gap-2 ">
                                    <Button
                                        type="submit"
                                        size="lg"
                                        variant="outline"
                                        color="primary"
                                        className="cursor-pointer"
                                        disabled={isPending}
                                    >
                                        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {isPending ? "Loading" + "..." : "Next"}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Verfication;