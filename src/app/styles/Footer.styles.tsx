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

export const FloatingCard = styled.a`
  text-decoration: none;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: calc(var(--ten-px) * 2);
  border-radius: 30px;
  overflow: hidden;
  scale: 0.92;
  transform: translateX(-20px);

  &:last-of-type {
    scale: 1;
    border-radius: 5px;
    transform: translateX(0);
    background-color: #242630;

    &:hover {
      scale: 1.1;
    }

    &:active {
      scale: 1.05;
    }
  }

  &:hover {
    scale: 1;
  }

  &:active {
    scale: 0.95;
  }
`;

export const PoweredTitle = styled.h4`
  font-size: 1.05rem;
  font-weight: bold;
  color: ${({ theme: { textColor } }) => textColor};
  margin-right: 10px;
`;

export const SocialIcons = styled.img<ISocialIcons>`
  --size: 40px;
  height: var(--size);
  width: var(--size);
  background: url(${({ $bgImg }) => $bgImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
