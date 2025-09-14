export type Priority = "Low" | "Medium" | "High";
export type Status = "To Do" | "In Progress" | "Done";

export type Task = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  priority: Priority;
  status: Status;
  description: string;
  tags: string[];
};
