import { X } from "react-feather";
import Button from "../Button";
import { Input } from "../ui/input";

type Props = {
  options: string[];
  addOption: () => void;
  removeOption: (index: number) => void;
  updateOption: (index: number, value: string) => void;
};

const OptionsManager = ({
  options,
  addOption,
  removeOption,
  updateOption,
}: Props) => {
  return (
    <div className="w-full">
      {options.map((option, index) => (
        <div key={index} className="flex w-[30%] mb-2 items-center gap-2">
          <Input
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => updateOption(index, e.target.value)}
          />
          <Button
            variant="icon"
            className="remove-option"
            onClick={() => removeOption(index)}
          >
            <X />
          </Button>
        </div>
      ))}
      <Button onClick={addOption} variant="secondary">
        Add Option
      </Button>
    </div>
  );
};

export default OptionsManager;
