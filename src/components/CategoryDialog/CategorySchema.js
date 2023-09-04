import { z } from 'zod';

export const CategoryDialogInputs = [
  {
    name: 'id',
    hidden: true,
  },
  {
    name: 'name',
    label: 'Име',
    required: true,
  },
  {
    name: 'picture',
    label: 'Снимка',
    required: true,
  },
];

export const CategorySchema = z.object({
  name: z.string().min(2, 'Минималната дължина е 2 символа').max(255, 'Максималната дължина е 255 символа'),
  picture: z
    .string()
    .regex(/^(http|https):\/\/.*$/, 'Невалидна стойност')
    .min(2, 'Минималната дължина е 2 символа')
    .max(255, 'Максималната дължина е 255 символа'),
  id: z.any().optional(),
});

export const CategoryDefaultValues = {
  id: null,
  name: '',
  picture: '',
};
