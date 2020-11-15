enum TaskStatus {
  'todo',
  'processing',
  'pending',
  'done',
}

export interface Task {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  created_at: string;
  updated_at: string;
}
