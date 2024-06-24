import styled from "styled-components";

interface IMainApp {
  $bgImg: string;
}

export const MainApp = styled.main<IMainApp>`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background: url(${({ $bgImg }) => $bgImg});
  background-position: -50% 200px;
  background-size: auto 90%;

  &::before {
    content: "";
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background: ${({ theme: { darkBlue, black } }) =>
      `radial-gradient(ellipse at center, ${darkBlue}df, ${black}ff)`};
  }
`;

// Photo by <a href="https://unsplash.com/@frostroomhead?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Rodion Kutsaiev</a> on <a href="https://unsplash.com/photos/a-group-of-colorful-bitcoins-sitting-on-top-of-a-white-background-VyXIPuT0EEE?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
