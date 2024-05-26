"use client";
import FormBuilder from "@/components/FormBuilder/FormBuilder";
import { useRef, useState } from "react";
import { nanoid } from "nanoid";
import { Question } from "@/__types__/types";
import Button from "@/components/Button";
import { JSONTree } from "react-json-tree";
import FormPreview from "@/components/FormBuilder/FormPreview";

const mockData = [
  {
    id: "MZojHErGi8",
    question: "First question",
    isRequired: true,
    formType: "Short-answer",
    options: [""],
    position: 0,
    response: "",
  },
  {
    id: "ZT5-ZhAE7q",
    position: 1,
    question: "middlequestion",
    isRequired: true,
    formType: "Paragraph",
    options: [""],
    response: "",
  },
  {
    id: "FxXCpA4qh6",
    position: 1,
    question: "Second question",
    isRequired: true,
    formType: "Paragraph",
    options: [""],
    response: "",
  },
  {
    id: "krVNJkKuq-",
    position: 2,
    question: "Third question",
    isRequired: false,
    formType: "Checkboxes",
    options: ["Yes", "No"],
    response: [],
  },
  {
    id: "5lLPxDIZZH",
    position: 3,
    question: "Fourth question",
    isRequired: false,
    formType: "Multiple-choice",
    options: ["Choice 1", "Choice 2", "Choice 3"],
    response: [],
  },
];

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([{}]);
  const [showQuestionsJSON, setShowQuestionsJSON] = useState(false);
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const addQuestion = (question: Question, position: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(position + 1, 0, { id: nanoid(10), ...question });
    setQuestions(newQuestions);

    setTimeout(() => {
      if (questionRefs.current[position + 1]) {
        questionRefs.current[position + 1]?.focus();
      }
    }, 100);
  };

  const deleteQuestion = (position: number) => {
    setQuestions(questions.filter((_, index) => index !== position));
  };

  const updateQuestion = (updatedQuestion: Question, position: number) => {
    const newQuestions = [...questions];
    newQuestions[position] = { ...newQuestions[position], ...updatedQuestion };
    setQuestions(newQuestions);
  };

  const handleShortAnswerChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    position: number
  ) => {
    const newQuestions = [...questions];
    newQuestions[position].response = e.target.value;
    setQuestions(newQuestions);
  };

  const handleParagraphChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    position: number
  ) => {
    const newQuestions = [...questions];
    newQuestions[position].response = e.target.value;
    setQuestions(newQuestions);
  };

  const handleCheckboxChange = (option: string, position: number) => {
    const newQuestions = [...questions];
    const currentResponses = newQuestions[position].response;

    if (!Array.isArray(currentResponses)) {
      newQuestions[position].response = [];
    }

    if ((newQuestions[position].response as string[]).includes(option)) {
      newQuestions[position].response = (
        newQuestions[position].response as string[]
      ).filter((resp) => resp !== option);
    } else {
      newQuestions[position].response = [
        ...(newQuestions[position].response as string[]),
        option,
      ];
    }
    setQuestions(newQuestions);
  };

  return (
    <main className="border border-gray-light bg-gray-dark p-4 rounded-lg max-w-7xl m-auto mt-10">
      <header className="p-5 mb-5 border-b border-b-gray-lightest">
        <h1 className="text-center text-2xl">Form Builder</h1>
      </header>

      <div className="p-4 mb-10 flex justify-between items-center">
        <Button>Preview</Button>
        <Button variant="secondary" onClick={() => setShowQuestionsJSON(true)}>
          See questions JSON
        </Button>
      </div>

      <div className="flex gap-4 mb-5">
        <div className="w-full flex flex-col gap-4">
          {questions.map((question, index) => (
            <FormBuilder
              key={question.id}
              existingQuestion={question}
              addQuestion={addQuestion}
              deleteQuestion={deleteQuestion}
              updateQuestion={updateQuestion}
              inputRef={(ref) => (questionRefs.current[index] = ref)}
              position={index}
            />
          ))}
        </div>

        <div className="bg-gray p-4 border border-gray-light rounded-md w-full">
          {showQuestionsJSON && (
            <>
              <Button
                variant="danger"
                onClick={() => setShowQuestionsJSON(false)}
              >
                Close
              </Button>
              <JSONTree data={questions} />
            </>
          )}
        </div>
      </div>

      <FormPreview
        questions={questions}
        handleShortAnswerChange={handleShortAnswerChange}
        handleParagraphChange={handleParagraphChange}
        handleCheckboxChange={handleCheckboxChange}
      />
    </main>
  );
}
