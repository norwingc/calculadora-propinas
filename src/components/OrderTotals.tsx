import { useMemo } from "react";
import type { OrderItem } from "../types";
import { formatCurrency } from "../helpers";
import { OrderActions } from "../reducers/order-reducer";

type OrderTotalProps = {
   order: OrderItem[];
   tip: number;
   dispatch: React.Dispatch<OrderActions>;
};

export default function OrderTotals({ order, tip, dispatch }: OrderTotalProps) {
   const subTotalAmount = useMemo(() => {
      return order.reduce(
         (total, item) => total + item.price * item.quantity,
         0
      );
   }, [order]);

   const tipAmount = useMemo(() => {
      return subTotalAmount * tip;
   }, [subTotalAmount, tip]);

   const totalAmount = useMemo(() => {
      return subTotalAmount + tipAmount;
   }, [subTotalAmount, tipAmount]);

   return (
      <>
         <div className="space-y-3">
            <h2 className="font-black text-2xl">Totales y propinas:</h2>
            <p>
               Subtotal a pagar: {""}
               <span className="font-bold">
                  {formatCurrency(subTotalAmount)}
               </span>
            </p>
            <p>
               Propina: {""}
               <span className="font-bold">{formatCurrency(tipAmount)}</span>
            </p>
            <p>
               Total a pagar: {""}
               <span className="font-bold">{formatCurrency(totalAmount)}</span>
            </p>
         </div>
         <button
            className="w-full bg-black p-3 uppercase text-white font-bold mt-10 disabled:opacity-10"
            disabled={totalAmount === 0}
            onClick={() => dispatch({ type: "PLACE-ORDER" })}
         >
            Guardar Orden
         </button>
      </>
   );
}
