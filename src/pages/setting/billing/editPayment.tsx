import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import InputField2 from "@/components/InputField2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Payment as PaymentType } from "@/types/user";
import * as yup from "yup";
import {
  getPayment,
  editPayment,
  deletePayment,
} from "@/redux/slices/user/paymentSlice";
import { useAppSelector } from "@/types/hooks";
import { useEffect } from "react";

const EditPayment = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { id } = router.query;
  const payment = useAppSelector((state) => state.payment.payment);

  const onSubmit = (paymentEdited: PaymentType) => {
    paymentEdited.method = payment?.method;
    try {
      console.log(paymentEdited);
      editPayment(paymentEdited, payment?.id);
      router.push("/setting/billing");
    } catch (err: any) {
      console.log(err);
    }
  };

  const onDeleteMethod = () => {
    deletePayment(payment?.id);
    router.push("/setting/billing");
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
    reset,
    setError,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    getPayment(id as string);
  }, [id]);

  useEffect(() => {
    console.log(payment);
    reset({
      name: payment?.name ? payment?.name : "",
      provider: payment?.provider ? payment?.provider : "",
      date: payment?.date ? payment?.date.slice(0, 10) : "",
      cvc: payment?.cvc ? payment?.cvc : "",
    });
  }, [payment]);

  return (
    <div>
      <div className="px-8 py-5 text-2xl font-bold">
        Billing & Shipping Info
      </div>
      <div className="p-16 flex flex-col gap-12 w-[876px]">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between pb-4 border-b-1 border-[#CBD5E1]">
            <span className="text-lg leading-[27px] font-semibold">
              Edit payment method
            </span>
            <button
              className="leading-[21px] text-[#0F172A] underline hover:text-blue-500"
              onClick={onDeleteMethod}
            >
              Delete payment method
            </button>
          </div>
          <div className="flex flex-col gap-8">
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
                  name="cvc"
                  type="password"
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
          </div>
        </div>
      </div>
    </div>
  );
};

EditPayment.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.main}>{page}</Layout>;
};

export default EditPayment;
