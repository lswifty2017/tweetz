import styled from "styled-components";

type TextArea = {
  value: string;
  onChange: (event: any) => void;
};

const TextAreaWrapper = styled.textarea`
  border: 1px solid black;
  border-radius: 8px;
  margin-bottom: 8px;
  padding: 8px;
  width: 300px;
  height: 200px;
`;

const TextArea = ({ value, onChange }: TextArea) => {
  return (
    <TextAreaWrapper
      value={value}
      onChange={onChange}
      placeholder="Tweet up to 280 characters"
    ></TextAreaWrapper>
  );
};

export default TextArea;
