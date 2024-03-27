import { eq } from "drizzle-orm";
import { ProductsTable } from "../drizzle/schema";
import { db } from "../drizzle/simple-connect";
import { Request, Response } from "express";

export const productController = {
  getAll: async (req: Request, res: Response) => {
    try {
      const products = await db.query.ProductsTable.findMany();
      return res.json(products);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  getOne: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await db.query.ProductsTable.findFirst({
        where: (prod, { eq }) => eq(prod.id, Number(id)),
      });
      return product
        ? res.json(product)
        : res.status(404).json("(┬┬﹏┬┬) Product not found!");
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  create: async (req: Request, res: Response) => {
    try {
      console.log(req.body);

      const alreadyExists = await db.query.ProductsTable.findFirst({
        where: (prod, { eq }) => eq(prod.title, req.body.title.toLowerCase()),
      });

      if (alreadyExists) {
        return res
          .status(400)
          .json(
            "(┬┬﹏┬┬) It looks like this product already exists. Try to update it or change the title."
          );
      }

      await db.insert(ProductsTable).values(req.body);

      return res.json("ヾ(＠⌒ー⌒＠)ノ Product created succesfully!");
    } catch (error) {
      console.log(error);

      return res.status(400).json(error);
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      console.log(req.body);
      

      const product = await db.query.ProductsTable.findFirst({
        where: (prod, { eq }) => eq(prod.id, Number(id)),
      });

      if (!product) {
        return res.status(404).json("(┬┬﹏┬┬) Product not found!");
      }

      await db
        .update(ProductsTable)
        .set(req.body)
        .where(eq(ProductsTable.id, Number(id)));

      return res.json("ヾ(＠⌒ー⌒＠)ノ Infos updated succesfully!");
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const product = await db.query.ProductsTable.findFirst({
        where: (prod, { eq }) => eq(prod.id, Number(id)),
      });

      if (!product) {
        return res.status(404).json("(┬┬﹏┬┬) Product not found!");
      }

      await db.delete(ProductsTable).where(eq(ProductsTable.id, Number(id)));

      return res.json("ヾ(＠⌒ー⌒＠)ノ Product deleted succesfully!");
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};
