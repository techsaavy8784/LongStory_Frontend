import Layout from "@/components/layouts/layout";
import { LAYOUT } from "@/constants";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import InputField2 from "@/components/InputField2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Address as AddressType } from "@/types/user";
import * as yup from "yup";
import useAuth from "@/hooks/useAuth";
import { addAddress } from "@/redux/slices/user/addressSlice";

const AddAddress = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const schema = yup
    .object({
      name: yup.string().required("* Name is required"),
      address: yup.string().required("* Address is required"),
      city: yup.string().required("* City is required"),
      state: yup.string().required("* State is required"),
      zip: yup.string().required("* Zip is required"),
      country: yup.string().required("* Country is required"),
      phone: yup.string().required("* Phone is required"),
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

  const onSubmit = async (address: AddressType) => {
    try {
      addAddress(address);
      router.push("/setting/billing");
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="px-8 py-5 text-2xl font-bold">
        Billing & Shipping Info
      </div>
      <div className="p-16 flex flex-col gap-6 w-[876px]">
        <div className="flex flex-col gap-8">
          <div className="flex justify-between pb-4 border-b-1 border-[#CBD5E1]">
            <span className="text-lg leading-[27px] font-semibold">
              Add payment method
            </span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <InputField2
                    label="Name"
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
                    label="Phone number"
                    img="phone"
                    placeholder="Enter phone number"
                    name="phone"
                    formMethods={{ control, register }}
                  >
                    {errors.phone?.message && (
                      <p className="text-red">{errors.phone?.message}</p>
                    )}
                  </InputField2>
                </div>
                <div className="flex justify-between">
                  <InputField2
                    label="Country"
                    img="country"
                    placeholder="Select Country"
                    name="country"
                    formMethods={{ control, register }}
                  >
                    {errors.country?.message && (
                      <p className="text-red">{errors.country?.message}</p>
                    )}
                  </InputField2>

                  <InputField2
                    label="State"
                    img="state"
                    placeholder="Enter state"
                    name="state"
                    formMethods={{ control, register }}
                  >
                    {errors.state?.message && (
                      <p className="text-red">{errors.state?.message}</p>
                    )}
                  </InputField2>
                </div>

                <div className="flex justify-between">
                  <InputField2
                    label="City"
                    img="city"
                    placeholder="Select Country"
                    name="city"
                    formMethods={{ control, register }}
                  >
                    {errors.city?.message && (
                      <p className="text-red">{errors.city?.message}</p>
                    )}
                  </InputField2>

                  <InputField2
                    label="Zip"
                    img="zip"
                    placeholder="Enter zip code"
                    name="zip"
                    formMethods={{ control, register }}
                  >
                    {errors.zip?.message && (
                      <p className="text-red">{errors.zip?.message}</p>
                    )}
                  </InputField2>
                </div>
                <InputField2
                  label="Shipping Address"
                  img="address"
                  placeholder="Enter address"
                  className="w-[748px]"
                  name="address"
                  formMethods={{ control, register }}
                >
                  {errors.address?.message && (
                    <p className="text-red">{errors.address?.message}</p>
                  )}
                </InputField2>
              </div>
              <div className="flex flex-col gap-4 text-[#0F172A]">
                <label
                  htmlFor="address"
                  className="text-base leading-[20.16px] font-semibold"
                >
                  Billing address
                </label>
                <div className="flex justify-start gap-[10px]">
                  <input type="radio" name="address" value="1" id="address" />
                  <label htmlFor="address" className="text-sm leading-[21px]">
                    Same as shipping address
                  </label>
                </div>
              </div>
              <button
                className="w-[356px] p-5 rounded-[48px] bg-gray-900 text-base text-white leading-4 hover:shadow-2xl"
                // onClick={onSavePaymentMethod}
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

AddAddress.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout variant={LAYOUT.main}>{page}</Layout>;
};

export default AddAddress;
