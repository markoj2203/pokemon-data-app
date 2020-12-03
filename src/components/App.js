import React from "react";
import Content from "./Content";
import Header from "./Header";
import Modal from "react-modal";

Modal.setAppElement("#root");

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Content />
      <Modal isOpen={true}>
        <h1>Modal Header</h1>
        <p>
          sdasssssssssssssssssssssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaaa
        </p>
      </Modal>
    </div>
  );
}

export default App;
