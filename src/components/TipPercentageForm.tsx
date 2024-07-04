import { OrderActions } from "../reducers/order-reducer";

const tipOptions = [
   {
      id: "tip-10",
      value: 0.1,
      label: "10%",
   },
   {
      id: "tip-20",
      value: 0.2,
      label: "20%",
   },
   {
      id: "tip-50",
      value: 0.5,
      label: "50%",
   },
];

type TipPercentageFormProps = {
   dispatch: React.Dispatch<OrderActions>;
   tip: number;
};

export default function TipPercentageForm({
   dispatch,
   tip,
}: TipPercentageFormProps) {
   return (
      <div>
         <h2 className="text-2xl font-black">Propina</h2>

         <form>
            {tipOptions.map((option) => (
               <div key={option.id} className="flex items-center space-x-2">
                  <input
                     type="radio"
                     name="tip"
                     id={option.id}
                     value={option.value}
                     onChange={(e) =>
                        dispatch({
                           type: "SET-TIP",
                           payload: { tip: +e.target.value },
                        })
                     }
                     checked={tip === option.value}
                  />
                  <label htmlFor={option.id}>{option.label}</label>
               </div>
            ))}
         </form>
      </div>
   );
}
