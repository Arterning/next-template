import { pgTable, text, timestamp, boolean, integer, varchar, primaryKey } from "drizzle-orm/pg-core";

// Better Auth Tables
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  role: text("role").notNull().default("user"), // user, admin
  stripeCustomerId: text("stripeCustomerId"),
  subscriptionStatus: text("subscriptionStatus"), // active, canceled, past_due, etc.
  subscriptionPlan: text("subscriptionPlan"), // free, pro, enterprise
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expiresAt").notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  expiresAt: timestamp("expiresAt"),
  password: text("password"),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
});

// Stripe Products & Prices
export const product = pgTable("product", {
  id: text("id").primaryKey(), // Stripe product ID
  name: text("name").notNull(),
  description: text("description"),
  active: boolean("active").notNull().default(true),
  metadata: text("metadata"), // JSON string
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const price = pgTable("price", {
  id: text("id").primaryKey(), // Stripe price ID
  productId: text("productId")
    .notNull()
    .references(() => product.id, { onDelete: "cascade" }),
  active: boolean("active").notNull().default(true),
  currency: text("currency").notNull().default("usd"),
  unitAmount: integer("unitAmount").notNull(), // Amount in cents
  interval: text("interval"), // month, year, etc.
  intervalCount: integer("intervalCount").default(1),
  trialPeriodDays: integer("trialPeriodDays"),
  metadata: text("metadata"), // JSON string
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// Subscriptions
export const subscription = pgTable("subscription", {
  id: text("id").primaryKey(), // Stripe subscription ID
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  status: text("status").notNull(), // active, canceled, past_due, etc.
  priceId: text("priceId")
    .notNull()
    .references(() => price.id),
  quantity: integer("quantity").default(1),
  cancelAtPeriodEnd: boolean("cancelAtPeriodEnd").notNull().default(false),
  canceledAt: timestamp("canceledAt"),
  currentPeriodStart: timestamp("currentPeriodStart").notNull(),
  currentPeriodEnd: timestamp("currentPeriodEnd").notNull(),
  endedAt: timestamp("endedAt"),
  trialStart: timestamp("trialStart"),
  trialEnd: timestamp("trialEnd"),
  metadata: text("metadata"), // JSON string
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// Type exports
export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
export type Session = typeof session.$inferSelect;
export type Account = typeof account.$inferSelect;
export type Product = typeof product.$inferSelect;
export type Price = typeof price.$inferSelect;
export type Subscription = typeof subscription.$inferSelect;
