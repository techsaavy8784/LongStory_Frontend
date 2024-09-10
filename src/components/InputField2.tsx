import Image from "next/image";
import { useState, useEffect } from "react";
import { UseFormRegister, Controller } from "react-hook-form";
export interface InputFieldProps {
  label?: string;
  type?: string;
  placeholder: string;
  img: string;
  value?: string;
  className?: string;
  name: string;
  onInputChange?: () => void;
  formMethods: any;
  children?: React.ReactNode;
}

const InputField2 = ({
  label,
  type = "text",
  placeholder,
  img,
  value,
  className,
  name = "default",
  onInputChange,
  formMethods,
  children,
}: InputFieldProps) => {
  const [focus, setFocus] = useState<boolean>(false);

  return (
    <div
      className={
        "flex flex-col gap-[10px] w-[356px] " + (className ? className : "")
      }
    >
      {label && (
        <label
          htmlFor={name}
          className="text-base font-semibold leading-[20.16px]"
        >
          {label}
        </label>
      )}
      <div
        className={
          "flex justify-start items-center gap-[9px] px-5 py-4 w-full text-[#475569] rounded-14 border-1 " +
          (focus ? "border-black " : "border - [#CBD5E1] ") +
          (children ? "border-red" : "")
        }
      >
        <label htmlFor={name}>
          <Image
            src={`/assets/images/inputField/${img}.svg`}
            width={24}
            height={24}
            alt={img}
          />
        </label>

        <Controller
          name={name}
          control={formMethods.control}
          render={({ field }) => (
            <input
              type={type}
              id={name}
              placeholder={placeholder}
              className={
                "text-sm leading-[17.64px] outline-none w-[285px] " +
                (className ? "w-[680px]" : "")
              }
              onFocus={() => setFocus(true)}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                if (onInputChange) {
                  onInputChange();
                }
              }}
              // value={inputValue ? inputValue : ""}
              onBlur={() => {
                field.onBlur();
                setFocus(false);
              }}
              // {...field}
            />
          )}
        />
      </div>
      {children && children}
    </div>
  );
};

export default InputField2;
