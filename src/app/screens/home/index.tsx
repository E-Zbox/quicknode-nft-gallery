"use client";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
// api
import { getNFTsByCollection } from "@/api";
// components
import Searchbar from "@/app/components/Searchbar";
// store
import { useErrorStore, useNFTDetailStore, useSearchStore } from "@/store";
// styles
import {
  AddressText,
  DummyScreen,
  MainHome,
  MainScreenOne,
  NFTCard,
  Scroller,
  SubTitle,
  Title,
  TokenId,
} from "@/app/styles/home/index.styles";
import {
  FlexContainer,
  PositionContainer,
} from "@/app/styles/shared/Container.styles";
import { expressInThousands } from "@/utils/transform";
import {
  SearchErrorCard,
  SearchErrorIcon,
  SearchErrorMessage,
} from "@/app/styles/Searchbar.styles";
// utils
import { screens } from "@/utils/data";

const HomeScreen = () => {
  const animationDuration = 5150;

  const mainHomeRef = useRef() as MutableRefObject<HTMLDivElement>;
  const scrollerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const timeoutIdRef = useRef() as MutableRefObject<NodeJS.Timeout>;

  const [loading, setLoading] = useState(false);

  const { errorMessage, setErrorMessage } = useErrorStore(
    ({ errorMessage, setErrorMessage }) => ({ errorMessage, setErrorMessage })
  );

  const {
    nftCollectionDetailState,
    nftDetailState,
    updateNFTDetailState,
    selectedNFT,
  } = useNFTDetailStore(
    ({
      nftCollectionDetailState,
      nftDetailState,
      updateNFTDetailState,
      selectedNFT,
    }) => ({
      nftCollectionDetailState,
      nftDetailState,
      updateNFTDetailState,
      selectedNFT,
    })
  );

  const { inCenterPosition } = useSearchStore(({ inCenterPosition }) => ({
    inCenterPosition,
  }));

  const {
    home: {
      assets: { searchErrorIcon },
    },
  } = screens;

  const onScrollEventHandler = async (e: Event) => {
    if (loading) return;

    const target = scrollerRef.current;

    const { clientHeight, scrollHeight, scrollTop } = target;

    if (scrollTop + clientHeight > scrollHeight - 50) {
      setLoading(true);
      const nftDetails = nftDetailState[selectedNFT];

      const { address } = nftCollectionDetailState[selectedNFT];
      const page = Math.floor(nftDetails.length / 40) + 1;
      const { data, error, success } = await getNFTsByCollection(address, page);

      if (!success) {
        setErrorMessage(error);
        setLoading(false);
        return;
      }

      updateNFTDetailState({ [selectedNFT]: [...nftDetails, ...data.tokens] });

      setLoading(false);
    }
  };

  const renderMainScreenOne = () => {
    if (selectedNFT) {
      const nftDetails = nftDetailState[selectedNFT];

      const { address, name } = nftCollectionDetailState[selectedNFT];
      return (
        <MainScreenOne>
          <FlexContainer>
            <Title>{name}</Title>
            <AddressText>{address.toUpperCase()}</AddressText>
          </FlexContainer>
          <FlexContainer
            $height={"100%"}
            $miscellaneous="margin-top: 20px; overflow: hidden;"
          >
            <SubTitle>
              Showing {expressInThousands(nftDetails.length)} tokens{" "}
            </SubTitle>
            <Scroller ref={scrollerRef}>
              <FlexContainer
                $flexDirection="row"
                $justifyContent="center"
                $flexWrap="wrap"
              >
                {nftDetails.map(({ collectionTokenId, imageUrl }, key) => (
                  <NFTCard key={key} $bgImg={imageUrl}>
                    <TokenId>
                      # <span>{collectionTokenId}</span>
                    </TokenId>
                  </NFTCard>
                ))}
                {loading ? (
                  <FlexContainer
                    $height="80px"
                    $alignItems="center"
                    $justifyContent="center"
                  >
                    <p>loading...</p>
                  </FlexContainer>
                ) : (
                  <></>
                )}
              </FlexContainer>
            </Scroller>
          </FlexContainer>
        </MainScreenOne>
      );
    }

    return <MainScreenOne></MainScreenOne>;
  };

  useEffect(() => {
    if (scrollerRef.current) {
      scrollerRef.current.addEventListener("scrollend", onScrollEventHandler);
    }

    return () => {
      scrollerRef.current?.removeEventListener(
        "scrollend",
        onScrollEventHandler
      );
    };
  }, [selectedNFT]);

  useEffect(() => {
    const target = mainHomeRef.current;

    if (!target) return;

    if (inCenterPosition) {
      target.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    } else {
      const { clientHeight } = target;

      target.scrollTo({
        behavior: "smooth",
        top: clientHeight * 1,
      });
    }
  }, [inCenterPosition]);

  useEffect(() => {
    if (loading) {
      scrollerRef.current.scrollTo({
        behavior: "smooth",
        top: scrollerRef.current.scrollHeight,
      });
    }
  }, [loading]);

  useEffect(() => {
    if (errorMessage.length > 0) {
      timeoutIdRef.current = setTimeout(() => {
        setErrorMessage("");
      }, animationDuration);
    }

    if (errorMessage.length == 0 && timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
  }, [errorMessage]);

  return (
    <MainHome ref={mainHomeRef}>
      <Searchbar />
      <FlexContainer>
        <DummyScreen />
        {renderMainScreenOne()}
      </FlexContainer>
      {errorMessage.length > 0 ? (
        <PositionContainer
          $position="fixed"
          $top="30px"
          $left="50%"
          $alignItems="center"
          $justifyContent="center"
          $miscellaneous="transform: translateX(-50%);"
        >
          <SearchErrorCard $animationDuration={`${animationDuration}ms`}>
            <SearchErrorIcon src={searchErrorIcon.src} />
            <FlexContainer
              $justifyContent="center"
              $height="40px"
              $miscellaneous="overflow-x: scroll;"
            >
              <SearchErrorMessage>{errorMessage}</SearchErrorMessage>
            </FlexContainer>
          </SearchErrorCard>
        </PositionContainer>
      ) : (
        <></>
      )}
    </MainHome>
  );
};

export default HomeScreen;
