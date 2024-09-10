import Image from "next/image";
import React from "react";

export interface StepBarItemProps {
  title: string;
  status: "completed" | "ready" | "incompleted";
  index: number;
  children?: React.ReactNode;
}

export default function StepBarItem({
  title,
  status,
  index,
  children,
}: StepBarItemProps) {
  return (
    <>
      <div className="flex gap-2 justify-start items-center">
        <div>
          {status == "completed" && (
            <>
              <Image
                src={`/assets/images/status/tick.svg`}
                alt="completed"
                width={48}
                height={48}
              />
            </>
          )}
          {status == "ready" && (
            <>
              <div className="w-12 h-12 p-1 border border-blue-950 rounded-full">
                <div className="flex justify-center items-center w-full h-full rounded-full bg-blue-1 text-white">
                  <span>{index < 10 ? `0${index}` : index}</span>
                </div>
              </div>
            </>
          )}
          {status == "incompleted" && (
            <>
              <div className="flex justify-center items-center w-12 h-12 border rounded-full border-grey-1 bg-white text-grey-1">
                <span>{index < 10 ? `0${index}` : index}</span>
              </div>
            </>
          )}
        </div>

        <div>
          <div className="text-xs font-normal">
            Step {index < 10 ? `0${index}` : index}
          </div>
          <div className="text-base font-semibold">{title}</div>
        </div>
      </div>
      {children && children}
    </>
  );
}
