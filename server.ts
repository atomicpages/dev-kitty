//Declare variables
import { fileURLToPath } from "node:url";
import assert from "node:assert";
import path from "node:path";
import express from "express"; //returns a function reference, that function is called with express()
import { Db, MongoClient, ObjectId } from "mongodb";
import { env } from "./env";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); //app is an object returned by express();
const PORT = env.PORT; //setting up the listening port

let db: Db;
let client: MongoClient;
let dbConnectionStr = env.DB_STRING;

//Set middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
// app.use(express.static("public")); // Serve static files from public directory

// API Routes
// GET all questions
app.get("/api/questions", async (req, res, next) => {
  try {
    const questions = await db.collection("DevKittyQuestions").find().toArray();

    // Convert ObjectId to string for JSON serialization
    const formattedQuestions = questions.map((q) => ({
      ...q,
      _id: q._id.toString(),
    }));

    res.json(formattedQuestions);
  } catch (error) {
    next(error);
  }
});

// POST create a new question
app.post("/api/questions", async (req, res, next) => {
  try {
    const { category, content } = req.body;
    if (!category || !content) {
      res.status(400).json({ error: "Category and content are required" });
      return;
    }

    const result = await db.collection("DevKittyQuestions").insertOne({
      category,
      content,
      date: new Date(),
    });

    const question = await db
      .collection("DevKittyQuestions")
      .findOne({ _id: result.insertedId });

    if (question) {
      res.status(201).json({
        ...question,
        _id: question._id.toString(),
      });
    } else {
      res.status(500).json({ error: "Failed to create question" });
    }
  } catch (error) {
    next(error);
  }
});

// PUT update a question
app.put("/api/questions/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { category, content } = req.body;

    if (!category || !content) {
      res.status(400).json({ error: "Category and content are required" });
      return;
    }

    const result = await db
      .collection("DevKittyQuestions")
      .updateOne({ _id: new ObjectId(id) }, { $set: { category, content } });

    if (result.matchedCount === 0) {
      res.status(404).json({ error: "Question not found" });
      return;
    }

    const question = await db
      .collection("DevKittyQuestions")
      .findOne({ _id: new ObjectId(id) });

    if (question) {
      res.json({
        ...question,
        _id: question._id.toString(),
      });
    } else {
      res.status(500).json({ error: "Failed to retrieve updated question" });
    }
  } catch (error) {
    next(error);
  }
});

// DELETE a question
app.delete("/api/questions/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db
      .collection("DevKittyQuestions")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      res.status(404).json({ error: "Question not found" });
      return;
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

// Serve React app in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "index.html"));
  });
}

// Error handling middleware (Express 5.x handles async errors better)
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  },
);

// Connect to MongoDB and start server
async function startServer() {
  try {
    const fs = await import("node:fs");

    if (fs.existsSync("./.env/config")) {
      const mongoAtlasLogin = await import("./.env/config");
      dbConnectionStr = mongoAtlasLogin.DB_STRING;
    }
  } catch (error) {
    console.error(error);
  }

  assert.ok(dbConnectionStr, "DB_STRING is required");

  try {
    // MongoDB 7.x: Use async/await for connection
    client = await MongoClient.connect(dbConnectionStr);
    console.log(`Connected to ${env.DB_NAME} Database`);
    db = client.db(env.DB_NAME);

    // Start server only after database connection is established
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\nShutting down gracefully....");

  if (client) {
    await client.close();
    console.log("MongoDB connection closed");
  }

  process.exit(0);
});

startServer();
