import React, { useState, useEffect } from "react";
import DurationClock from "../inputs/DurationClock";
import axios from "axios";

const UserAcknowledgementForm = ({ data, siteLocation }) => {
  const [questions, setQuestions] = useState([]);
  const [acknowledgments, setAcknowledgments] = useState([]);
  const [signature, setSignature] = useState("");
  const [acknowledgementData, setAcknowledgementData] = useState([]);

  useEffect(() => {
    const fetchAcknowledgementData = async () => {
      try {
        const { data } = await axios.get("/api/auth/getacknowledgement");
        setAcknowledgementData(data);
      } catch (error) {
        console.error("Error fetching acknowledgement data:", error);
      }
    };

    fetchAcknowledgementData();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get("/api/auth/getquestions");
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const acknowledgeQuestion = async (
    userId,
    questionId,
    firstname,
    questionTitle,
    lastname
  ) => {
    try {
      const timestamp = formatDateTime(new Date());

      const newAcknowledgment = {
        userId,
        questionId,
        lastname,
        timestamp,
        siteLocation,
        firstname,
        questionTitle,
      };

      await axios.post("/api/auth/addacknowledgment", newAcknowledgment);

      setAcknowledgments([...acknowledgments, newAcknowledgment]);
      setSignature("");
      setAcknowledgementData([...acknowledgementData, questionId]);
    } catch (error) {
      console.error("Error acknowledging question:", error);
    }
  };

  const getUnacknowledgedQuestions = (userId) => {
    const acknowledgedQuestions = acknowledgementData.filter(
      (ack) => ack.userID === userId
    );
    return questions.filter((question) => {
      const acknowledged = acknowledgedQuestions.some(
        (ack) => ack.questionID === question._id
      );
      return question.repeated === "Repeated" ? true : !acknowledged;
    });
  };

  const unacknowledgedQuestions = getUnacknowledgedQuestions(data._id);

  const allQuestionsAcknowledged =
    unacknowledgedQuestions.filter((q) => !acknowledgementData.includes(q._id))
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

  if (allQuestionsAcknowledged) {
    return <DurationClock data={data} siteLocation={siteLocation} />;
  }

  if (siteLocation) {
    return (
      <div className="container mx-auto max">
        <div className="grid gap-4 justify-center">
          {!allQuestionsAcknowledged && (
            <div className="text-center">
              <h4 className="text-2xl mb-4">Questions for {data.firstname}</h4>
            </div>
          )}

          {unacknowledgedQuestions.map((question) => (
            <div className="w-full sm:w-1/2" key={question._id}>
              {!acknowledgementData.includes(question._id) && (
                <div className="bg-white shadow-md rounded-md p-4 mb-4 hover:shadow-lg transition-transform duration-300 transform hover:translate-x-2">
                  <h6 className="text-lg mb-2">{question.question}</h6>
                  <button
                    className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                    onClick={() =>
                      acknowledgeQuestion(
                        data._id,
                        question._id,
                        data.firstname,
                        question.title,
                        data.lastname
                      )
                    }
                  >
                    Acknowledge
                  </button>
                </div>
              )}
            </div>
          ))}

          {allQuestionsAcknowledged && (
            <div className="w-full">{/* <DurationClock/> */}</div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default UserAcknowledgementForm;
