import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority';

let cachedClient = null;

export async function connectToDatabase() {
  if (cachedClient && cachedClient.isConnected()) {
    return { client: cachedClient, db: cachedClient.db('<database-name>') };
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedClient = client;

  return { client, db: client.db('<database-name>') };
}
