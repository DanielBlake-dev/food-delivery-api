import { DeliveryStatus } from './delivery-statuses.enum';

export enum FiltersDirection {
  Desc = -1,
  Esc = 1,
}

export interface Filters {
  date?: {
    type: FiltersDirection;
  };
  status?: DeliveryStatus;
}
