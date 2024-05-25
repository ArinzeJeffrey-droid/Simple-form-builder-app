"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { PlusCircle, Trash2, X } from "react-feather";
import Button from "../Button";
import { Tooltip } from "react-tooltip";
import FormQuestionInput from "./FormQuestionInput";
import FormTypeSelector from "./FormTypeSelector";
import OptionsManager from "./OptionsManager";
import RequiredCheckbox from "./RequiredCheckbox";

type FormElements = {
  [key: string]: React.FC;
};

export const formElements: FormElements = {
  "Short-answer": Input,
  Paragraph: Textarea,
  "Multiple-choice": () => null,
  Checkboxes: () => null,
};

const FormBuilder = () => {
  const [formType, setFormType] = useState<keyof typeof formElements | "">("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState<string[]>([""]);
  const [isRequired, setIsRequired] = useState(false);

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

  const isMultipleChoiceOrCheckboxes =
    formType === "Multiple-choice" || formType === "Checkboxes";

  return (
    <div className="bg-gray p-4 border border-gray-light rounded-md flex gap-4 justify-between">
      <div className="w-full">
        <div className="flex gap-4">
          <FormQuestionInput question={question} setQuestion={setQuestion} />
          <FormTypeSelector
            formElements={formElements}
            handleChange={handleChange}
          />
        </div>
        <div className="mt-5 flex items-center gap-4">
          {isMultipleChoiceOrCheckboxes ? (
            <OptionsManager
              options={options}
              addOption={addOption}
              removeOption={removeOption}
              updateOption={updateOption}
            />
          ) : (
            SelectedFormElement && <SelectedFormElement />
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
        <Button variant="icon" className="add-question">
          <PlusCircle />
        </Button>
        <Button variant="icon" className="delete-question">
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
