import { forwardRef } from "react";
import { Input } from "../ui/input";

type Props = {
  question: string;
  setQuestion: (question: string) => void;
};

const FormQuestionInput = forwardRef<HTMLInputElement, Props>(
  ({ question, setQuestion }: Props, ref) => {
    return (
      <Input
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        ref={ref}
      />
    );
  }
);

export default FormQuestionInput;
