import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import useAuth from "@/hooks/useAuth";
import axios from "@/utils/axios";
import { useEffect, useState } from "react";
import IdVerification1 from "@/components/id-verification/id-verification1";
import IdVerification2 from "@/components/id-verification/id-verification2";
import IdVerification3 from "@/components/id-verification/id-verification3";
import { useRouter } from "next/navigation";

const IdVerification = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const { updateProfile } = useAuth();

  const onStep1: () => void = () => {
    setStep(2);
  };
  const onStep2: () => void = () => {
    setStep(3);
  };
  const onStep3: () => void = async () => {
    try {
      await updateProfile({ auth_status: 3 });
    } catch (err) {
      console.log(err);
    }
  };

  if (step === 1) return <IdVerification1 onStep1={onStep1} />;
  if (step === 2) return <IdVerification2 onStep2={onStep2} />;
  else return <IdVerification3 onStep3={onStep3} />;
};

export default IdVerification;
