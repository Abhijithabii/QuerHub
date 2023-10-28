import {
  Button,
  Dialog,
  DialogFooter,
  DialogHeader,
  Textarea,
} from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import Header from "../Components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../Utils/CommonData";
import AuthContext from "../Utils/AuthContext";
import toast from "react-hot-toast";

function AnswerPage() {
  const [openModal, setOpenModal] = useState(false);
  const { question_id } = useParams();
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  let { user } = useContext(AuthContext);

  const handleOpen = () => setOpenModal(!openModal);

  const fetchAnswers = async () => {
    await axios
      .get(`${BACKEND_BASE_URL}/crud/questionSingleView/${question_id}/`)
      .then((res) => {
        console.log(res.data, "-------answerssss");
        const [post, post_id, ...answers] = res.data;
        setQuestion(post);
        setQuestionId(post_id);
        setAnswers(answers);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    fetchAnswers();
  }, []);

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
        handleOpen();
        fetchAnswers();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const likeAnswer = async (user_id, answer_id) => {
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/crud/like-answer/${answer_id}/`,
        {
          user_id: user_id,
        }
      );

      if (response.status === 201) {
        toast.success("liked");
      } else if (response.status === 200) {
        toast.success("unliked");
      }
      fetchAnswers();
    } catch (error) {
      console.error("Error liking/unliking answer:", error);
    }
  };

  return (
    <div className=" w-screen h-full flex flex-col items-center">
      <div className=" fixed top-0 w-full">
        <Header />
      </div>
      <div className=" w-full md:w-2/3 h-full mt-20">
        <div className=" w-full h-full flex flex-col my-2 border border-black rounded-xl p-2 space-y-3">
          <h1 className=" text-xl font-bold"> {question.post} </h1>
          <p
            onClick={handleOpen}
            className=" p-2 border-2 w-fit  rounded-xl border-black cursor-pointer"
          >
            Answer
          </p>
          <Dialog
            open={openModal}
            // handler={handleOpen}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
          >
            <DialogHeader>Question : {question.post} </DialogHeader>
            <form
              onSubmit={(e) =>
                handleSubmitAnswer(
                  e,
                  user.user_id,
                  questionId.post_id,
                  newAnswer
                )
              }
            >
              <Textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                label="Answer"
              />
              <DialogFooter>
                <Button
                  variant="text"
                  color="red"
                  onClick={handleOpen}
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

        {/* Answer Area */}
        <h1 className=" text-2xl font-bold p-2">Answers</h1>

        {answers.map((answer, index) => (
          <div
            key={answer.id}
            className=" w-full h-full border border-black m-1 rounded-lg p-1"
          >
            <p> {answer.text} </p>
            <div className=" flex">
              <AiOutlineLike
                onClick={() => likeAnswer(user.user_id, answer.id)}
                className=" text-2xl cursor-pointer"
              />
              {/* <AiFillLike className=" text-2xl cursor-pointer text-light-blue-700"/> */}
              <p> {answer.likes} </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnswerPage;
