import { db } from "../drizzle/simple-connect";
import { Request, Response } from "express";

export const orderController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const orders = await db.query.OrdersTable.findMany({
        with: {
          client: true,
        },
      });
      return res.json(orders);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  getOne: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const order = await db.query.OrdersTable.findFirst({
        where: (order, { eq }) => eq(order.id, Number(id)),
        with: {
          client: true,
          orderDetails: true,
        },
      });

      return order === undefined
        ? res.json(`No order found with id ${id}`)
        : res.json(order);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  getAllFromClient: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const order = await db.query.OrdersTable.findFirst({
        where: (order, { eq }) => eq(order.user_id, Number(id)),
        with: {
          orderDetails: true,
        },
      });

      return order === undefined
        ? res.json(`No user found with id ${id}`)
        : res.json(order);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
