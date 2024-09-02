import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import FileUploaderSingle from "@/components/ui/file-uploader-single";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Icon } from "@iconify/react";

interface IDocumentsProps {
    chequeFile?: any;
    setChequeFile?: any;
    previewChequeFile?: any;
    setPreviewChequeFile?: any;
    gstFile?: any;
    setGSTFile?: any;
    previewGSTFile?: any;
    setPreviewGSTFile?: any;
    signatureFile?: any;
    setSignatureFile?: any;
    previewSignatureFile?: any;
    setPreviewSignatureFile?: any;
    personalFile?: any;
    setPersonalFile?: any;
    previewPersonalFile?: any;
    setPreviewPersonalFile?: any;
    fileErrors?: any;
    personalIDType?: any;
    setPersonalIDType?: (value: string) => void;
}

const DocumentsForm: React.FC<IDocumentsProps> = ({
    chequeFile,
    setChequeFile,
    previewChequeFile,
    setPreviewChequeFile,
    gstFile,
    setGSTFile,
    previewGSTFile,
    setPreviewGSTFile,
    signatureFile,
    setSignatureFile,
    previewSignatureFile,
    setPreviewSignatureFile,
    personalFile,
    setPersonalFile,
    previewPersonalFile,
    setPreviewPersonalFile,
    fileErrors,
    personalIDType, // Add personal ID type
    setPersonalIDType, // Add setter function for personal ID type
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
                        Document
                    </h1>
                    <div className="space-y-3">
                        <div className="grid gap-8 grid-cols-3">
                            {previewChequeFile ? (
                                <div className="w-full h-full relative">
                                    <Button
                                        type="button"
                                        className="absolute top-4 right-4 h-12 w-12 rounded-full bg-default-900 hover:bg-background hover:text-default-900 z-20"
                                        onClick={() => setPreviewChequeFile("")}
                                    >
                                        <span className="text-sm">
                                            <Icon icon="fa6-solid:xmark" />
                                        </span>
                                    </Button>
                                    <Image
                                        key="chequeFile"
                                        alt="chequeFile"
                                        width={50}
                                        height={50}
                                        className="w-full h-full object-cover rounded-md"
                                        src={previewChequeFile}
                                    />
                                </div>
                            ) : (
                                <div className="">
                                    <div>
                                        <Label className="mb-2" htmlFor="">
                                            Cancelled Cheque / Bank Statement
                                        </Label>
                                        <FileUploaderSingle setFile={setChequeFile} file={chequeFile} />
                                        {fileErrors.chequeFile && (
                                            <div className="mt-2 text-destructive text-xs">
                                                {fileErrors.chequeFile}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                            }
                            {previewGSTFile ? (
                                <div className="w-full h-full relative">
                                    <Button
                                        type="button"
                                        className="absolute top-4 right-4 h-12 w-12 rounded-full bg-default-900 hover:bg-background hover:text-default-900 z-20"
                                        onClick={() => setPreviewGSTFile("")}
                                    >
                                        <span className="text-sm">
                                            <Icon icon="fa6-solid:xmark" />
                                        </span>
                                    </Button>
                                    <Image
                                        key="gstFile"
                                        alt="gstFile"
                                        width={50}
                                        height={50}
                                        className="w-full h-full object-cover rounded-md"
                                        src={previewGSTFile}
                                    />
                                </div>
                            ) : (
                                <div className="">
                                    <div>
                                        <Label className="mb-2" htmlFor="">
                                            GST Certificate
                                        </Label>
                                        <FileUploaderSingle setFile={setGSTFile} file={gstFile} />
                                        {fileErrors.gstFile && (
                                            <div className="mt-2 text-destructive text-xs">
                                                {fileErrors.gstFile}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                            {previewSignatureFile ? (
                                <div className="w-full h-full relative">
                                    <Button
                                        type="button"
                                        className="absolute top-4 right-4 h-12 w-12 rounded-full bg-default-900 hover:bg-background hover:text-default-900 z-20"
                                        onClick={() => setPreviewSignatureFile("")}
                                    >
                                        <span className="text-sm">
                                            <Icon icon="fa6-solid:xmark" />
                                        </span>
                                    </Button>
                                    <Image
                                        key="signatureFile"
                                        alt="signatureFile"
                                        width={50}
                                        height={50}
                                        className="w-full h-full object-cover rounded-md"
                                        src={previewSignatureFile}
                                    />
                                </div>
                            ) : (
                                <div className="">
                                    <div>
                                        <Label className="mb-2" htmlFor="">
                                            Signature
                                        </Label>
                                        <FileUploaderSingle setFile={setSignatureFile} file={signatureFile} />
                                        {fileErrors.signatureFile && (
                                            <div className="mt-2 text-destructive text-xs">
                                                {fileErrors.signatureFile}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div>
                                <Label className="mb-2" htmlFor="businessname">
                                    Personal Identification
                                </Label>
                                <Select onValueChange={setPersonalIDType} value={personalIDType || undefined}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Aadhar card">Aadhar card</SelectItem>
                                        <SelectItem value="Pan card">PAN Card</SelectItem>
                                        <SelectItem value="Passport">Passport</SelectItem>
                                    </SelectContent>
                                </Select>
                                {previewPersonalFile ? (
                                    <div className="w-full h-full relative">
                                        <Button
                                            type="button"
                                            className="absolute top-4 right-4 h-12 w-12 rounded-full bg-default-900 hover:bg-background hover:text-default-900 z-20"
                                            onClick={() => setPreviewPersonalFile("")}
                                        >
                                            <span className="text-sm">
                                                <Icon icon="fa6-solid:xmark" />
                                            </span>
                                        </Button>
                                        <Image
                                            key="personalFile"
                                            alt="personalFile"
                                            width={50}
                                            height={50}
                                            className="w-full h-full object-cover rounded-md mt-2"
                                            src={previewPersonalFile}
                                        />
                                    </div>
                                ) : (
                                    <div className="mt-2">
                                        <FileUploaderSingle setFile={setPersonalFile} file={personalFile} />
                                        {fileErrors.personalFile && (
                                            <div className="mt-2 text-destructive text-xs">
                                                {fileErrors.personalFile}
                                            </div>
                                        )}
                                    </div>
                                )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default DocumentsForm;