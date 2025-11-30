import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Question } from "../data";
import {
  fetchQuestions,
  updateQuestion,
  deleteQuestion,
} from "../client/questions";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Edit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0 && id) {
      const question = questions.find((q) => q._id === id);
      if (question) {
        setEditingQuestion(question);
        setCategory(question.category);
        setContent(question.content);
      }
    }
  }, [questions, id]);

  const loadQuestions = async () => {
    try {
      const data = await fetchQuestions();
      setQuestions(data);
    } catch (error) {
      console.error("Error loading questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await updateQuestion(id, category, content);
      navigate("/");
    } catch (error) {
      console.error("Error updating question:", error);
      alert("Failed to update question");
    }
  };

  const handleDelete = async (questionId: string) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await deleteQuestion(questionId);
        navigate("/");
      } catch (error) {
        console.error("Error deleting question:", error);
        alert("Failed to delete question");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header isEdit={true} />

      <section
        className="flex flex-col outline-dotted outline-[#FFC0CB] rounded-[25px] max-w-[1200px] h-full mx-auto py-4 px-28 pb-20 text-[1.2rem]"
        id="render-edit-redirect"
      >
        <h4 className="text-[1.65rem] font-normal self-center pt-4">
          EDIT MY QUESTIONS
        </h4>
        <ul className="list-none">
          {questions.map((details) => {
            if (details._id === id) {
              return (
                <li key={details._id} className="list-none">
                  <form
                    action={`/edit/${details._id}`}
                    method="POST"
                    className="flex flex-row justify-between items-center py-12"
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="text"
                      className="w-[250px] h-[54px] bg-white rounded-[25px] shadow-[0px_2px_2px_1px_#FFC0CB] p-4 border-none outline-none scroll-smooth cursor-pointer appearance-none"
                      value={category}
                      name="category"
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    />
                    <textarea
                      className="w-[418px] h-full rounded-[25px] border-none p-8 text-[1.1rem] font-['Akshar',sans-serif] shadow-[0px_2px_2px_1px_#FFC0CB] resize-none"
                      name="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      required
                    ></textarea>
                    <button
                      type="submit"
                      className="w-[120px] h-[54px] shadow-[0px_2px_2px_1px_#FFC0CB] rounded-[25px] bg-white border-none text-center pt-2.5 cursor-pointer"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      className="w-[120px] h-[54px] shadow-[0px_2px_2px_1px_#FFC0CB] rounded-[25px] bg-white border-none text-center pt-2.5 cursor-pointer"
                      onClick={() => navigate("/")}
                    >
                      Cancel
                    </button>
                  </form>
                </li>
              );
            } else {
              return (
                <li key={details._id} className="flex flex-row list-none p-2">
                  <div className="font-medium">
                    {details.category}
                    <span>:</span>
                  </div>
                  <div className="ml-4 mr-2">{details.content}</div>
                  <a
                    href={`/edit/${details._id}`}
                    className="flex items-center ml-4 text-[1.2rem] leading-[0.6rem] no-underline text-black hover:font-bold hover:no-underline hover:tracking-normal hover:cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/edit/${details._id}`);
                    }}
                  >
                    <span className="fa-regular fa-pen-to-square"></span>
                  </a>
                  <a
                    href={`/remove/${details._id}`}
                    className="flex items-center ml-4 text-[1.2rem] leading-[0.6rem] no-underline text-black hover:font-bold hover:no-underline hover:tracking-normal hover:cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(details._id);
                    }}
                  >
                    <span className="fa-regular fa-trash-can"></span>
                  </a>
                </li>
              );
            }
          })}
        </ul>
      </section>

      <Footer />
    </div>
  );
}

export default Edit;
