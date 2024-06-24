export interface INFTCollectionDetail {
  name: string;
  address: string;
  description: string;
  erc1155: boolean;
  erc721: boolean;
  totalSupply: number;
  circulatingSupply: number;
  genesisBlock: number | null;
  genesisTransaction: string | null;
}

interface ITrait {
  value: string;
  trait_type: string;
}

// details for one NFT (address) tokenId
export interface INFTDetail {
  collectionName: string;
  collectionAddress: string;
  collectionTokenId: string;
  description: string;
  name: string;
  imageUrl: string;
  traits: ITrait[];
}

export interface IGenericResponse<T> {
  data: T;
  error: string;
  success: boolean;
}

export interface IGetNFTsDetailByCollection {
  collection: string;
  tokens: INFTDetail[];
  totalPages: number;
  pageNumber: number;
  totalItems: number;
}

export interface IGetNFTsDetailByCollectionResponse
  extends IGenericResponse<IGetNFTsDetailByCollection> {}

export interface IGetNFTCollectionDetailResponse
  extends IGenericResponse<INFTCollectionDetail> {}
