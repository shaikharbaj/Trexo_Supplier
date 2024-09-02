" use client";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface FileWithPreview extends File {
  preview: string;
}

interface IFileUploaderSingle {
  file: FileWithPreview | null; 
  setFile: (files: FileWithPreview | null) => void;
}


const FileUploaderSingle:React.FC<IFileUploaderSingle> = ({ file, setFile }) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    onDrop: (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      setFile(Object.assign(selectedFile));
    },
  });

  const img = file && (
    <Image
      key={file.name}
      alt={file.name}
      width={50}
      height={50}
      className="w-full h-full object-cover rounded-md"
      src={URL.createObjectURL(file)}
    />
  );

  const closeTheFile = () => {
    setFile(null);
  };

  return (
    <div className={file ? "h-[300px] w-full" : ""}>
      {file ? (
        <div className="w-full h-full relative">
          <Button
            type="button"
            className="absolute top-4 right-4 h-12 w-12 rounded-full bg-default-900 hover:bg-background hover:text-default-900 z-20"
            onClick={closeTheFile}
          >
            <span className="text-sm">
              <Icon icon="fa6-solid:xmark" />
            </span>
          </Button>
          {img}
        </div>
      ) : (
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />

          <div className="w-full text-center border-dashed border rounded-md py-[52px] flex items-center flex-col">
            <div className="h-12 w-12 inline-flex rounded-md bg-muted items-center justify-center mb-3">
              <Upload className="text-default-500" />
            </div>
            <h4 className="text-base font-medium mb-1 text-card-foreground/80">
              Drop files here or click to upload.
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploaderSingle;
