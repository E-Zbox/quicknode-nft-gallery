// interface
import {
  IGetNFTsDetailByCollectionResponse,
  IGetNFTCollectionDetailResponse,
} from "./interface";

import { Core } from "@quicknode/sdk";

const QUICKNODE_ENDPOINT = process.env.NEXT_PUBLIC_QUICKNODE_ENDPOINT;

if (!QUICKNODE_ENDPOINT) {
  throw new Error(`Missing QUICKNODE_ENDPOINT in env variables`);
}

const core = new Core({
  endpointUrl: QUICKNODE_ENDPOINT,
  config: {
    addOns: {
      nftTokenV2: true,
    },
  },
});

export const getNFTsByCollection = async (
  collection: string,
  page: number = 1
): Promise<IGetNFTsDetailByCollectionResponse> => {
  let response: IGetNFTsDetailByCollectionResponse = {
    data: {
      collection: "",
      pageNumber: 1,
      tokens: [],
      totalItems: 0,
      totalPages: 1,
    },
    error: "",
    success: false,
  };

  try {
    const res = await core.client.qn_fetchNFTsByCollection({
      collection,
      page,
    });

    if (res.tokens.length == 0)
      throw Error(`"${collection}" is not an ERC-721 address`);

    response = {
      data: { ...response.data, ...res },
      error: "",
      success: true,
    };
  } catch (error) {
    let errorMessage = `${error}`;
    let finalErrorMessage = errorMessage;

    if (errorMessage.includes("Error:")) {
      finalErrorMessage = errorMessage.split("Error:")[1];
    }

    if (errorMessage.includes("HttpRequestError")) {
      finalErrorMessage = "Failed to fetch request";
    }

    response = {
      ...response,
      error: finalErrorMessage,
    };
  } finally {
    return response;
  }
};

export const getNFTCollectionDetail = async (
  contractAddress: string
): Promise<IGetNFTCollectionDetailResponse> => {
  let response: IGetNFTCollectionDetailResponse = {
    data: {
      address: "",
      circulatingSupply: 0,
      description: "",
      erc1155: false,
      erc721: false,
      genesisBlock: 0,
      genesisTransaction: "",
      name: "",
      totalSupply: 0,
    },
    error: "",
    success: false,
  };

  try {
    const [data] = await core.client.qn_fetchNFTCollectionDetails({
      contracts: [contractAddress],
    });

    response = {
      data,
      error: "",
      success: true,
    };
  } catch (error) {
    let errorMessage = `${error}`;
    let finalErrorMessage = errorMessage;

    if (errorMessage.includes("Error:")) {
      finalErrorMessage = errorMessage.split("Error:")[1];
    }

    if (errorMessage.includes("HttpRequestError")) {
      finalErrorMessage = "Failed to fetch request";
    }

    response = {
      ...response,
      error: errorMessage,
    };
  } finally {
    return response;
  }
};
