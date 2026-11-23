import { getActiveOrders, getLiveOrder, orderForm } from "../api/order.api"
import type { IOrderParams } from "../types/orderTypes"
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
export const useGetLiveOrders = () => {
    return async function (params: IOrderParams) {
        try {
            const res = await getLiveOrder(params);
            return res;
        } catch {
            return <Error
                title="Error getting live orders"
                details={null}
                onRetry={async () => await getLiveOrder(params)}
            />
        }
    }
}

export const useOrderForm = () => {
    return async function (address: string, foodID: number, quantity: number) {
        return await orderForm(address, foodID, quantity);
    }
}