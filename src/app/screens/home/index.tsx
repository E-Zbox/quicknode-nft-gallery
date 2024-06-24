"use client";
import React, { MutableRefObject, useEffect, useRef } from "react";
// components
import Searchbar from "@/app/components/Searchbar";
// store
import { useNFTDetailStore, useSearchStore } from "@/store";
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
import { FlexContainer } from "@/app/styles/shared/Container.styles";
import { expressInThousands } from "@/utils/transform";

const HomeScreen = () => {
  const mainHomeRef = useRef() as MutableRefObject<HTMLDivElement>;

  const { nftCollectionDetailState, nftDetailState, selectedNFT } =
    useNFTDetailStore(
      ({ nftCollectionDetailState, nftDetailState, selectedNFT }) => ({
        nftCollectionDetailState,
        nftDetailState,
        selectedNFT,
      })
    );

  const { inCenterPosition, previousSearch } = useSearchStore(
    ({ inCenterPosition, previousSearch }) => ({
      inCenterPosition,
      previousSearch,
    })
  );

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
            <Scroller>
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
              </FlexContainer>
            </Scroller>
          </FlexContainer>
        </MainScreenOne>
      );
    }

    return <MainScreenOne></MainScreenOne>;
  };

  useEffect(() => {
    const target = mainHomeRef.current;
    console.log(target);

    if (!target) return;

    if (inCenterPosition) {
      console.log("i got called");
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

  return (
    <MainHome ref={mainHomeRef}>
      <Searchbar />
      <FlexContainer>
        <DummyScreen />
        {renderMainScreenOne()}
      </FlexContainer>
    </MainHome>
  );
};

export default HomeScreen;
