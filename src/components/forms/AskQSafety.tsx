import React, { useState, useEffect } from 'react';
import DurationClock from '../inputs/DurationClock';




interface Question {
  id: string;
  text: string;
  type: string;
  requiresSignature?: boolean;
}

interface Acknowledgment {
  userId: string;
  questionId: string;
  questionType: string;
  signature?: string | null;
  timestamp: string;
  siteLocation: string;
}



interface Props {
    data: any
 
  siteLocation: string;
}

const UserAcknowledgementForm: React.FC<Props> = ({ data, siteLocation }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [acknowledgments, setAcknowledgments] = useState<Acknowledgment[]>([]);
  const [signature, setSignature] = useState('');
  const [acknowledgedQuestions, setAcknowledgedQuestions] = useState<string[]>([]);

  useEffect(() => {
    const storedAcknowledgments = localStorage.getItem('acknowledgments');
    if (storedAcknowledgments) {
      setAcknowledgedQuestions(JSON.parse(storedAcknowledgments));
    }
  }, []);

  const acknowledgeQuestion = (
    userId: string,
    questionId: string,
    questionType: string,
    signature: string | null = null
  ) => {
    try {
      const timestamp = formatDateTime(new Date());
      const updatedAcknowledgments: Acknowledgment[] = [
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
      setSignature('');
      setAcknowledgedQuestions([...acknowledgedQuestions, questionId]);
      localStorage.setItem('acknowledgments', JSON.stringify(updatedAcknowledgments));
    } catch (error) {
      console.error('Error acknowledging question:', error);
    }
  };

  const getUnacknowledgedQuestions = (userId: string): Question[] => {
    const acknowledgedQuestions = acknowledgments.filter((ack) => ack.userId === userId);
    return questions.filter((question) => {
      const acknowledged = acknowledgedQuestions.some((ack) => ack.questionId === question.id);
      return question.type === 'repeated' ? true : !acknowledged;
    });
  };

  const unacknowledgedQuestions = getUnacknowledgedQuestions(data.id);
  const allQuestionsAcknowledged =
    unacknowledgedQuestions.filter((q) => !acknowledgedQuestions.includes(q.id)).length === 0;

  const formatDateTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      hour12: true,
    };
    return new Date(date).toLocaleString('en-US', options);
  };

  if (siteLocation) {
    return (
      <div className="container mx-auto max-w-md">
        <div className="grid gap-4 justify-center">
          {!allQuestionsAcknowledged && (
            <div className="text-center">
              <h4 className="text-2xl mb-4">Questions for {data.firstname}</h4>
            </div>
          )}
          {unacknowledgedQuestions.map((question) => (
            <div className="w-full sm:w-1/2" key={question.id}>
              {!acknowledgedQuestions.includes(question.id) && (
                <div className="bg-white shadow-md rounded-md p-4 mb-4 hover:shadow-lg transition-transform duration-300 transform hover:translate-x-2">
                  <h6 className="text-lg mb-2">{question.text}</h6>
                  {question.requiresSignature ? (
                    <div>
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
                          acknowledgeQuestion(data.id, question.id, question.type, signature)
                        }
                      >
                        Acknowledge with Signature
                      </button>
                    </div>
                  ) : (
                    <button
                      className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                      onClick={() => acknowledgeQuestion(data.id, question.id, question.type)}
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
         {/* <DurationClock/> */}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
};

export default UserAcknowledgementForm;
