export interface TimeSlotCapacity {
  [key: string]: {
    capacity: number;
    booked: number;
  };
}
