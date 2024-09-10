import axios from "@/utils/axios";
import React, { FormEvent, useRef, useState } from "react";
import Image from "next/image";

const ImageUploader = () => {
  // 1. add reference to input element
  const [file, setFile] = useState<File>();

  const ref = useRef<HTMLInputElement>(null);

  const onFileChange = () => {};

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
    } else {
      const formdata = new FormData();
      formdata.set("file", file);
      formdata.set("index", "1");
      const res = await axios.post("/api/admin/variants/6/media", formdata);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="files"
          ref={ref}
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <button
          type="submit"
          className="px-2 py-1 rounded-md bg-violet-50 text-violet-500"
        >
          Upload
        </button>
      </form>
      <img
        src={
          file
            ? URL.createObjectURL(file)
            : "https://lss-prod-public.s3.amazonaws.com/image/products/10_cover.png-1697313065019"
        }
        width={200}
        height={200}
        alt={"aaaa"}
      />
    </>
  );
};

export default ImageUploader;
