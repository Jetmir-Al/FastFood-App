import { db } from "../config/db";


export const DeliveryModal = {
    async updateDelivery(userID: number, deliveryID: number) {
        await db.execute(`
                UPDATE delivery SET deliveryManID = ?
                WHERE deliveryID = ?;
            `, [userID, deliveryID]);

        return { message: "Update Successfully!" };
    },


    async DeliveryHistory(userID: number) {
        const [rowsDeliveryHistory] = await db.execute(`
    SELECT deliveryID,deliveryManID, orders.orderID, customerID, address, 
    orderDate,UPPER(status) as status, delivered,
    foodName, foodDesc, foodImg, quantity, price*quantity as fullPrice
    FROM delivery 
    INNER JOIN orders ON delivery.orderID = orders.orderID 
    INNER JOIN order_items on orders.orderID = order_items.orderID
    INNER JOIN fastfood on order_items.foodID = fastfood.foodID
    WHERE deliveryManID = ? 
      AND (orders.status LIKE 'delivered' OR orders.status LIKE 'canceled')
    ORDER BY orders.orderDate ASC;
            `, [userID]);
        return rowsDeliveryHistory;
    },

    async allDeliveries() {
        const [rowsDeliverys] = await db.execute(`
            SELECT 
        delivery.deliveryID as deliveryID,
        deliveryManID,
        deliveryMen.name as deliveryMan,
        orders.orderID as orderID,
        customers.name as customer,
        address,
        orderDate,
        status,
        foodName,
        quantity,
        price * quantity AS fullPrice
    FROM
        delivery
            INNER JOIN
        orders ON delivery.orderID = orders.orderID
            INNER JOIN
        order_items ON orders.orderID = order_items.orderID
            INNER JOIN
        fastfood ON order_items.foodID = fastfood.foodID
        INNER JOIN
        users as customers ON orders.customerID = customers.userID
        INNER JOIN 
        users as deliveryMen ON delivery.deliveryManID = deliveryMen.userID
        ORDER BY orders.orderDate DESC
            `);
        return rowsDeliverys;
    },

    async deleteDelivery(deliveryID: number) {
        await db.execute(`
            DELETE FROM delivery WHERE deliveryID = ?
            `, [deliveryID]);

        return { message: "Deleted Successfully!" };

    },

    async activeDelivery(userID: number) {
        const [rowsDeliveryActive] = await db.execute(`
    SELECT deliveryID,deliveryManID, orders.orderID, customerID, address, 
    orderDate, status, delivered,
    foodName, foodDesc, foodImg, quantity, price*quantity as fullPrice 
    FROM delivery 
    INNER JOIN orders ON delivery.orderID = orders.orderID 
    INNER JOIN order_items on orders.orderID = order_items.orderID
    INNER JOIN fastfood on order_items.foodID = fastfood.foodID
    WHERE deliveryManID = ? AND orders.status NOT LIKE 'delivered' AND orders.status NOT LIKE 'canceled'
    ORDER BY orderDate DESC;
            `, [userID]);
        return rowsDeliveryActive;
    },

    async updAsDelivered(deliveryID: number) {
        await db.execute(`
            UPDATE delivery SET delivery.delivered = true
            WHERE deliveryID = ?;
            `, [deliveryID]);

        return { message: "Updated Successfully!" };
    },

    async updateOrderAsDelivered(orderID: number) {
        await db.execute(`
             UPDATE orders SET orders.status = 'delivered'
            WHERE orders.orderID = ?;
            `, [orderID]);

        return { message: "Updated Successfully!" };
    },
}