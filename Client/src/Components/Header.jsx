import React, { useContext, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  Textarea,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import AuthContext from "../Utils/AuthContext";
import { BACKEND_BASE_URL } from "../Utils/CommonData";
import toast from "react-hot-toast";
import axios from "axios";
import logoimage from "../Images/logo.webp";

function Header() {
  let { user, logoutUser } = useContext(AuthContext);

  const [question, setQUestion] = useState("");

  const [openNav, setOpenNav] = React.useState(false);

  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => setOpenModal(!openModal);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("text", question);
    formData.append("user_id", user.user_id);
    await axios
      .post(`${BACKEND_BASE_URL}/crud/create/`, formData)
      .then((res) => {
        console.log(res, "questions created");
        handleOpen();
        setQUestion("");
      })
      .catch((error) => {
        toast.error("error", error);
      });
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        Welcome {user.username}
      </Typography>
      <Link to={"/home"}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          Home
        </Typography>
      </Link>

      <Typography
        onClick={handleOpen}
        as="li"
        variant="small"
        color="blue-gray"
        className="p-2 font-normal bg-green-900 text-white rounded-xl cursor-pointer"
      >
        Add Questions
      </Typography>
      <Dialog
        open={openModal}
        // handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Ask Your Questions</DialogHeader>
        <form onSubmit={handleSubmit}>
          <Textarea
            value={question}
            onChange={(e) => setQUestion(e.target.value)}
            label="Question"
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
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </ul>
  );
  return (
    <div className=" ">
      <div className="w-full">
        <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
          <div className="flex items-center justify-between text-blue-gray-900">
            <Link className=" flex">
              <img className=" w-10 h-10" src={logoimage} alt="" />
              <Typography className="mr-4 cursor-pointer py-1.5 font-black">
                QueryHub
              </Typography>
            </Link>
            <div className="flex items-center gap-4">
              <div className="mr-4 hidden lg:block">{navList}</div>
              <Button
                variant="gradient"
                size="sm"
                className="hidden lg:inline-block"
                onClick={logoutUser}
              >
                <span>LOG OUT</span>
              </Button>
              <IconButton
                variant="text"
                className="ml-auto h-6 w-6 mr-5 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                ripple={false}
                onClick={() => setOpenNav(!openNav)}
              >
                {openNav ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    className="h-6 w-6"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </IconButton>
            </div>
          </div>
          <MobileNav open={openNav}>
            {navList}
            <Button
              variant="gradient"
              size="sm"
              fullWidth
              className="mb-2"
              onClick={logoutUser}
            >
              <span>LOG OUT</span>
            </Button>
          </MobileNav>
        </Navbar>
      </div>
    </div>
  );
}

export default Header;
