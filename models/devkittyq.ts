//can create schemas aka template with Mongoose

import mongoose from "mongoose";

// TypeScript interface for the document
export interface IDevKittyQ extends mongoose.Document {
  category: string;
  content: string;
  date: Date;
}

// Mongoose 9.x: Schema definition with proper typing
const questionSchema = new mongoose.Schema<IDevKittyQ>({
  category: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Mongoose 9.x: Export the model with proper TypeScript typing
// The third parameter is the collection name
export const DevKittyQ = mongoose.model<IDevKittyQ>(
  "DevKittyQ",
  questionSchema,
  "myQuestions",
);

// Default export for convenience
export default DevKittyQ;
