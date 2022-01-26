import styled from "styled-components";

type ButtonProps = {
  onClick: () => void;
  text: string;
  disabled?: boolean;
};

const ButtonWrapper = styled.button`
  padding: 10px 20px;
  background: blue;
  border: none;
  border-radius: 8px;
  color: white;
  opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};
`;

const Button = ({ onClick, text, disabled = false }: ButtonProps) => {
  return (
    <ButtonWrapper disabled={disabled} onClick={onClick}>
      {text}
    </ButtonWrapper>
  );
};

export default Button;
