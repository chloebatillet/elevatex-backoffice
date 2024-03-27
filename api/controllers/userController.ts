import { eq } from "drizzle-orm";
import { UsersTable } from "../drizzle/schema";
import { db } from "../drizzle/simple-connect";
import { Request, Response } from "express";

export const userController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const clients = await db.query.UsersTable.findMany({
        columns: {
          password: false,
        },
        with: {
          ordersPassed: {
            with: {
              orderDetails: true,
            },
          },
        },
      });
      return res.json(clients);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  getOne: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const client = await db.query.UsersTable.findFirst({
        where: (users, { eq }) => eq(users.id, Number(id)),
        columns: {
          password: false,
        },
        with: {
          ordersPassed: {
            with: {
              orderDetails: true,
              // {
              //   with: {
              //     products: true,
              //   },
              // },
            },
          },
        },
      });

      return client
        ? res.json(client)
        : res.status(404).json(`No user found with id ${id}`);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  newClient: async (req: Request, res: Response) => {
    try {
      const alreadyExists = await db.query.UsersTable.findFirst({
        where: (user, { eq }) => eq(user.email, req.body.email.toLowerCase()),
      });

      if (alreadyExists) {
        return res
          .status(400)
          .json("(┬┬﹏┬┬) This email is already used. Try to login instead!");
      }

      await db.insert(UsersTable).values(req.body);

      return res.json("ヾ(＠⌒ー⌒＠)ノ Account created succesfully!");
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  updateClientInfo: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const clientExists = await db.query.UsersTable.findFirst({
        where: (user, { eq }) => eq(user.id, Number(id)),
      });

      if (!clientExists) {
        return res.status(404).json("(┬┬﹏┬┬) User not found!");
      }

      if (req.body.email) {
        const existingEmail = await db.query.UsersTable.findFirst({
          where: (user, { eq }) => eq(user.email, req.body.email.toLowerCase()),
        });

        if (existingEmail) {
          return res.status(400).json("(┬┬﹏┬┬) Email already used!");
        }
      }

      await db
        .update(UsersTable)
        .set(req.body)
        .where(eq(UsersTable.id, Number(id)));

      return res.json("ヾ(＠⌒ー⌒＠)ノ Infos updated succesfully!");
    } catch (error) {
      console.log(error);

      return res.status(400).json(error);
    }
  },
};
