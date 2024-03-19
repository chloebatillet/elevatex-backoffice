CREATE TABLE IF NOT EXISTS "order_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"size" integer NOT NULL,
	"colour" text NOT NULL,
	"price" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"order_date" timestamp DEFAULT now() NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"delivery_details" json NOT NULL,
	"payment_mode" text NOT NULL,
	"payment_details" json NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"price" integer NOT NULL,
	"slug" text NOT NULL,
	"description" text NOT NULL,
	"composition" text NOT NULL,
	"entretien" text NOT NULL,
	"colour" jsonb NOT NULL,
	"collection" jsonb NOT NULL,
	"likes" serial NOT NULL,
	"images" jsonb NOT NULL,
	"releaseDate" text NOT NULL,
	"size_range" jsonb NOT NULL,
	"size_available" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DROP INDEX IF EXISTS "unique_idx";--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "order_details_unique_idx" ON "order_details" ("order_id","product_id","size");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "order_unique_idx" ON "orders" ("user_id","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "product_unique_idx" ON "products" ("title");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_unique_idx" ON "users" ("email");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_details" ADD CONSTRAINT "order_details_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_details" ADD CONSTRAINT "order_details_product_id_orders_id_fk" FOREIGN KEY ("product_id") REFERENCES "orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
