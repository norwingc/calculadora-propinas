import { MenuItem, OrderItem } from "../types";

export type OrderActions =
   | { type: "ADD-ITEM"; payload: { item: MenuItem } }
   | { type: "REMOVE-ITEM"; payload: { id: MenuItem["id"] } }
   | { type: "PLACE-ORDER" }
   | { type: "SET-TIP"; payload: { tip: number } };

export type OrderState = {
   order: OrderItem[];
   tip: number;
};

export const initialState: OrderState = {
   order: [],
   tip: 0,
};

export const orderReducer = (state: OrderState, action: OrderActions) => {
   if (action.type === "ADD-ITEM") {
      const itemExists = state.order.find(
         (orderItem) => orderItem.id === action.payload.item.id
      );

      let order: OrderItem[] = [];

      if (itemExists) {
         order = state.order.map((orderItem) => {
            if (orderItem.id === action.payload.item.id) {
               return {
                  ...orderItem,
                  quantity: orderItem.quantity + 1,
               };
            }
            return orderItem;
         });
      } else {
         order = [...state.order, { ...action.payload.item, quantity: 1 }];
      }

      return {
         ...state,
         order,
      };
   }
   if (action.type === "REMOVE-ITEM") {
      const order = state.order.filter(
         (orderItem) => orderItem.id !== action.payload.id
      );
      return {
         ...state,
         order,
      };
   }
   if (action.type === "PLACE-ORDER") {
      return {
         order: [],
         tip: 0,
      };
   }
   if (action.type === "SET-TIP") {
      return {
         ...state,
         tip: action.payload.tip,
      };
   }

   return state;
};
