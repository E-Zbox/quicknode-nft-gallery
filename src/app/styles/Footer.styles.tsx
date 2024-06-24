import styled from "styled-components";

interface ISocialIcons {
  $bgImg: string;
}

export const MainFooter = styled.main`
  position: fixed;
  right: 40px;
  bottom: 40px;
  right: fit-content;
  height: fit-content;
  width: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const FloatingCard = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: calc(var(--ten-px) * 2);
  border-radius: 30px;
  overflow: hidden;
  transform: translateX(-20px);

  &:last-of-type {
    border-radius: 5px;
    transform: translateX(0);
    background-color: #242630;
  }
`;

export const PoweredTitle = styled.h4`
  font-size: 1.05rem;
  font-weight: bold;
  color: ${({ theme: { textColor } }) => textColor};
  margin-right: 10px;
`;

export const SocialIcons = styled.a<ISocialIcons>`
  --size: 40px;
  height: var(--size);
  width: var(--size);
  scale: 0.9;
  background: url(${({ $bgImg }) => $bgImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  &:hover {
    scale: 1;
  }

  &:active {
    scale: 0.95;
  }
`;
