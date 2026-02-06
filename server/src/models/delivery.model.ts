import { db } from "../config/db";


export const DeliveryModal = {
    async updateDelivery(deliveryID: number, userID: number, address: string, orderID: number, status: string) {
        await db.execute(`
                UPDATE delivery SET deliveryManID = ?
                WHERE delivery.deliveryID = ?;
            `, [userID, deliveryID]);
        await db.execute(`
                UPDATE orders SET orders.status = ?, orders.address = ?
                WHERE orders.orderID = ?
            `, [status, address, orderID]);

        if (status == 'delivered') {
            await db.execute(`
                    UPDATE delivery SET delivery.delivered = true
                    WHERE delivery.deliveryID = ?;
                    `, [deliveryID])
        }
    },
    async DeliveryHistory(userID: number) {
        const [rowsDeliveryHistory] = await db.execute(`
    SELECT deliveryID,deliveryManID, orders.orderID, customerID, address, 
    DATE_FORMAT(orderDate, '%d/%m/%Y') AS orderDate,UPPER(status) as status, delivered,
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
        deliveryID,
        deliveryManID,
        deliveryMen.name as deliveryMan,
        orders.orderID as orderID,
        customers.name as customer,
        address,
        DATE_FORMAT(orderDate, '%d/%m/%Y') AS orderDate,
        DATE_FORMAT(orderDate, '%h:%i %p') AS orderTime,
        UPPER(status) AS status,
        delivered,
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
    },

    async activeDelivery(userID: number) {
        const [rowsDeliveryActive] = await db.execute(`
    SELECT deliveryID,deliveryManID, orders.orderID, customerID, address, 
    DATE_FORMAT(orderDate, '%h:%i %p %d/%m/%Y') AS orderDate, status, delivered,
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

    async updAsDelivered(deliveryID: number, orderID: number) {
        await db.execute(`
            UPDATE delivery SET delivery.delivered = true
            WHERE delivery.deliveryID = ?;
            `, [deliveryID]);
        await db.execute(`
            UPDATE orders SET orders.status = 'delivered' 
            WHERE orders.orderID = ?
            `, [orderID]);
    },
}