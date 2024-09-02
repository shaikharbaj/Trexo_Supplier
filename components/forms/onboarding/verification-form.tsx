import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import FileUploaderMultiple from "@/components/ui/file-uploader-multiple";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

interface IVerificationProps {
    stepCompleted?: any;
    handleBack?: any;
    code?: any;
    setFiles?: any;
    fileError?: any;
    files?: any;
    setValue?: any;
    preview?: any;
    setPreview?: any;
}

const VerificationForm: React.FC<IVerificationProps> = ({
    code,
    setFiles,
    files,
    fileError,
    preview,
    setPreview
}) => {
    return (
        <React.Fragment>
            <div className=" mt-2 mb-1 text-default-900 font-semibold text-base">
                <div className=" space-y-4 mb-6">
                    <h1 className="font-semibold flex justify-start items-center gap-3 border-b border-gray-200 py-2">
                        <span className="text-[#ff5757]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z"
                                />
                            </svg>
                        </span>
                        Verification
                    </h1>
                    <div className="space-y-3">
                        <div className="grid gap-8 grid-cols-4">
                            <div className="col-span-3">
                                <Label className="mb-2" htmlFor="">
                                    Write the below code on a piece of paper and hold it in
                                    front of the camera.
                                </Label>
                                <Input
                                    type="text"
                                    className="md:w-28 text-center tracking-widest"
                                    size="lg"
                                    defaultValue={code}
                                    id="code"
                                    readOnly
                                    disabled
                                />
                            </div>
                            {preview ? (
                                <div className=" col-span-2">
                                    <div
                                        className=" flex justify-between items-center border px-3.5 py-3 my-6 rounded-md"
                                    >
                                        <div className="flex gap-3 items-center">
                                            <div className="file-preview">
                                                <Image
                                                    width={100}
                                                    height={100}
                                                    alt=""
                                                    src={preview}
                                                    className=" rounded border p-0.5"
                                                />
                                            </div>
                                        </div>
                                        <Button
                                            size="icon"
                                            color="destructive"
                                            variant="outline"
                                            className=" border-none rounded-full"
                                            onClick={()=>setPreview("")}
                                        >
                                            <Icon icon="tabler:x" className=" h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className=" col-span-2">
                                    <Label className="mb-2" htmlFor="">
                                        Ensure that your face and the code are clearly visible.{" "}
                                        <span className="text-destructive">*</span>
                                    </Label>
                                    <FileUploaderMultiple setFiles={setFiles} files={files} />
                                    {fileError && (
                                        <div className="mt-2 text-destructive text-xs">
                                            {fileError}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment>
    );
};

export default VerificationForm;