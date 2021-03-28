import { DeliveryStatus } from '../../orders/interfaces/delivery-statuses.enum';

export class ChangeStatusDTO {
  id: string;
  status: DeliveryStatus;
}
