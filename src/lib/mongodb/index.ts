import type { MongoClient as MongoClientType } from "mongodb";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { MongoClient } = require("mongodb") as {
  MongoClient: typeof MongoClientType;
};

const MONGODB_URI: string = process.env.MONGODB_URI ?? "";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not defined");
}

let client: MongoClientType | null = null;
let clientPromise: Promise<MongoClientType>;

async function connect(): Promise<MongoClientType> {
  if (client) return client;
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
  return clientPromise;
}

export async function getClient(): Promise<MongoClientType> {
  return connect();
}

export async function getDb(dbName = "techsphere") {
  const c = await getClient();
  return c.db(dbName);
}
