export interface BoardItem {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  points: number;
  state: string
}

export enum BoardItemStatusType {
  NEW = 'New',
  ACTIVE = 'Active',
  RESOLVED = 'Resolved',
}
