import { useRouter } from "next/router";
import { Address as AddressType } from "@/types/user";
import axios from "@/utils/axios";
import useAuth from "@/hooks/useAuth";
import { setUser } from "@/redux/slices/auth/authSlice";
import { setAsDefault } from "@/redux/slices/user/addressSlice";
import { getAddress } from "@/redux/slices/user/addressSlice";

const Address = ({
  address,
  defaultAddress,
}: {
  address: AddressType;
  defaultAddress: boolean | undefined;
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const onEditAddress = () => {
    router.push(`/setting/billing/editAddress?id=${address.id}`);
  };
  const onSetDefaultAddress = async () => {
    const is_default = address.is_default;
    console.log(address.id, address.is_default);
    try {
      setAsDefault(address.id);
    } catch (err: any) {
      console.log(err);
    }
  };
  return (
    <div
      className={
        "px-6 py-4 flex justify-between items-center w-full " +
        (defaultAddress ? "bg-[#F1F5F9]" : "bg-white")
      }
    >
      <div className="flex justify-start itmes-center gap-12 text-xs leading-[18px] text-[#0F172A] font-normal">
        <div className="w-[95px]">
          <div className="leading-[21px] font-bold mb-1">{address.name}</div>
          <div>{address.phone}</div>
        </div>
        <div className="w-[135px]">
          <p>{address.address}</p>
          <p>
            {address.city}, {address.state}
          </p>
        </div>
        <div>
          <p>{address.country}</p>
          <p>{address.zip}</p>
        </div>
      </div>
      <div className="flex justify-start gap-2">
        <button
          className={
            "px-4 py-2 rounded-[48px] text-sm text-black leading-[21px] border-1 border-[#E2E8F0]  " +
            (defaultAddress ? "bg-[#E2E8F0]" : "bg-white hover:shadow-xl")
          }
          onClick={onSetDefaultAddress}
          disabled={defaultAddress}
        >
          {defaultAddress ? "Default" : "Set as Default"}
        </button>
        <button
          className="px-4 text-sm py-2 rounded-[48px] text-white leading-[21px] bg-[#0F172A] hover:shadow-xl"
          onClick={onEditAddress}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default Address;
