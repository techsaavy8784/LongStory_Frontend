import StepBarItem from "./stepBarItem";
import { ReactNode } from "react";

const StepBar = ({
  step,
  stepBarItemList,
  children,
}: {
  step: number;
  stepBarItemList: string[];
  children?: ReactNode;
}) => {
  return (
    <>
      {stepBarItemList.map((stepBarItem, index) => {
        let status: "completed" | "incompleted" | "ready";
        if (index < step) {
          status = "completed";
        } else if (index < step + 1) {
          status = "ready";
        } else {
          status = "incompleted";
        }
        return (
          <StepBarItem
            title={stepBarItem}
            status={status}
            index={index + 1}
            key={index}
          >
            {stepBarItemList.length > index + 1 && children}
          </StepBarItem>
        );
      })}
    </>
  );
};

export default StepBar;
