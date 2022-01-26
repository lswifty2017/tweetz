import styled from "styled-components";

type ButtonProps = {
  onClick: () => void;
  text: string;
  disabled?: boolean;
  color?: string;
};

const ButtonWrapper = styled.button`
  padding: 10px 20px;
  background: ${({ color }) => color};
  border: none;
  border-radius: 8px;
  color: white;
  opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};
  cursor: pointer;
`;

const Button = ({
  onClick,
  text,
  disabled = false,
  color = "blue",
}: ButtonProps) => {
  return (
    <ButtonWrapper color={color} disabled={disabled} onClick={onClick}>
      {text}
    </ButtonWrapper>
  );
};

export default Button;
