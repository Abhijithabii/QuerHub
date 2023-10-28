import {
  Button,
  Dialog,
  DialogFooter,
  DialogHeader,
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_BASE_URL } from "../Utils/CommonData";
import AuthContext from "../Utils/AuthContext";
import toast from "react-hot-toast";
import logoimage from "../Images/logo.webp";

function Posts() {
  const [openModal, setOpenModal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentQuestionId, setCurrentQuestionId] = useState("");
  const [answer, setAnswer] = useState("");
  let { user } = useContext(AuthContext);

  const handleOpen = (questionText, questionId) => {
    setCurrentQuestion(questionText);
    setCurrentQuestionId(questionId);
    setOpenModal(true);
  };

  const handleClose = () => {
    setCurrentQuestion("");
    setCurrentQuestionId("");
    setOpenModal(false);
  };

  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    await axios
      .get(`${BACKEND_BASE_URL}/crud/create/`)
      .then((res) => {
        setQuestions(res.data);
        console.log(res, "----got questions");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleSubmitAnswer = async (e, user_id, question_id, text) => {
    e.preventDefault();
    await axios
      .post(`${BACKEND_BASE_URL}/crud/create-answer/`, {
        user: user_id,
        question: question_id,
        text: text,
      })
      .then((res) => {
        console.log(res, "----response after submit");
        toast.success("Answer Submitted");
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div>
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-16 p-2 border border-black rounded-xl flex items-center">
          <img className="w-6 h-6" src={logoimage} alt="image" />
          <h1>Questions asked by other users</h1>
        </div>
        {questions.map((question, index) => (
          <div
            key={question.id}
            className="w-full h-full flex flex-col my-2 border border-black rounded-xl p-2 space-y-3"
          >
            <h1 className="text-xl font-bold">{question.text}</h1>
            <Link to={`/answer/${question.id}/`}>
              <p className="cursor-pointer w-fit">Show all answers</p>
            </Link>
            <p
              onClick={() => handleOpen(question.text, question.id)} // Pass question text to handleOpen
              className="p-2 border-2 w-fit rounded-xl border-black cursor-pointer"
            >
              Answer
            </p>
          </div>
        ))}
      </div>
      <Dialog
        open={openModal}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Question: {currentQuestion}</DialogHeader>{" "}
        {/* Use currentQuestion in the modal header */}
        <form
          onSubmit={(e) =>
            handleSubmitAnswer(e, user.user_id, currentQuestionId, answer)
          }
        >
          <Textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            label="Answer"
          />
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleClose}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" type="submit">
              <span>POST</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
}

export default Posts;
