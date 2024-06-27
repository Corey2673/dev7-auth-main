import React, { useState, useEffect } from 'react';
import DurationClock from '../inputs/DurationClock';
import axios from 'axios';




interface Question {
  repeated: string;
  _id: string;
  question: string;
  userType: string;
  siteLocation: String
  title:string
  userID: string
  questionID:string
 
}

interface Acknowledgment {
  userId: string;
    userID: string;
  questionId: string;
  questionType: string;
  firstname: string;
  lastname: string;
  timestamp: string;
  siteLocation: string;
  questionTitle:string;
}




interface Props {
    data: any
 
  siteLocation: string;
}

const UserAcknowledgementForm: React.FC<Props> = ({ data, siteLocation }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [acknowledgments, setAcknowledgments] = useState<Acknowledgment[]>([]);
  const [signature, setSignature] = useState('');
  const [acknowledgementData, setAcknowledgementData] = useState<string[]>([]);

  useEffect(() => {
    
    const fetchUsers = async () => {
      try {
          const { data } = await axios.get("/api/auth/getacknowledgement");
        setAcknowledgementData(data);
    
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    
    const fetchQuestions = async () => {
      try {
        const { data } = await axios.get("/api/auth/getquestions");
        setQuestions(data);
       //console.log(data)
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchQuestions();
  }, []);


  const acknowledgeQuestion = async (
        userId: string, questionId: string,  firstname: string, questionTitle: string, lastname: string
  ) => {
    try {
      const timestamp = formatDateTime(new Date());
//console.log(acknowledgments)
     
      const updatedAcknowledgments: Acknowledgment[] = [
        // ...acknowledgments,
        // {
        //   userId,
        //   questionId,
        //   questionType,
        //   lastname,
        //   timestamp,
        //   siteLocation,
        //   firstname,
        //   questionTitle
        // },
      ];


      const a = [
           ...acknowledgments,
        {
          userId,
          questionId,
          lastname,
          timestamp,
          siteLocation,
          firstname,
          questionTitle
        }
      ]


      try {
     await axios.post("/api/auth/addacknowledgment", {
         ...a[0]
      });
    
    } catch (error: any) {
     
    }
      
     setAcknowledgments(updatedAcknowledgments);
      setSignature('');
      setAcknowledgementData([...acknowledgementData, questionId]);
     
    } catch (error) {
      console.error('Error acknowledging question:', error);
    }
  };

  const getUnacknowledgedQuestions = (userId: string): Question[] => {
    const acknowledgedQuestions = acknowledgementData.filter((ack) => ack.userID === userId);
    return questions.filter((question) => {
      const acknowledged = acknowledgedQuestions.some((ack) => ack.questionID === question._id);
      return question.repeated === 'Repeated' ? true : !acknowledged;
    });
  };

  const unacknowledgedQuestions = getUnacknowledgedQuestions(data._id);

  
  const allQuestionsAcknowledged =
    unacknowledgedQuestions.filter((q) => !acknowledgementData.includes(q._id)).length === 0;


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



  if (allQuestionsAcknowledged) {

    return <DurationClock data={data} siteLocation={siteLocation}/>
    
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
                      onClick={() => acknowledgeQuestion(data._id, question._id,  data.firstname, question.title, data.lastname  )}
                    >    
                      Acknowledge
                    </button>
                    
                
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
