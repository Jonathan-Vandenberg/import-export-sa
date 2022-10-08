import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(`${process.env.MONGO_DB}`);
    const db = client.db();
    const noteCollection = db.collection("notes");
    const result = await noteCollection.insertOne(data);

    client.close();
  }

  if (req.method === "DELETE") {
    const data = req.body;
    const client = await MongoClient.connect(`${process.env.MONGO_DB}`);
    const db = client.db();
    const noteCollection = db.collection("notes");
    const result = await noteCollection.deleteOne(data);

    client.close();
  }

  // if (req.method === "PUT") {
  //   const data = req.body;
  //   const client = await MongoClient.connect(`${process.env.MONGO_DB}`);
  //   const db = client.db();
  //   const noteCollection = db.collection("notes");
  //   const result = await noteCollection.updateOne(data)

  //   client.close();
  // }
};

export default handler;
