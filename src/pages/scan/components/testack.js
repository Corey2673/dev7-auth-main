import React, { useState, useEffect } from "react";
import ClockButton from "./ClockButton";

const UserAcknowledgementForm = ({ user, siteLocation }) => {
  const [questions, setQuestions] = useState([]);
  const [acknowledgments, setAcknowledgments] = useState([]);
  const [currentUser] = useState(user);
  const [signature, setSignature] = useState("");
  const [acknowledgedQuestions, setAcknowledgedQuestions] = useState([]);

  const acknowledgeQuestion = (
    userId,
    questionId,
    questionType,
    signature = null
  ) => {
    try {
      const timestamp = formatDateTime(new Date());
      const updatedAcknowledgments = [
        ...acknowledgments,
        {
          userId,
          questionId,
          questionType,
          signature,
          timestamp,
          siteLocation,
        },
      ];
      setAcknowledgments(updatedAcknowledgments);
      setSignature("");
      setAcknowledgedQuestions([...acknowledgedQuestions, questionId]);
    } catch (error) {
      console.error("Error acknowledging question:", error);
    }
  };

  const getUnacknowledgedQuestions = (userId) => {
    setAcknowledgedQuestions(
      JSON.parse(localStorage.getItem("acknowledgments"))
    );
    const acknowledgedQuestions = acknowledgments.filter(
      (ack) => ack.userId === userId
    );
    return questions.filter((question) => {
      const acknowledged = acknowledgedQuestions.some(
        (ack) => ack.questionId === question.id
      );
      if (question.type === "repeated") {
        return true;
      } else {
        return !acknowledged;
      }
    });
  };

  const unacknowledgedQuestions = getUnacknowledgedQuestions(currentUser.id);
  const allQuestionsAcknowledged =
    unacknowledgedQuestions.filter((q) => !acknowledgedQuestions.includes(q.id))
      .length === 0;

  const formatDateTime = (date) => {
    const options = {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      hour12: true,
    };
    return new Date(date).toLocaleString("en-US", options);
  };

  if (siteLocation) {
    return (
      <div className="container mx-auto max-w-md">
        <div className="grid gap-4 justify-center">
          {!allQuestionsAcknowledged && (
            <div className="text-center">
              <h4 className="text-2xl mb-4">
                Questions for {currentUser.firstName}
              </h4>
            </div>
          )}
          {unacknowledgedQuestions.map((question) => (
            <div className="w-full sm:w-1/2" key={question.id}>
              {!acknowledgedQuestions.includes(question.id) && (
                <div className="bg-white shadow-md rounded-md p-4 mb-4 hover:shadow-lg transition-transform duration-300 transform hover:translate-x-2">
                  <h6 className="text-lg mb-2">{question.text}</h6>
                  {!question.requiresSignature ? (
                    <>
                      <input
                        type="text"
                        className="w-full border-gray-300 border rounded-md px-3 py-2 mb-2"
                        placeholder="Enter signature"
                        value={signature}
                        onChange={(e) => setSignature(e.target.value)}
                      />
                      <button
                        className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                        onClick={() =>
                          acknowledgeQuestion(
                            currentUser.id,
                            question.id,
                            question.questionType,
                            signature
                          )
                        }
                      >
                        Acknowledge with Signature
                      </button>
                    </>
                  ) : (
                    <button
                      className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                      onClick={() =>
                        acknowledgeQuestion(
                          currentUser.id,
                          question.id,
                          question.questionType
                        )
                      }
                    >
                      Acknowledge
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
          {allQuestionsAcknowledged && (
            <div className="w-full">
              <ClockButton user={user} location={siteLocation} />
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default UserAcknowledgementForm;
