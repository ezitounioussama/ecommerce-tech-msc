import { MongoClient } from "mongodb";

const MONGODB_URI: string = process.env.MONGODB_URI ?? "";

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI environment variable is not defined");
}

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

async function connect(): Promise<MongoClient> {
  if (client) return client;
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
  return clientPromise;
}

export async function getClient(): Promise<MongoClient> {
  return connect();
}

export async function getDb(dbName = "techsphere") {
  const c = await getClient();
  return c.db(dbName);
}
