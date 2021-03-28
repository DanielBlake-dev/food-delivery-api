import { OrderDocument } from '../models/order.model';
import { Statuses } from './delivery-statuses.enum';

export interface OrdersResponse {
  orders: OrderDocument[];
  total: number;
  statuses: Statuses;
}
