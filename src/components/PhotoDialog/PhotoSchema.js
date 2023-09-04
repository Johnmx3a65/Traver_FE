import { z } from 'zod';

export const PhotoDialogInputs = [
  {
    name: 'id',
    hidden: true,
  },
  {
    name: 'locationId',
    hidden: true,
  },
  {
    name: 'previewUrl',
    label: 'Оптимизирана снимка',
    required: true,
  },
  {
    name: 'fullUrl',
    label: 'Пълна снимка',
    required: true,
  },
];

export const PhotoSchema = z.object({
  previewUrl: z
    .string()
    .regex(/^(http|https):\/\/.*$/, 'Невалидна стойност')
    .max(255, 'Максималната дължина е 255 символа'),
  fullUrl: z
    .string()
    .regex(/^(http|https):\/\/.*$/, 'Невалидна стойност')
    .max(255, 'Максималната дължина е 255 символа'),
  id: z.any().optional(),
  locationId: z.number(),
});

export const PhotoDefaultValues = {
  id: null,
  previewUrl: '',
  fullUrl: '',
  locationId: null,
};
