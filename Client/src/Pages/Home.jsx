import React from "react";
import Header from "../Components/Header";
import Posts from "../Components/Posts";

function Home() {
  return (
    <div className="relative w-screen h-full ">
      <div className="absolute top-20 w-screen h-full flex justify-center">
        <div className=" w-full md:w-2/3 h-full">

        <Posts />
        </div>
        
      </div>
      <div className="fixed top-0 w-full bg-white z-10">
        <Header />
      </div>
    </div>
  );
}

export default Home;
