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
      return res.status(400).json(error);
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

      return order
        ? res.json(order)
        : res.status(404).json(`(┬┬﹏┬┬) No order found with id ${id}`);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  getAllFromClient: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const client = await db.query.UsersTable.findFirst({
        where: (user, { eq }) => eq(user.id, Number(id)),
      });

      if (!client) {
        return res.status(404).json(`(┬┬﹏┬┬) No user found with id ${id}`);
      }

      const orders = await db.query.OrdersTable.findMany({
        where: (order, { eq }) => eq(order.user_id, Number(id)),
        with: {
          orderDetails: true,
        },
      });

      return res.json(orders);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
