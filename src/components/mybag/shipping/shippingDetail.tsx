import Address from "./address";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/types/hooks";
import { fetchAddresses } from "@/redux/slices/user/addressSlice";
import { useRouter } from "next/router";


const ShippingDetail = ({
  onSelected,
  selected,
}: {
  onSelected: (select_id: number | undefined) => void;
  selected: number | undefined;
}) => {
  const addresses = useAppSelector((state) => state.address.addresses);
  
  const router = useRouter();
  
  const onChangeSelection = (e: any) => {
    onSelected(Number(e.target.value));
  };
  const onAddAddress = () => {
    router.push("/setting/billing/addAddress");
  };
  useEffect(() => {
    fetchAddresses();
  }, []);

  
  return (
    <div className="w-[937px]">
      <div className="mb-8">
        <div className="mb-4 flex justify-between items-end">
          <div>
            <div className="text-lg font-semibold">Shipping Details</div>
            <div className="text-sm font-normal text-[#0F172A]">
              Please select the shipping details
            </div>
          </div>
          <button
            className="text-sm font-semibold underline"
            onClick={onAddAddress}
          >
            Add a new address
          </button>
        </div>
        <hr className="border-gray-100" />
      </div>
      <div className="flex flex-col">
        {addresses.map((address, index) => {
          return (
            <div key={index}>
              <Address
                address={address}
                changeSelection={onChangeSelection}
                selected={selected}
              />
              {index + 1 < addresses.length && (
                <hr className="border-gray-100 my-6" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShippingDetail;
