import styled from "styled-components";

interface INFTCard {
  $bgImg: string;
}

export const MainHome = styled.main`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
`;

export const DummyScreen = styled.main`
  height: 100vh;
  width: 100%;
`;

export const MainScreenOne = styled.main`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: calc(var(--ten-px) * 4) calc(var(--ten-px) * 2)
    calc(var(--ten-px) * 2);
  background: #0004;
`;

export const Title = styled.h4`
  font-size: 1.5rem;
  border-radius: 3px;
  padding: var(--ten-px) calc(var(--seven-px) * 2);
  color: ${({ theme: { textColor } }) => textColor};
  background-color: ${({ theme: { textColor } }) => `${textColor}3A`};
`;

export const AddressText = styled.h4`
  margin-top: var(--three-px);
  font-size: 1.2rem;
  color: ${({ theme: { lightBlue } }) => lightBlue};
`;

export const SubTitle = styled.h4`
  width: 100%;
  color: ${({ theme: { textColor } }) => `${textColor}6A`};
  padding-bottom: var(--seven-px);
  border-bottom: 1.5px solid ${({ theme: { textColor } }) => `${textColor}6A`};
`;

export const Scroller = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  overflow: scroll;
  margin-top: calc(var(--seven-px) * 1.5);
`;

export const NFTCard = styled.div<INFTCard>`
  --margin: calc(var(--ten-px) * 1.5);
  --size: 200px;
  height: var(--size);
  width: var(--size);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 20px;
  background: url(${({ $bgImg }) => $bgImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  margin-top: var(--margin);
  margin-right: var(--margin);
  padding: var(--ten-px);
`;

export const TokenId = styled.h4`
  width: fit-content;
  min-width: 50px;
  font-family: "Nunito Sans";
  font-size: 1.2rem;
  font-weight: 200;
  color: ${({ theme: { textColor } }) => textColor};
  background-color: ${({ theme: { lightBlue } }) => lightBlue};
  padding: var(--three-px) calc(var(--seven-px) * 2);
  border-radius: 30px;

  span {
    font-weight: 900;
  }
`;
