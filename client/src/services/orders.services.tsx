import { getActiveOrders, getLiveOrder, orderForm } from "../api/order.api"
import Error from "../utils/Error"


export const useGetActiveOrders = () => {
    return async function () {
        try {
            const res = await getActiveOrders();
            return res;
        } catch {
            return <Error
                title="Error getting live orders"
                details={null}
                onRetry={async () => await getActiveOrders()}
            />
        }
    }
}

export const useOrderForm = () => {
    return async function (address: string, foodID: number, quantity: number) {
        try {
            const res = await orderForm(address, foodID, quantity);
            return res;
        } catch {
            return "Problem with form!";
        }
    }
}