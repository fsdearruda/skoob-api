import { MongoClient } from "mongodb";

async function connect() {
  const client = await MongoClient.connect(process.env.MONGO_URI!);
  return client.db("skoob-api");
}

export default connect;
