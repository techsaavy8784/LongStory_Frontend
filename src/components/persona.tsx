import Persona from "persona";
import React, { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import LinearLoading from "./loading/linear";

function InlineInquiry() {
  const [ready, setReady] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      setUserLoaded(true);
    }
  }, [user]);
  return !userLoaded ? (
    <LinearLoading />
  ) : (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ display: ready ? "none" : "unset" }}>
        YOUR LOADING INDICATOR
      </div>
      <div
        style={{ display: ready ? "unset" : "none" }}
        className="persona w-screen h-screen flex justify-center items-center py-10"
      >
        <Persona.Inquiry
          fields={{
            nameFirst: user?.email as any,
            emailAddress: user?.email as any,
          }}
          templateId={process.env.NEXT_PUBLIC_INQUERY_TEMPLATE_ID}
          environmentId={process.env.NEXT_PUBLIC_ENVIRONMENT_ID}
          onReady={() => setReady(true)}
          referenceId={`${user?.id}`}
          onLoad={() => {
            console.log("Loaded inline");
            console.log(user?.id);
          }}
          onEvent={(eventName, metaData) => {
            if (eventName === "start") {
              console.log(eventName, metaData);
            }
          }}
          onComplete={({ inquiryId, status, fields }) => {
            // Inquiry completed. Optionally tell your server about it.
            console.log(`Sending finished inquiry ${inquiryId} to backend`);
            console.log("completed", inquiryId, status);
          }}
        />
      </div>
    </div>
  );
}

export default InlineInquiry;
