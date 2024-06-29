"use client";
import {
  ChangeEvent,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
// api
import { getNFTCollectionDetail, getNFTsByCollection } from "@/api";
// store
import { useErrorStore, useNFTDetailStore, useSearchStore } from "@/store";
// styles
import {
  FlexContainer,
  PositionContainer,
} from "../styles/shared/Container.styles";
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
import { expressInThousands } from "@/utils/transform";

const LOCAL_STORAGE_NFT_DETAIL_STATE = "nftDetailState";

const LOCAL_STORAGE_NFT_COLLECTION_DETAIL_STATE = "nftCollectionDetailState";

const Searchbar = () => {
  const intervalIdRef = useRef() as MutableRefObject<NodeJS.Timeout>;
  const { setErrorMessage } = useErrorStore(({ setErrorMessage }) => ({
    setErrorMessage,
  }));

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

  const [placeholderCounter, setPlaceholderCounter] = useState(0);

  const {
    home: {
      assets: { searchIcon },
      search: { placeholders },
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
      setErrorMessage(nftsByCollectionResult.error);

      setLoading(false);

      return;
    }

    updateNFTDetailState({
      [tokenAddress]: nftsByCollectionResult.data.tokens,
    });

    const nftCollectionDetail = await getNFTCollectionDetail(inputSearch);

    if (!nftCollectionDetail.success) {
      setErrorMessage(nftCollectionDetail.error);

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
            const { address, circulatingSupply, name, totalSupply } =
              nftCollectionDetailState[tag];

            const tokenAddress = `#${address.toLowerCase()}`;

            let totalSupplyInThousands = "";

            if (totalSupply) {
              if (circulatingSupply && totalSupply < circulatingSupply) {
                totalSupplyInThousands = expressInThousands(circulatingSupply);
              } else {
                totalSupplyInThousands = expressInThousands(totalSupply);
              }
            } else if (circulatingSupply) {
              totalSupplyInThousands = expressInThousands(circulatingSupply);
            }

            return (
              <ResultCard
                key={key}
                onClick={() => setSelectedNFT(tokenAddress)}
              >
                <ResultCardImg src={firstCard.imageUrl} />
                <FlexContainer>
                  <ResultCardTitle>{name}</ResultCardTitle>
                  {totalSupplyInThousands.length > 0 ? (
                    <ResultCardSubTitle>
                      <span>{totalSupplyInThousands}</span> tokens available
                    </ResultCardSubTitle>
                  ) : (
                    <></>
                  )}
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

  useEffect(() => {
    if (intervalIdRef.current && inputSearch.length > 0) {
      clearInterval(intervalIdRef.current);
    } else {
      intervalIdRef.current = setInterval(() => {
        setPlaceholderCounter((prevState) => {
          if (prevState >= placeholders.length - 1) {
            return 0;
          }
          return prevState + 1;
        });
      }, 5000);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [inputSearch]);

  return (
    <MainSearch $centerPosition={inCenterPosition}>
      <MainSearchbar>
        <SearchInput
          $centerPosition={inCenterPosition}
          id="input_search"
          name="input_search"
          value={inputSearch}
          placeholder={placeholders[placeholderCounter]?.text}
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

// "HttpRequestError: HTTP request failed. URL: https://docs-demo.quiknode.pro Request body: {"method":"qn_fetchNFTsByCollection","params":[{"collection":"0x34Bf014465eA398dA11cBbbaac2377C215b08190","page":1}]} Details: Failed to fetch Version: viem@2.16.1"
