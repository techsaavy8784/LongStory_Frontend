import { Address as AddressType } from "@/types/user";
import { useRouter } from "next/router";
const Address = ({
  address,
  selected,
  changeSelection,
}: {
  address: AddressType;
  selected: number | undefined;
  changeSelection: (e: any) => void;
}) => {
  const router = useRouter();
  const onEditAddress = () => {
    router.push(`/setting/billing/editAddress?id=${address.id}`);
  };
  return (
    <div className="w-full">
      <div className="flex justify-start gap-8 items-center">
        <input
          type="radio"
          name="address"
          id={`${address.id}`}
          value={address.id}
          onChange={changeSelection}
          checked={address.id === Number(selected)}
        />
        <label
          htmlFor={`${address.id}`}
          className="flex justify-start gap-8 items-start"
        >
          <div className="w-[349.5px]">
            <div className="mb-[10px]">Address:</div>
            <div className="text-base font-bold text-[#0F172A]">
              <div>{address.address},</div>
              <div>{address.city} City,</div>
              <div>{address.state},</div>
            </div>
          </div>
          <div className="w-[349.5px]">
            <div className="mb-[10px]">Phone:</div>
            <div className="text-base font-bold text-[#0F172A]">
              <div>{address.phone}</div>
            </div>
          </div>
        </label>
        <button
          className="px-5 py-[14px] border border-[#E2E8F0] rounded-[48px] text-base hover:bg-gray-900 hover:text-white"
          onClick={onEditAddress}
        >
          Edit Details
        </button>
      </div>
    </div>
  );
};

export default Address;
