import { MongoClient } from "mongodb";

async function connect() {
  const client = await MongoClient.connect(process.env.MONGO_URL!);
  return client.db("skoob");
}

export default connect;
