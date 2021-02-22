export enum DeliveryStatus {
  Delivering = 'Delivering',
  Completed = 'Completed',
  Failure = 'Failure',
  Waiting = 'Waiting',
}

export interface Statuses {
  waiting: DeliveryStatus.Waiting;
  delivering: DeliveryStatus.Delivering;
  failure: DeliveryStatus.Failure;
  completed: DeliveryStatus.Completed;
}
