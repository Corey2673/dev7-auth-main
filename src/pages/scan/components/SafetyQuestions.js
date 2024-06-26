import React, { useState, useEffect } from "react";

const QuestionComponent = () => {
  const [questions, setQuestions] = useState(
    JSON.parse(localStorage.getItem("questions")) || []
  );
  const [acknowledgements, setAcknowledgements] = useState(
    JSON.parse(localStorage.getItem("acknowledgements")) || {}
  );
  const [newQuestion, setNewQuestion] = useState({});

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion({ ...newQuestion, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewQuestion({ ...newQuestion, file: e.target.files[0] });
  };

  const handleAddQuestion = () => {
    const fileURL = newQuestion.file
      ? URL.createObjectURL(newQuestion.file)
      : null;
    const updatedQuestions = [
      ...questions,
      { ...newQuestion, id: questions.length + 1, file: fileURL },
    ];
    setQuestions(updatedQuestions);
    setNewQuestion({ text: "", file: null, userType: "", siteLocation: "" });
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };

  const handleAcknowledge = (id) => {
    const newAcknowledgements = { ...acknowledgements, [id]: true };
    setAcknowledgements(newAcknowledgements);
    localStorage.setItem(
      "acknowledgements",
      JSON.stringify(newAcknowledgements)
    );
  };

  const handleReviewFile = (file) => {
    const newWindow = window.open(file, "_blank", "width=800,height=600");
    if (newWindow) {
      newWindow.opener = null; // Avoid security risks by disassociating from the opener
    } else {
      alert("Popup blocker is preventing the file from opening."); // Handle popup blocker
    }
    file = null;
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl text-center mt-5 mb-5">Add New Question</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow-md">
          <input
            type="text"
            className="border border-gray-300 p-2 w-full mb-4"
            placeholder="Question Text"
            name="text"
            value={newQuestion.text}
            onChange={handleInputChange}
          />
          <input type="file" className="mb-4" onChange={handleFileChange} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">User Types</label>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="userType"
                    value="Shop Floor"
                    onChange={handleInputChange}
                  />
                  <span className="ml-2">Shop Floor</span>
                </label>
                {/* Add similar labels for other user types */}
              </div>
            </div>
            <div>
              <label className="block mb-2">Site Location</label>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="siteLocation"
                    value="Battery Plant"
                    onChange={handleInputChange}
                  />
                  <span className="ml-2">Battery Plant</span>
                </label>
                {/* Add similar labels for other site locations */}
              </div>
            </div>
            <div>
              <label className="block mb-2">Question Frequency</label>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="type"
                    value="one-time"
                    onChange={handleInputChange}
                  />
                  <span className="ml-2">Ask Once</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="type"
                    value="repeated"
                    onChange={handleInputChange}
                  />
                  <span className="ml-2">Ask Every Time</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block mb-2">Initial Required</label>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="requiresSignature"
                    value="true"
                    onChange={handleInputChange}
                  />
                  <span className="ml-2">Require Initial</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio"
                    name="requiresSignature"
                    value="false"
                    onChange={handleInputChange}
                  />
                  <span className="ml-2">No Require Initial</span>
                </label>
              </div>
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 w-full rounded"
            onClick={handleAddQuestion}
          >
            Add Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionComponent;
