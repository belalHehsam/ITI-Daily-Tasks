export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  category: 'Work' | 'Study' | 'Personal';
  date: string;
  tags?: string[];
  isDone: boolean;
}

export type error = {
  status: boolean;
  message: string;
};

export type notificationType = 'success' | 'danger' | 'info';

export type notification = {
  type: notificationType;
  message: string;
};

export type user = {
  email: string;
  password: string;
};
