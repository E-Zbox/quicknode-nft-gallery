import styled, { css, keyframes } from "styled-components";

interface ISearch {
  $centerPosition: boolean;
}

interface ISearchIcon {
  $enabled: boolean;
}

const animationLength = "350ms";

const growSearchInput = keyframes`
    0% {
        width: 0%;
        height: 0px;
    }
    100% {
        height: 50px;
        width: 400px;
        max-width: calc(100vw - 20px);
    }
`;

const growSearchInputAnimation = css`
  ${growSearchInput} ${animationLength} linear forwards;
`;

const moveMainSearchToTop = keyframes`
    0% {
        top: 50%;
        right: 50%;
        transform: translate(50%, -50%);
    }
    100% {
        --position: 35px;
      top: var(--position);
      right: var(--position);
    }
`;

const moveMainSearchToTopAnimation = css`
  ${moveMainSearchToTop} ${animationLength} linear forwards;
`;

const moveMainSearchToCenter = keyframes`
    0% {
        --position: 35px;
        top: var(--position);
        right: var(--position);
    }
    100% {
        top: 50%;
        right: 50%;
        transform: translate(50%, -20%);
    }
`;

const moveMainSearchToCenterAnimation = css`
  ${moveMainSearchToCenter} ${animationLength} linear forwards;
`;

export const MainSearch = styled.main<ISearch>`
  width: fit-content;
  height: fit-content;
  position: fixed;
  transition: 350ms ease-in;
  animation: ${({ $centerPosition }) =>
    $centerPosition
      ? moveMainSearchToCenterAnimation
      : moveMainSearchToTopAnimation};
  ${({ $centerPosition, theme: { lightBlue } }) =>
    $centerPosition
      ? `
    top: 50%;
    right: 50%;
    transform: translate(-50%, -50%);

    & > main {
        border-radius: 5px;
    }
  `
      : `
      --position: 35px;
      top: var(--position);
      right: var(--position);

      & > main {
        scale: 0.95;
        border-radius: 30px;
        padding: calc(var(--three-px) * 2.5);
        box-shadow: 0px 0px 10px ${lightBlue};
        background: #bbbf;

        &:hover {
            scale: 1;
        }

        &:active {
            scale: 0.98;
            box-shadow: 1px 1px 5px ${lightBlue};
        }
      }
    `}
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const MainSearchbar = styled.main`
  height: fit-content;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  background: white;
  overflow: hidden;
  padding-right: var(--seven-px);
`;

export const SearchInput = styled.input<ISearch>`
  outline: none;
  border: none;
  color: ${({ theme: { darkBlue } }) => darkBlue};
  background: none;
  font-size: 1.2rem;
  transition: 350ms linear;
  ${({ $centerPosition }) =>
    $centerPosition
      ? `
  padding: 0px var(--seven-px);
  margin-right: var(--seven-px);
  `
      : `
  height: 0px;
  width: 0px;
  `}
  animation: ${({ $centerPosition }) =>
    $centerPosition ? growSearchInputAnimation : ``};
`;

export const SearchIcon = styled.img<ISearchIcon>`
  --size: 30px;
  height: var(--size);
  width: var(--size);
  scale: 0.92;
  ${({ $enabled }) =>
    $enabled
      ? `
    opacity: 1;

    &:hover {
        scale: 1;
    }

    &:active {
        scale: 0.95;
    }
  `
      : `
    opacity: 0.38;

    &:hover, &:active {
        scale: 0.92;
    }
  `}
`;

export const SearchResult = styled.main`
  position: relative;
  height: fit-content;
  max-height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: scroll;
  margin-top: calc(var(--seven-px) * 2);
  background-color: ${({ theme: { textColor } }) => textColor};

  * {
    z-index: 1;
  }

  & > div {
    &::before {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      height: 100%;
      width: 100%;
      z-index: 0;
      background-color: ${({ theme: { darkBlue } }) => `${darkBlue}95`};
    }
  }
`;

export const SearchResultTitle = styled.h4`
  font-size: 1.01rem;
  font-weight: bold;
  padding-left: var(--seven-px);
  margin-bottom: var(--ten-px);
  color: #fffa;
`;

export const ResultCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-radius: 4px;
  padding: var(--seven-px);
  cursor: pointer;
  transition: ${animationLength} ease-out;

  &:hover {
    background-color: ${({ theme: { textColor } }) => `${textColor}c2`};
  }

  &:active {
    scale: 0.98;
  }
`;

export const ResultCardImg = styled.img`
  --size: 60px;
  height: var(--size);
  width: var(--size);
  border-radius: 3px;
  margin-right: var(--ten-px);
`;

export const ResultCardTitle = styled.h4`
  font-family: "Nunito Sans";
  font-size: 1.1rem;
  font-weight: bold;
`;

export const ResultCardSubTitle = styled.h4`
  font-family: "Source Sans Pro";
  font-size: 1.02rem;
  font-weight: 200;
  letter-spacing: 1px;
  color: #000c;

  span {
    color: #0006;
    font-family: "Nunito Sans";
    font-size: 0.9rem;
    font-weight: 700;
  }
`;
