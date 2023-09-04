import { z } from 'zod';

export const LocationDialogInputs = [
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
    name: 'subtitle',
    label: 'Подзаглавие',
    required: true,
  },
  {
    name: 'picture',
    label: 'Снимка',
    required: true,
  },
  {
    name: 'coordinates',
    label: 'Кординати',
    required: true,
  },
];

export const LocationSchema = z.object({
  id: z.any().optional(),
  name: z.string().min(2, 'Минималната дължина е 2 символа').max(255, 'Максималната дължина е 255 символа'),
  subtitle: z.string().min(2, 'Минималната дължина е 2 символа').max(255, 'Максималната дължина е 255 символа'),
  picture: z
    .string()
    .regex(/^(http|https):\/\/.*$/gm, 'Невалидна стойност')
    .max(255, 'Максималната дължина е 255 символа'),
  coordinates: z
    .string()
    .regex(/^(\d+\.\d+);(\d+\.\d+)$/gm, 'Невалидна стойност')
    .min(2, 'Минималната дължина е 2 символа')
    .max(255, 'Максималната дължина е 255 символа'),
  categoryId: z.number(),
  description: z.string().min(2, 'Минималната дължина е 2 символа'),
});

export const LocationDefaultValues = {
  id: null,
  categoryId: 2,
  name: '',
  picture: '',
  coordinates: '',
  description: '',
  subtitle: '',
};
