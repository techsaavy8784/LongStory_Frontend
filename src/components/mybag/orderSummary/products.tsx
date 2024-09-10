import Product from "./product";
import { useAppSelector } from "@/types/hooks";
const Products = () => {
  const pendingOrderDetail = useAppSelector(
    (state) => state.order.pendingOrderDetail
  );
  return (
    <div className="w-[937px]">
      <div className="mb-6">
        <div className="mb-4 flex justify-between items-end">
          <div>
            <div className="text-lg font-semibold">Cart Items</div>
            <div className="text-sm font-normal text-[#0F172A]">
              Items that you&apos;ve added to your Cart
            </div>
          </div>
        </div>
        <hr className="border-gray-100" />
      </div>
      <div className="flex flex-col">
        {pendingOrderDetail?.order_items.map((orderItem, index) => {
          return (
            <div key={index}>
              <Product orderItem={orderItem} />
              {index < pendingOrderDetail?.order_items.length - 1 && (
                <hr className="my-8 border-gray-100 " />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
