import { Input } from "../ui/input";

type Props = {
  question: string;
  setQuestion: (question: string) => void;
};

const FormQuestionInput = ({ question, setQuestion }: Props) => {
  return (
    <Input
      placeholder="Question"
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
    />
  );
};

export default FormQuestionInput;
