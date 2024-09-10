import MenuItem from "./menuItem";
import { menuListData } from "./menuData";

const MenuItemList = ({ small }: { small: boolean }) => {
  return (
    <div className="flex flex-col gap-4">
      {menuListData.map((menuItemData, index) => {
        return (
          <MenuItem key={index} menuItemData={menuItemData} small={small} />
        );
      })}
    </div>
  );
};

export default MenuItemList;
