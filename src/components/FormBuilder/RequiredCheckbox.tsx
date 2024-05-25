import { Checkbox } from "../ui/checkbox";

type Props = {
  isRequired: boolean;
  setIsRequired: (isRequired: boolean) => void;
};

const RequiredCheckbox = ({ isRequired, setIsRequired }: Props) => {
  return (
    <div className="inline-flex items-center space-x-2">
      <Checkbox
        id="terms2"
        checked={isRequired}
        onCheckedChange={() => setIsRequired(!isRequired)}
      />
      <label
        htmlFor="terms2"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Required
      </label>
    </div>
  );
};

export default RequiredCheckbox;
