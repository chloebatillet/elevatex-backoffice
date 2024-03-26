import { db } from "../drizzle/simple-connect";
import { Request, Response } from "express";

export const productController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const products = await db.query.ProductsTable.findMany();
      return res.json(products);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};
