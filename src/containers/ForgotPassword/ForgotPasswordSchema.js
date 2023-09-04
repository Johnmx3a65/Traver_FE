import { z } from 'zod';

export const EmailSchema = z.object({
  email: z
    .string()
    .min(2, 'Минималната дължина е 2 символа')
    .email('Невалиден формат')
    .max(255, 'Максималната дължина е 255 символа'),
});

export const PasswordsSchema = z
  .object({
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

export const EmailDefaultValue = {
  email: '',
};

export const PasswordsDefaultValues = {
  password: '',
  confirmPassword: '',
};
