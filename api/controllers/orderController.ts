import { OrderDetailsTable, OrdersTable } from "../drizzle/schema";
import { db } from "../drizzle/simple-connect";
import { Request, Response } from "express";

export const orderController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const orders = await db.query.OrdersTable.findMany({
        columns: { user_id: false },
        with: {
          client: {
            columns: {
              password: false,
              createdAt: false,
              updatedAt: false,
            },
          },
          orderDetails: {
            columns: {
              product_id: true,
              size: true,
              colour: true,
            },
            with: {
              products: {
                columns: {
                  id: true,
                  title: true,
                  price: true,
                  reduced_price: true,
                  slug: true,
                  images: true,
                },
              },
            },
          },
        },
      });
      return res.json(orders);
    } catch (error) {
      console.log(error);

      return res.status(400).json(error);
    }
  },

  getOne: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const order = await db.query.OrdersTable.findFirst({
        where: (order, { eq }) => eq(order.id, Number(id)),
        columns: { user_id: false },
        with: {
          client: {
            columns: {
              password: false,
              createdAt: false,
              updatedAt: false,
            },
          },
          orderDetails: {
            columns: {
              product_id: true,
              size: true,
              colour: true,
            },
            with: {
              products: {
                columns: {
                  id: true,
                  title: true,
                  price: true,
                  reduced_price: true,
                  slug: true,
                  images: true,
                },
              },
            },
          },
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
        columns: { user_id: false },
        with: {
          orderDetails: {
            columns: {
              product_id: true,
              size: true,
              colour: true,
            },
            with: {
              products: {
                columns: {
                  id: true,
                  title: true,
                  price: true,
                  reduced_price: true,
                  slug: true,
                  images: true,
                },
              },
            },
          },
        },
      });

      return res.json(orders);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      const { content } = req.body;

      const order = await db
        .insert(OrdersTable)
        .values(req.body)
        .returning({ id: OrdersTable.id });

      console.log(order[0].id);

      content.map(async (e: any) => {
        await db
          .insert(OrderDetailsTable)
          .values({ ...e, order_id: order[0].id });
      });

      // await db.insert(OrderDetailsTable).values({ ...req.body.content });

      return res.json("ヾ(＠⌒ー⌒＠)ノ Order received!");
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
