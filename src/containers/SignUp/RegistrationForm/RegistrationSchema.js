import { z } from 'zod';

export const RegistrationSchema = z
  .object({
    firstName: z.string().min(2, 'Минималната дължина е 2 символа').max(255, 'Максималната дължина е 255 символа'),
    lastName: z.string().min(2, 'Минималната дължина е 2 символа').max(255, 'Максималната дължина е 255 символа'),
    email: z
      .string()
      .email('Невалиден формат')
      .min(2, 'Минималната дължина е 2 символа')
      .max(255, 'Максималната дължина е 255 символа'),
    password: z.string().min(6, 'Минималната дължина е 6 символа').max(255, 'Максималната дължина е 255 символа'),
    confirmPassword: z.string().min(6, 'Минималната дължина е 6 символа').max(255, 'Максималната дължина е 255 символа'),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Паролите не съвпадат',
        path: ['confirmPassword'],
      });
    }
  });

export const RegistrationDefaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
