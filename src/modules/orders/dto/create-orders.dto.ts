import { DeliveryStatus } from '../interfaces/delivery-statuses.enum';

export class CreateOrderDTO {
  cash: string;
  card: {
    number: string;
    cvv: string;
    expDate: string;
  };
  adress: {
    district: string;
    street: string;
    numberHouse: string;
    numberApartment: string;
  };
  status: DeliveryStatus;
  total: number;
  dishes: string[];
}
