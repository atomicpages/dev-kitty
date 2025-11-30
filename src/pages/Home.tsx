import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { Question } from "../data";
import {
  fetchQuestions,
  createQuestion,
  deleteQuestion,
} from "../client/questions";
import {
  htmlTips,
  cssTips,
  jsTips,
  nodeTips,
  behaviorTips,
  myTips,
} from "../data";
import Modal from "../components/Modal";
import Header from "../components/Header";
import Footer from "../components/Footer";

const getRandomTip = (tips: string[]) => {
  return tips[Math.floor(Math.random() * tips.length)];
};

const getRandomImage = async () => {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error fetching image:", error);
    return "";
  }
};

function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("Html");
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTip, setModalTip] = useState("");
  const [modalImage, setModalImage] = useState("");
  const [currentTips, setCurrentTips] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadQuestions();
  }, []);

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

    try {
      await createQuestion(category, content);
      setContent("");
      setCategory("Html");
      loadQuestions();
    } catch (error) {
      console.error("Error creating question:", error);
      alert("Failed to add question");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await deleteQuestion(id);
        loadQuestions();
      } catch (error) {
        console.error("Error deleting question:", error);
        alert("Failed to delete question");
      }
    }
  };

  const openModal = useCallback(async (tips: string[]) => {
    const tip = getRandomTip(tips);
    const image = await getRandomImage();
    setCurrentTips(tips);
    setModalTip(tip);
    setModalImage(image);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const getMoreTip = useCallback(async () => {
    const tip = getRandomTip(currentTips);
    const image = await getRandomImage();
    setModalTip(tip);
    setModalImage(image);
  }, [currentTips]);

  return (
    <div>
      <Header />

      <div className="px-12">
        <main className="bg-[#F9F8F8] shadow-[0px_4px_4px_rgba(0,0,0,0.2)] w-[1288px] h-auto p-8 mx-auto">
          <section className="flex flex-col justify-start items-end max-w-[65%] mx-auto list-none">
            <p className="text-[2rem] font-medium whitespace-pre-line mr-auto mt-24 pb-8">
              WHAT WOULD YOU LIKE TO STUDY TODAY?
            </p>
            <li className="flex">
              <button
                className="rounded-[15rem] pt-4 border-none bg-none h-60 hover:bg-linear-to-b hover:from-[#FFC0CB] hover:via-[rgba(254,195,167,0.797368)] hover:via-[70.76%] hover:to-[rgba(252,198,115,0.500622)] hover:to-[112.21%] hover:opacity-90 hover:rounded-[50rem] hover:cursor-pointer hover:shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
                onClick={() => openModal(htmlTips)}
              >
                <img
                  src="/img/cat.svg"
                  className="max-w-[90%]"
                  alt="cat icon"
                />
              </button>
              <button
                className="rounded-[15rem] pt-4 border-none bg-none h-60 hover:bg-linear-to-b hover:from-[#FFC0CB] hover:via-[rgba(254,195,167,0.797368)] hover:via-[70.76%] hover:to-[rgba(252,198,115,0.500622)] hover:to-[112.21%] hover:opacity-90 hover:rounded-[50rem] hover:cursor-pointer hover:shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
                onClick={() => openModal(cssTips)}
              >
                <img
                  src="/img/shark.svg"
                  className="max-w-[90%]"
                  alt="shark icon"
                />
              </button>
              <button
                className="rounded-[15rem] pt-4 border-none bg-none h-60 hover:bg-linear-to-b hover:from-[#FFC0CB] hover:via-[rgba(254,195,167,0.797368)] hover:via-[70.76%] hover:to-[rgba(252,198,115,0.500622)] hover:to-[112.21%] hover:opacity-90 hover:rounded-[50rem] hover:cursor-pointer hover:shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
                onClick={() => openModal(jsTips)}
              >
                <img
                  src="/img/llama.svg"
                  className="max-w-[90%]"
                  alt="llama icon"
                />
              </button>
              <button
                className="rounded-[15rem] pt-4 border-none bg-none h-60 hover:bg-linear-to-b hover:from-[#FFC0CB] hover:via-[rgba(254,195,167,0.797368)] hover:via-[70.76%] hover:to-[rgba(252,198,115,0.500622)] hover:to-[112.21%] hover:opacity-90 hover:rounded-[50rem] hover:cursor-pointer hover:shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
                onClick={() => openModal(nodeTips)}
              >
                <img
                  src="/img/deer.svg"
                  className="max-w-[90%]"
                  alt="deer icon"
                />
              </button>
              <button
                className="rounded-[15rem] pt-4 border-none bg-none h-60 hover:bg-linear-to-b hover:from-[#FFC0CB] hover:via-[rgba(254,195,167,0.797368)] hover:via-[70.76%] hover:to-[rgba(252,198,115,0.500622)] hover:to-[112.21%] hover:opacity-90 hover:rounded-[50rem] hover:cursor-pointer hover:shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
                onClick={() => openModal(behaviorTips)}
              >
                <img
                  src="/img/duck.svg"
                  className="max-w-[90%]"
                  alt="duck icon"
                />
              </button>
              <button
                className="rounded-[15rem] pt-4 border-none bg-none h-60 hover:bg-linear-to-b hover:from-[#FFC0CB] hover:via-[rgba(254,195,167,0.797368)] hover:via-[70.76%] hover:to-[rgba(252,198,115,0.500622)] hover:to-[112.21%] hover:opacity-90 hover:rounded-[50rem] hover:cursor-pointer hover:shadow-[0px_4px_4px_rgba(0,0,0,0.05)]"
                onClick={() => openModal(myTips)}
              >
                <img
                  src="/img/beaver.svg"
                  className="max-w-[90%]"
                  alt="beaver icon"
                />
              </button>
            </li>

            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              tip={modalTip}
              image={modalImage}
              onMore={getMoreTip}
            />
          </section>
        </main>
      </div>

      <section
        className="flex flex-row justify-center items-start py-40"
        id="redirect"
      >
        <section className="flex flex-col bg-[url('/img/bg-ask-gradient.png')] bg-no-repeat w-[590px] h-[675px]">
          <h4 className="text-[1.65rem] font-normal self-center pt-4">
            ADD A QUESTION
          </h4>
          <form
            action="/"
            method="POST"
            className="flex flex-col justify-center items-center box-border relative"
            onSubmit={handleSubmit}
          >
            <select
              name="category"
              id="add-q-section"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-[250px] h-[54px] rounded-[25px] shadow-[0px_4px_4px_2px_#FFC0CB] mb-5 border-none outline-none scroll-smooth cursor-pointer appearance-none text-center"
              style={{
                background:
                  'white url("/img/down-arrow.svg") no-repeat 75% center',
                backgroundSize: "5%",
              }}
            >
              <option value="Html">CATEGORY</option>
              <option value="HTML/CSS">HTML/CSS</option>
              <option value="JS">JAVASCRIPT</option>
              <option value="FRAMEWORKS">FRAMEWORKS</option>
              <option value="BACKEND">BACKEND</option>
              <option value="BEHAVIORAL">BEHAVIORAL</option>
              <option value="OTHER">OTHER</option>
            </select>
            <textarea
              className="w-[418px] h-[341px] rounded-[25px] border-none p-8 text-[1.1rem] font-['Akshar',sans-serif] resize-none"
              name="content"
              placeholder="Your question goes here..."
              wrap="soft"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
            <input
              type="submit"
              className="w-[150px] h-[54px] shadow-[0px_4px_4px_2px_rgba(252,198,115,0.2)] rounded-[25px] bg-white my-5 border-none cursor-pointer"
              value="ADD"
            />
          </form>
        </section>
        <img src="/img/bg-ask-cat.jpg" alt="cat photo" />
      </section>

      <section className="flex flex-col outline-dotted outline-[#FFC0CB] max-w-[1000px] h-full mx-auto py-4 px-28 pb-20 text-[1.2rem]">
        <h4 className="text-[1.65rem] font-normal self-center pt-4">
          MY QUESTIONS
        </h4>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="list-none">
            {questions.map((details) => (
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
            ))}
          </ul>
        )}
      </section>

      <section className="flex flex-col items-center pt-32 px-12">
        <h4 className="text-[1.65rem] font-normal self-center pt-4">
          TECH STACK
        </h4>
        <ul className="flex list-none gap-10">
          <li>
            <img
              src="/img/Javascript.svg"
              className="max-w-[80%]"
              alt="javascript icon"
            />
            <p className="text-base text-center -ml-3.5">JavaScript</p>
          </li>
          <li>
            <img src="/img/HTML5.svg" className="max-w-[80%]" alt="html icon" />
            <p className="text-base text-center -ml-3.5">HTML 5</p>
          </li>
          <li>
            <img src="/img/CSS3.svg" className="max-w-[80%]" alt="css icon" />
            <p className="text-base text-center -ml-3.5">CSS 3</p>
          </li>
          <li>
            <img
              src="/img/Figma.svg"
              className="max-w-[80%]"
              alt="figma icon"
            />
            <p className="text-base text-center -ml-3.5">Figma</p>
          </li>
          <li>
            <img
              src="/img/Adobe Photoshop.svg"
              className="max-w-[80%]"
              alt="photoshop icon"
            />
            <p className="text-base text-center -ml-3.5">Photoshop</p>
          </li>
        </ul>
        <ul className="flex list-none gap-[60px]">
          <li>
            <img
              src="/img/Nodejs.svg"
              className="max-w-[80%]"
              alt="node icon"
            />
            <p className="text-base text-center -ml-3.5">Node.js</p>
          </li>
          <li>
            <img
              src="/img/MongoDB.svg"
              className="max-w-[80%]"
              alt="mongodb icon"
            />
            <p className="text-base text-center -ml-3.5">MongoDB</p>
          </li>
          <li>
            <img
              src="/img/Nodemon.svg"
              className="max-w-[80%]"
              alt="nodemon icon"
            />
            <p className="text-base text-center -ml-3.5">Nodemon</p>
          </li>
          <li>
            <img
              src="/img/Postman.svg"
              className="max-w-[80%]"
              alt="postman icon"
            />
            <p className="text-base text-center -ml-3.5">Postman</p>
          </li>
          <li>
            <img src="/img/npm.svg" className="max-w-[80%]" alt="npm icon" />
            <p className="text-base text-center -ml-3.5">npm</p>
          </li>
        </ul>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
