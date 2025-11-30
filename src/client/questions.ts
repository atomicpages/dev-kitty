import { Question } from "../data";

const API_BASE = "/api/questions";

export const fetchQuestions = async (): Promise<Question[]> => {
  const response = await fetch(API_BASE);
  if (!response.ok) {
    throw new Error("Failed to fetch questions");
  }
  return response.json();
};

export const createQuestion = async (
  category: string,
  content: string,
): Promise<Question> => {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category, content }),
  });
  if (!response.ok) {
    throw new Error("Failed to create question");
  }
  return response.json();
};

export const updateQuestion = async (
  id: string,
  category: string,
  content: string,
): Promise<Question> => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category, content }),
  });
  if (!response.ok) {
    throw new Error("Failed to update question");
  }
  return response.json();
};

export const deleteQuestion = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete question");
  }
};
