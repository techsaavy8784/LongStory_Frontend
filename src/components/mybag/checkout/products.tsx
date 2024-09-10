import Product from "./product";
import { useAppSelector } from "@/types/hooks";
const Products = () => {
  const pendingOrderDetail = useAppSelector(
    (state) => state.order.pendingOrderDetail
  );
  return (
    <div className="w-full">
      <div className="text-xl font-semibold mb-4">Order Items</div>
      {pendingOrderDetail?.order_items.map((order_item, index) => {
        return (
          <div key={index}>
            <Product orderItem={order_item} />
            {index < pendingOrderDetail?.order_items.length - 1 && (
              <hr className="my-4 border-gray-100 " />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Products;
