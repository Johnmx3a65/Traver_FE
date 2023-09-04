import { z } from 'zod';

export const UserDialogInputs = [
  {
    name: 'id',
    hidden: true,
  },
  {
    name: 'email',
    label: 'Ел. поща',
    required: true,
  },
  {
    name: 'name',
    label: 'Име',
    required: true,
  },
];

export const UserSchema = z.object({
  email: z.string().email('Невалидна стойност').max(255, 'Максималната дължина е 255 символа'),
  name: z.string().min(2, 'Минималната дължина е 2 символа').max(255, 'Максималната дължина е 255 символа'),
  role: z.string(),
  id: z.any().optional(),
});

export const UserDefaultValues = {
  id: null,
  email: '',
  name: '',
  role: 'USER',
};
