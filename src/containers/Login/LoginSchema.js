import { z } from 'zod';

export const LoginSchema = z.object({
  email: z
    .string()
    .min(2, 'Минималната дължина е 2 символа')
    .email('Стойността на полето трябва да е във формат на ел. поща')
    .max(255, 'Максималната дължина е 255 символа'),
  password: z
    .string()
    .min(6, 'Минималната дължина е 6 символа')
    .regex(/^[a-zA-Z0-9_]{6,255}$/, 'Паролата може да съдържа само латински букви, цифри и символът "_"')
    .max(255, 'Максималната дължина е 255 символа'),
});

export const LoginDefaultValues = {
  email: '',
  password: '',
};
