import Image from "next/image";
import { useState, useEffect } from "react";
import { UseFormRegister, Control, Controller } from "react-hook-form";
export interface InputFieldProps {
  label?: string;
  type?: string;
  placeholder: string;
  img: string;
  defaultValue?: string;
  className?: string;
  name?: string;
  onInputChange?: () => void;
  control: Control<any>;
}

const InputField = ({
  label,
  type = "text",
  placeholder,
  img,
  defaultValue = "",
  // value,
  className,
  name = "default",
  onInputChange,
  control,
}: InputFieldProps) => {
  const [focus, setFocus] = useState<boolean>(false);
  // const [inputValue, setInputValue] = useState<string | undefined>(value);
  // useEffect(()=>{

  // }, [])
  return (
    <label
      className={
        "flex flex-col gap-[10px] w-[356px] hover:shadow-[0_0_32px_4px_rgb(0,0,0,0.15)] hover:border-[#94A3B8] hover:duration-300 border border-[#CBD5E1] rounded-[14px]  " +
        (className ? className : "")
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
          (focus ? "border-black" : "border - [#CBD5E1]")
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
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <input
              {...field}
              type={type}
              id={name}
              placeholder={placeholder}
              className={
                "text-sm leading-[17.64px] outline-none w-[285px] " +
                (className ? "w-[680px]" : "")
              }
              name={name}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              // value={inputValue ? inputValue : ""}
              // onChange={(e) => {
              //   // setInputValue(e.target.value);
              //   if (onInputChange) {
              //     onInputChange();
              //   }
              // }}
            />
          )}
        />
      </div>
    </label>
  );
};

export default InputField;
