import { Food } from './foodAPI.interface';
export interface FoodResponse {
  total: number;
  currentPage: number;
  totalPages: number;
  foods: Food[];
}
