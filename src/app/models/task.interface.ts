export enum TaskStatus {
  'todo' = 'todo',
  'processing' = 'processing',
  'pending' = 'pending',
  'done' = 'done',
}

export interface Task {
  id?: string;
  name: string;
  description: string;
  status: TaskStatus;
  created_at?: string;
  updated_at?: string;
}
