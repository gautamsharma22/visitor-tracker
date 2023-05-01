const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://root:root@cluster0.s1a1yrw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    const db = client.db("mydb");
    const users = [
      { name: "Gautam Sharma", age: 30 },
      { name: "Ashh ", age: 25 },
    ];
    await db.collection("users").insertMany(users);
    console.log(`${users.length} documents inserted into the users collection`);
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
