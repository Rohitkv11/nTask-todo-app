import React from "react";
import {Navbar} from "../components/navbar/Navbar";
import Todo from '../components/todo/Todo'

function HomePage() {
  return (
    <div>
      <Navbar />
      <Todo />
    </div>
  );
}

export default HomePage;
