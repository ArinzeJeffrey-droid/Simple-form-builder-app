"use client";
import FormBuilder from "@/components/FormBuilder/FormBuilder";
import { useRef, useState } from "react";
import { nanoid } from "nanoid";
import { Question } from "@/__types__/types";

export default function Home() {
  const [questions, setQuestion] = useState([{ id: nanoid(10) }]);
  const questionRefs = useRef<(HTMLDivElement | null)[]>([]); 

  const addQuestion = (question: Question, position: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(position + 1, 0, { id: nanoid(10), ...question });
    setQuestion(newQuestions);


    setTimeout(() => {
      if (questionRefs.current[position + 1]) {
        questionRefs.current[position + 1]?.focus();
      }
    }, 100);
  };

  const deleteQuestion = (position: number) => {
    setQuestion(questions.filter((_, index) => index !== position));
  };

  const updateQuestion = (updatedQuestion: Question, position: number) => {
    const newQuestions = [...questions];
    newQuestions[position] = { ...newQuestions[position], ...updatedQuestion };
    setQuestion(newQuestions);
  };

  console.log("questions", questions);

  return (
    <main className="border border-gray-light bg-gray-dark p-4 rounded-lg max-w-5xl m-auto mt-10">
      <header className="p-5">
        <h1 className="text-center text-2xl">Form Builder</h1>
      </header>

      <div className="flex flex-col gap-4">
        {questions.map((question, index) => (
          <FormBuilder
            key={question.id}
            addQuestion={addQuestion}
            deleteQuestion={deleteQuestion}
            updateQuestion={updateQuestion}
            inputRef={(ref) => (questionRefs.current[index] = ref)}
            position={index}
          />
        ))}
      </div>
    </main>
  );
}
