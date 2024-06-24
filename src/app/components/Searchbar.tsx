"use client";
import { ChangeEvent, useEffect, useState } from "react";
// api
import { getNFTCollectionDetail, getNFTsByCollection } from "@/api";
// store
import { useNFTDetailStore, useSearchStore } from "@/store";
// styles
import {
  MainSearch,
  MainSearchbar,
  ResultCard,
  ResultCardImg,
  ResultCardSubTitle,
  ResultCardTitle,
  SearchIcon,
  SearchInput,
  SearchResult,
  SearchResultTitle,
} from "../styles/Searchbar.styles";
// utils
import { screens } from "@/utils/data";
import {
  FlexContainer,
  PositionContainer,
} from "../styles/shared/Container.styles";
import { expressInThousands } from "@/utils/transform";

const LOCAL_STORAGE_NFT_DETAIL_STATE = "nftDetailState";

const LOCAL_STORAGE_NFT_COLLECTION_DETAIL_STATE = "nftCollectionDetailState";

const Searchbar = () => {
  const {
    nftDetailState,
    updateNFTDetailState,
    selectedNFT,
    setSelectedNFT,
    nftCollectionDetailState,
    updateNFTCollectionDetailState,
  } = useNFTDetailStore(
    ({
      nftDetailState,
      updateNFTDetailState,
      selectedNFT,
      setSelectedNFT,
      nftCollectionDetailState,
      updateNFTCollectionDetailState,
    }) => ({
      nftDetailState,
      updateNFTDetailState,
      selectedNFT,
      setSelectedNFT,
      nftCollectionDetailState,
      updateNFTCollectionDetailState,
    })
  );
  const {
    loading,
    setLoading,
    inCenterPosition,
    toggleInCenterPosition,
    previousSearch,
    updatePreviousSearch,
    setPreviousSearch,
  } = useSearchStore(
    ({
      loading,
      setLoading,
      inCenterPosition,
      toggleInCenterPosition,
      previousSearch,
      updatePreviousSearch,
      setPreviousSearch,
    }) => ({
      loading,
      setLoading,
      inCenterPosition,
      toggleInCenterPosition,
      previousSearch,
      updatePreviousSearch,
      setPreviousSearch,
    })
  );

  const [inputSearch, setInputSearch] = useState("");

  const {
    home: {
      assets: { searchIcon },
    },
  } = screens;

  const handleInputChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (loading) return;

    setInputSearch(value);
  };

  const handleClick = async () => {
    if (!inCenterPosition) {
      toggleInCenterPosition();
      return;
    }

    if (loading || inputSearch.length == 0) return;

    const tokenAddress = `#${inputSearch.toLowerCase()}`;

    const tokenAddressExists = nftCollectionDetailState[tokenAddress];

    if (tokenAddressExists) {
      setSelectedNFT(tokenAddress);
      return;
    }

    setLoading(true);
    const nftsByCollectionResult = await getNFTsByCollection(inputSearch);

    if (!nftsByCollectionResult.success) {
      console.log(nftsByCollectionResult.error);

      setLoading(false);

      return;
    }

    updateNFTDetailState({
      [tokenAddress]: nftsByCollectionResult.data.tokens,
    });

    const nftCollectionDetail = await getNFTCollectionDetail(inputSearch);

    if (!nftCollectionDetail.success) {
      console.log(nftCollectionDetail.error);
      setLoading(false);
      return;
    }

    updateNFTCollectionDetailState({
      [tokenAddress]: nftCollectionDetail.data,
    });

    setSelectedNFT(tokenAddress);

    setLoading(false);
  };

  const renderPreviousSearch = () => {
    if (previousSearch.length == 0 || !inCenterPosition) return <></>;

    return (
      <SearchResult>
        <PositionContainer
          $position="relative"
          $padding="calc(var(--seven-px) * 2) var(--seven-px) var(--seven-px)"
        >
          <SearchResultTitle>Recent</SearchResultTitle>
          {previousSearch.map((tag, key) => {
            const [firstCard] = nftDetailState[tag];
            const { address, name, totalSupply } =
              nftCollectionDetailState[tag];

            const tokenAddress = `#${address.toLowerCase()}`;

            const totalSupplyInThousands = expressInThousands(totalSupply);
            return (
              <ResultCard
                key={key}
                onClick={() => setSelectedNFT(tokenAddress)}
              >
                <ResultCardImg src={firstCard.imageUrl} />
                <FlexContainer>
                  <ResultCardTitle>{name}</ResultCardTitle>
                  <ResultCardSubTitle>
                    <span>{totalSupplyInThousands}</span> tokens available
                  </ResultCardSubTitle>
                </FlexContainer>
              </ResultCard>
            );
          })}
        </PositionContainer>
      </SearchResult>
    );
  };

  useEffect(() => {
    // first render
    const nftCollectionDetailStateInLocalStorage = localStorage.getItem(
      LOCAL_STORAGE_NFT_COLLECTION_DETAIL_STATE
    );

    if (nftCollectionDetailStateInLocalStorage) {
      updateNFTCollectionDetailState(
        JSON.parse(nftCollectionDetailStateInLocalStorage)
      );
    }

    const nftDetailStateInLocalStorage = localStorage.getItem(
      LOCAL_STORAGE_NFT_DETAIL_STATE
    );

    if (nftDetailStateInLocalStorage) {
      updateNFTDetailState(JSON.parse(nftDetailStateInLocalStorage));
    }
  }, []);

  useEffect(() => {
    if (inCenterPosition) {
      setSelectedNFT("");
    }
  }, [inCenterPosition]);

  useEffect(() => {
    const nftDetailStateKeys = Object.getOwnPropertyNames(nftDetailState);

    if (nftDetailStateKeys.length > 0) {
      localStorage.setItem(
        LOCAL_STORAGE_NFT_DETAIL_STATE,
        JSON.stringify(nftDetailState)
      );
    }
  }, [nftDetailState]);

  useEffect(() => {
    const nftCollectionDetailStateKeys = Object.getOwnPropertyNames(
      nftCollectionDetailState
    );

    if (nftCollectionDetailStateKeys.length > 0) {
      localStorage.setItem(
        LOCAL_STORAGE_NFT_COLLECTION_DETAIL_STATE,
        JSON.stringify(nftCollectionDetailState)
      );

      if (previousSearch.length == 0) {
        setPreviousSearch(nftCollectionDetailStateKeys);
      }
    }
  }, [nftCollectionDetailState]);

  useEffect(() => {
    if (selectedNFT.length > 0) {
      updatePreviousSearch(selectedNFT);
    }
  }, [selectedNFT]);

  useEffect(() => {
    if (selectedNFT.length > 0) {
      toggleInCenterPosition();
    }
  }, [selectedNFT]);

  return (
    <MainSearch $centerPosition={inCenterPosition}>
      <MainSearchbar>
        <SearchInput
          $centerPosition={inCenterPosition}
          id="input_search"
          name="input_search"
          value={inputSearch}
          onChange={handleInputChange}
        />
        <SearchIcon
          $enabled={!loading && inputSearch.length > 0}
          src={searchIcon.src}
          onClick={handleClick}
        />
      </MainSearchbar>
      {loading ? (
        <FlexContainer
          $height={"50px"}
          $alignItems="center"
          $justifyContent="center"
          $miscellaneous="margin-top: var(--seven-px)"
        >
          <p>loading...</p>
        </FlexContainer>
      ) : (
        <></>
      )}
      {renderPreviousSearch()}
    </MainSearch>
  );
};

export default Searchbar;
