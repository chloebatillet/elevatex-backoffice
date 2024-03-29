import { relations } from "drizzle-orm";
import {
  integer,
  json,
  pgTable,
  real,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

import { Address, Contact } from "../types";

export const UsersTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    firstname: text("firstname").notNull(),
    lastname: text("lastname").notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    telephone: text("telephone"),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex("user_unique_idx").on(users.email),
    };
  }
);

export const ProductsTable = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    price: real("price").notNull(),
    reduced_price: real("reduced_price"),
    slug: text("slug").notNull(),
    description: text("description").notNull(),
    composition: text("composition").notNull(),
    entretien: text("entretien").notNull(),
    colour: json("colour").$type<string[]>().notNull(),
    collection: json("collection").$type<string[]>().notNull(),
    likes: integer("likes").notNull(),
    images: json("images").$type<string[]>().notNull(),
    releaseDate: text("releaseDate").notNull(),
    size_range: json("size_range").$type<number[]>().notNull(),
    size_available: json("size_available").$type<number[]>().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (products) => {
    return {
      uniqueIdx: uniqueIndex("product_unique_idx").on(products.title),
    };
  }
);

export const OrdersTable = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    user_id: integer("user_id")
      .notNull()
      .references(() => UsersTable.id),
    order_date: timestamp("order_date").defaultNow().notNull(),
    status: text("status").default("pending").notNull(),
    delivery_details: json("delivery_details").$type<Address>().notNull(),
    payment_mode: text("payment_mode").notNull(),
    payment_details: json("payment_details").$type<Contact>().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (orders) => {
    return {
      uniqueIdx: uniqueIndex("order_unique_idx").on(
        orders.user_id,
        orders.createdAt
      ),
    };
  }
);

export const OrderDetailsTable = pgTable(
  "order_details",
  {
    id: serial("id").primaryKey(),
    order_id: integer("order_id")
      .notNull()
      .references(() => OrdersTable.id),
    product_id: integer("product_id")
      .notNull()
      .references(() => OrdersTable.id),
    size: integer("size").notNull(),
    colour: text("colour").notNull(),
    price: integer("price").notNull(),
  },
  (order) => {
    return {
      uniqueIdx: uniqueIndex("order_details_unique_idx").on(
        order.order_id,
        order.product_id,
        order.size
      ),
    };
  }
);

// Relations ---------------------------------------
export const UsersRelations = relations(UsersTable, ({ many }) => ({
  ordersPassed: many(OrdersTable),
}));

export const ProductsRelations = relations(ProductsTable, ({ many }) => ({
  ordered: many(OrderDetailsTable),
}));

export const OrdersRelations = relations(OrdersTable, ({ one, many }) => ({
  client: one(UsersTable, {
    fields: [OrdersTable.user_id],
    references: [UsersTable.id],
  }),
  orderDetails: many(OrderDetailsTable),
}));

export const OrderDetailsRelations = relations(
  OrderDetailsTable,
  ({ one, many }) => ({
    products: many(ProductsTable),
    order: one(OrdersTable, {
      fields: [OrderDetailsTable.order_id],
      references: [OrdersTable.id],
    }),
  })
);
