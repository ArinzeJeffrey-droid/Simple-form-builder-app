import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  formElements: { [key: string]: React.FC };
  handleChange: (value: string) => void;
  formType: any;
};

const FormTypeSelector = ({ formType, formElements, handleChange }: Props) => {
  return (
    <Select onValueChange={handleChange} value={formType}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Choose Field Type" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(formElements).map((key) => (
          <SelectItem key={key} value={key}>
            {key.replace("-", " ")}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FormTypeSelector;
