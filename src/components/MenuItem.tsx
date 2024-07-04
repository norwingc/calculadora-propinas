import { OrderActions } from "../reducers/order-reducer";
import type { MenuItem } from "../types";

type menuItemProps = {
   item: MenuItem;
   dispatch: React.Dispatch<OrderActions>;
};

export default function MenuItem({ item, dispatch }: menuItemProps) {
   return (
      <button
         className="border-2 border-teal-400 w-full p-3 flex justify-between hover:bg-teal-200"
         onClick={() => dispatch({ type: "ADD-ITEM", payload: { item } })}
      >
         <p>{item.name}</p>
         <p className="font-black">${item.price}</p>
      </button>
   );
}
