import { IColumn } from "./models/column.interface";

export const mockCategories = [
  { id: '1', category_id: '1', category_title: 'To Do' },
  { id: '2', category_id: '2', category_title: 'In Progress' },
  { id: '3', category_id: '3', category_title: 'Done' },
];

export const mockTasks = [
  {
    id: '1',
    item_id: '1',
    item_title: 'Task 1',
    item_description: 'Task 1 description',
    order_id: '1',
    category_id: '1',
  },
  {
    id: '2',
    item_id: '2',
    item_title: 'Task 2',
    item_description: 'Task 2 description',
    order_id: '2',
    category_id: '1',
  },
  {
    id: '3',
    item_id: '3',
    item_title: 'Task 3',
    item_description: 'Task 3 description',
    order_id: '3',
    category_id: '2',
  },
  {
    id: '4',
    item_id: '4',
    item_title: 'Task 4',
    item_description: 'Task 4 description',
    order_id: '4',
    category_id: '2',
  },
  {
    id: '5',
    item_id: '5',
    item_title: 'Task 5',
    item_description: 'Task 5 description',
    order_id: '5',
    category_id: '3',
  },
  {
    id: '6',
    item_id: '6',
    item_title: 'Task 6',
    item_description: 'Task 6 description',
    order_id: '6',
    category_id: '3',
  },
  {
    id: '7',
    item_id: '7',
    item_title: 'Task 7',
    item_description: 'Task 7 description',
    order_id: '7',
    category_id: '3',
  },
  {
    id: '8',
    item_id: '8',
    item_title: 'Task 8',
    item_description: 'Task 8 description',
    order_id: '8',
    category_id: '3',
  },
];

// merge items and categories

export const mockData: IColumn[] = mockCategories.map((category) => {
  const tasks = mockTasks.filter(
    (task) => task.category_id === category.category_id
  );
  return { ...category, tasks };
});

interface ICategory {
  id: string;
  order_id: string;
  title: string;
  tasks: {
    id: string;
    order_id: string;
    title: string;
    description: string;
  }[];
}
