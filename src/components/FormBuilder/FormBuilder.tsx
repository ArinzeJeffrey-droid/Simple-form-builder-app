"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef, useState } from "react";
import { PlusCircle, Trash2 } from "react-feather";
import Button from "../Button";
import { Tooltip } from "react-tooltip";
import FormQuestionInput from "./FormQuestionInput";
import FormTypeSelector from "./FormTypeSelector";
import OptionsManager from "./OptionsManager";
import RequiredCheckbox from "./RequiredCheckbox";
import { Question } from "@/__types__/types";

type FormElements = {
  [key: string]: React.FC;
};

type Props = {
  addQuestion: (question: Question, position: number) => void;
  updateQuestion: (question: Question, position: number) => void;
  deleteQuestion: (position: number) => void;
  position: number;
  existingQuestion: any;
  inputRef: (ref: HTMLDivElement | null) => void;
};

export const formElements: FormElements = {
  "Short-answer": Input,
  Paragraph: Textarea,
  "Multiple-choice": () => null,
  Checkboxes: () => null,
};

const FormBuilder = ({
  addQuestion,
  deleteQuestion,
  updateQuestion,
  existingQuestion,
  position,
  inputRef,
}: Props) => {
  const [formType, setFormType] = useState<keyof typeof formElements | "">("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>([""]);
  const [isRequired, setIsRequired] = useState(false);
  const questionRef = useRef<HTMLInputElement | null>(null); // set focus on the question

  useEffect(() => {
    const fullQuestion = {
      question,
      isRequired,
      formType,
      options,
      position,
    };
    updateQuestion(fullQuestion, position);
  }, [question, formType, options, isRequired]);

  useEffect(() => {
    inputRef(questionRef.current);
  }, [questionRef]);

  const handleChange = (value: keyof typeof formElements) => {
    setFormType(value);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const updateOption = (index: number, value: string) => {
    setOptions(options.map((option, i) => (i === index ? value : option)));
  };

  const SelectedFormElement = formElements[formType];

  const isMultipleChoiceOrCheckboxes = (type: keyof typeof formElements) =>
    type === "Multiple-choice" || type === "Checkboxes";

  const saveQuestion = () => {
    const fullQuestion = {
      position,
      question,
      isRequired,
      formType,
      options,
      response: isMultipleChoiceOrCheckboxes(formType) ? [] : "",
    };
    addQuestion(fullQuestion, position);
  };

  return (
    <div className="bg-gray p-4 border border-gray-light rounded-md flex gap-4 justify-between">
      <div className="w-full">
        <div className="flex gap-4">
          <FormQuestionInput
            question={question}
            setQuestion={setQuestion}
            ref={questionRef}
          />
          <FormTypeSelector
            formElements={formElements}
            handleChange={handleChange}
            formType={formType}
          />
        </div>
        <div className="mt-5 flex items-center gap-4">
          {isMultipleChoiceOrCheckboxes(formType) ? (
            <OptionsManager
              options={options}
              addOption={addOption}
              removeOption={removeOption}
              updateOption={updateOption}
            />
          ) : (
            // @ts-ignore
            SelectedFormElement && <SelectedFormElement disabled={true} />
          )}

          {formType && (
            <RequiredCheckbox
              isRequired={isRequired}
              setIsRequired={setIsRequired}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Button
          onClick={saveQuestion}
          disabled={!formType}
          variant="icon"
          className="add-question"
        >
          <PlusCircle />
        </Button>
        <Button
          onClick={() => deleteQuestion(position)}
          variant="icon"
          className="delete-question"
        >
          <Trash2 />
        </Button>
      </div>

      <Tooltip anchorSelect=".add-question" place="top">
        Add question
      </Tooltip>
      <Tooltip anchorSelect=".delete-question" place="bottom">
        Delete question
      </Tooltip>
      <Tooltip anchorSelect=".remove-option" place="right">
        Remove option
      </Tooltip>
    </div>
  );
};

export default FormBuilder;
