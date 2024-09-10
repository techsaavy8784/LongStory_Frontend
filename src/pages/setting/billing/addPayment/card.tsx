import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import AddPaymentLayout from "@/components/settings/billing/addPaymentLayout";
import { useRouter } from "next/router";
import PaymentSelection from "@/components/settings/billing/paymentSelection";
import InputField2 from "@/components/InputField2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Payment as PaymentType } from "@/types/user";
import * as yup from "yup";
import { addPayment } from "@/redux/slices/user/paymentSlice";

const AddCard = () => {
  const router = useRouter();

  const onSubmit = (payment: PaymentType) => {
    payment.method = "card";
    try {
      console.log(payment);
      addPayment(payment);
      router.push("/setting/billing");
    } catch (err: any) {
      console.log(err);
    }
  };

  const schema = yup
    .object({
      name: yup.string().required("* Name is required"),
      provider: yup.string().required("* Card Number is required"),
      date: yup.string().required("* Expiry date is required"),
      cvc: yup.string().required("* CVC is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <AddPaymentLayout>
      <PaymentSelection methodType={"card"} />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col gap-4">
          <InputField2
            label="Name of Card"
            img="name"
            name="name"
            placeholder="Enter full name"
            formMethods={{ control, register }}
          >
            {errors.name?.message && (
              <p className="text-red">{errors.name?.message}</p>
            )}
          </InputField2>
          <InputField2
            label="Card Number"
            img="card"
            name="provider"
            placeholder="Enter 14 digit card number"
            formMethods={{ control, register }}
          >
            {errors.provider?.message && (
              <p className="text-red">{errors.provider?.message}</p>
            )}
          </InputField2>
          <InputField2
            label="Expiry Date"
            img="date"
            name="date"
            type="date"
            placeholder="Enter expiry date"
            formMethods={{ control, register }}
          >
            {errors.date?.message && (
              <p className="text-red">{errors.date?.message}</p>
            )}
          </InputField2>
          <InputField2
            label="CVC"
            img="password"
            type="password"
            name="cvc"
            placeholder="Enter 3 digits code"
            formMethods={{ control, register }}
          >
            {errors.cvc?.message && (
              <p className="text-red">{errors.cvc?.message}</p>
            )}
          </InputField2>
        </div>
        <button
          className="w-[356px] p-5 rounded-[48px] bg-gray-900 text-base text-white leading-4 hover:shadow-2xl mt-8"
          type="submit"
        >
          Save Payment Method
        </button>
      </form>
    </AddPaymentLayout>
  );
};

AddCard.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.main}>{page}</Layout>;
};

export default AddCard;
