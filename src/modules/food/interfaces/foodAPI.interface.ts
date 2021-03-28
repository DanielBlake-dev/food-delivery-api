export interface Food {
  dataType: string;
  description: string;
  fdcId: number;
  foodNutrients: [
    {
      number: number;
      name: string;
      amount: number;
      unitName: string;
      derivationCode: string;
      derivationDescription: string;
    },
  ];
  publicationDate: string;
  brandOwner: string;
  gtinUpc: string;
  ndbNumber: string;
  foodCode: string;
}

export interface FoodAPI {
  totalHits: number;
  currentPage: number;
  totalPages: number;
  pageList: number[];
  foodSearchCriteria: {
    dataType: string[];
    query: string;
    generalSearchInput: string;
    pageNumber: number;
    numberOfResultsPerPage: number;
    pageSize: number;
    requireAllWords: boolean;
    foodTypes: string[];
  };
  foods: Food[];
  aggregations: {
    dataType: { [key: string]: number };
    nutrients: any;
  };
}
