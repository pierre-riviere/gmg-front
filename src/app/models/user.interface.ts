import { Task } from './task.interface';

export interface User {
  id?: string;
  name: string;
  firstname: string;
  email: string;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
  tasks?: Task[];
}
