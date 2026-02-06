import { db } from "../config/db";

export const Orders = {
    async top3Orders() {
        const [rowsDelivery] = await db.execute(`
                SELECT 
                DATE_FORMAT(orderDate, '%h:%i %p') AS orderTime, DATE_FORMAT(orderDate, '%d/%m/%Y') AS orderDate, orders.orderID, orderItemID,
                foodImg, foodName, foodDesc, quantity, 
                price*quantity as fullPrice, customerID, 
                status, address
                FROM order_items
                INNER JOIN orders ON order_items.orderID = orders.orderID
                INNER JOIN fastfood ON order_items.foodID = fastfood.foodID
                WHERE status LIKE 'pending'
                ORDER BY orders.orderDate DESC
                LIMIT 3
                `);
        return rowsDelivery;
    },

    async OrderHisto(customerID: number) {
        const [rowsOrdersHisto] = await db.execute(
            `SELECT DATE_FORMAT(orderDate, '%d/%m/%Y') AS orderDate,DATE_FORMAT(orderDate, '%h:%i %p') AS orderTime, orders.orderID, orderItemID,
        foodImg, foodName, foodDesc, quantity, price*quantity as fullPrice, customerID, 
        status, address
        FROM order_items
        INNER JOIN orders ON order_items.orderID = orders.orderID
        INNER JOIN fastfood ON order_items.foodID = fastfood.foodID
        WHERE customerID = ? AND status NOT LIKE 'pending' AND status NOT LIKE 'out_for_delivery'
        ORDER BY orders.orderDate ASC`, [customerID]
        );
        return rowsOrdersHisto;
    },

    //left to fix
    async Order(customerID: number, address: string, foodID: number, quantity: number) {
        const [insertOrder] = await db.execute(
            `
    INSERT INTO orders 
    (customerID, address) 
    VALUES
    (?, ?)
        `, [customerID, address]
        );
        const id = 'insertOrder.insertId'

        await db.execute(
            `
    INSERT INTO order_items 
    (orderID, foodID, quantity) 
    VALUES
    (?, ?, ?)
        `, [id, foodID, quantity]
        );
    },

    async LiveOrders() {
        const [rowsLiveOrders] = await db.execute(
            `
        SELECT 
        DATE_FORMAT(orderDate, '%h:%i %p') AS orderTime, DATE_FORMAT(orderDate, '%d/%m/%Y') AS orderDate, orders.orderID, orderItemID,
        foodImg, foodName, foodDesc, quantity, 
        price*quantity as fullPrice, customerID, 
        status, address
        FROM order_items
        INNER JOIN orders ON order_items.orderID = orders.orderID
        INNER JOIN fastfood ON order_items.foodID = fastfood.foodID
        WHERE status LIKE 'pending'
        ORDER BY orders.orderDate DESC
        `
        );
        return rowsLiveOrders;
    },

    async takeToDeliver(orderID: number, deliveryManID: number) {
        await db.execute(
            `
            INSERT INTO delivery (orderID, deliveryManID) 
            VALUES (?, ?)
        `, [orderID, deliveryManID]
        );
        await db.execute(
            `
            UPDATE orders SET orders.status = 'out_for_delivery' 
            WHERE orders.orderID = ?; 
        `, [orderID]
        );
    },

    async ActiveOrders(customerID: number) {
        const [rowsActiveOrders] = await db.execute(
            `SELECT 
        DATE_FORMAT(orderDate, '%h:%i %p %d/%m/%Y') AS orderDate, orders.orderID, orderItemID,
        foodImg, foodName, foodDesc, quantity, 
        price*quantity as fullPrice, customerID, 
        status, address
        FROM order_items
        INNER JOIN orders ON order_items.orderID = orders.orderID
        INNER JOIN fastfood ON order_items.foodID = fastfood.foodID
        WHERE customerID = ? AND status NOT LIKE 'delivered' AND status NOT LIKE 'canceled'
        ORDER BY orders.orderDate DESC`
            , [customerID]
        )
        return rowsActiveOrders
    },

    async CancelOrder(orderID: number) {
        const [rowsCancel] = await db.execute(`
            UPDATE orders SET status = 'canceled' WHERE orderID = ?;
        `, [orderID]);
        return rowsCancel;
    },

}