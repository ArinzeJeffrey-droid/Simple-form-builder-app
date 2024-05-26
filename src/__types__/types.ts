export type Question = {
  id?: string;
  question?: string;
  isRequired?: boolean;
  formType?: any;
  options?: Array<string>;
  response?: string | Array<string>;
  position?: number;
};
