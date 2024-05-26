import { Question } from "@/__types__/types";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

type Props = {
  questions: Question[];
  handleShortAnswerChange: (
    value: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;
  handleParagraphChange: (
    value: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => void;
  handleCheckboxChange: (value: string, index: number) => void;
};

const FormPreview = ({
  questions,
  handleShortAnswerChange,
  handleParagraphChange,
  handleCheckboxChange,
}: Props) => {
  return (
    <div className="bg-gray p-4 border border-gray-light rounded-md">
      <h2 className="text-center text-2xl mb-5">Preview</h2>

      <form action="">
        {questions.map((question: Question, index) => {
          if (question.formType === "Short-answer") {
            return (
              <div className="grid w-full max-w-sm items-center gap-1.5 mb-5">
                <Label htmlFor={question.id} className="mb-2">
                  {question.question}
                </Label>
                <Input
                  id={question.id}
                  type="text"
                  required={question.isRequired}
                  value={question.response}
                  onChange={(e) => handleShortAnswerChange(e, index)}
                />
              </div>
            );
          }

          if (question.formType === "Paragraph") {
            return (
              <div className="grid w-full gap-1.5 mb-5">
                <Label htmlFor={question.id} className="mb-2">
                  {question.question}
                </Label>
                <Textarea
                  id={question.id}
                  value={question.response}
                  onChange={(e) => handleParagraphChange(e, index)}
                />
              </div>
            );
          }

          if (question.formType === "Checkboxes") {
            return (
              <div className="inline-flex flex-col items-center space-x-2">
                <label
                  htmlFor=""
                  className="text-sm font-medium leading-none mb-3"
                >
                  {question.question}
                </label>
                <div>
                  {question.options?.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <Checkbox
                        id={`checkbox-${question.id}-${optionIndex}`}
                        checked={question.response?.includes(option)}
                        onCheckedChange={() =>
                          handleCheckboxChange(option, index)
                        }
                      />
                      <span className="ml-4">{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        })}
      </form>
    </div>
  );
};

export default FormPreview;
