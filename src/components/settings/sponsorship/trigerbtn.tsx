import { useState } from "react";

export interface TriggerStatus {
  status: boolean;
}

const TriggerBtn = (triggerStatus: TriggerStatus) => {
  const [updatedTriggerStatus, setupTriggerStatus] = useState(false);
  const updateStatus = () => {
    console.log(updatedTriggerStatus);
    setupTriggerStatus(!updatedTriggerStatus);
  };
  return (
    <>
      {updatedTriggerStatus ? (
        <div
          className="bg-blue-1 rounded-50 w-11 h-6 relative cursor-pointer"
          onClick={updateStatus}
        >
          <div className="bg-white absolute w-5 h-5 rounded-full top-[2px] right-[2px]" />
        </div>
      ) : (
        <>
          <div
            className="bg-gray-3 rounded-50 w-11 h-6 relative cursor-pointer"
            onClick={updateStatus}
          >
            <div className="bg-white absolute w-5 h-5 rounded-full top-[2px] left-[2px]" />
          </div>
        </>
      )}
    </>
  );
};

export default TriggerBtn;
