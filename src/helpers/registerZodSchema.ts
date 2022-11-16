import { z } from 'zod';

const registerZodSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(8).max(20).regex(/[A-Z]/)
    .regex(/[0-9]/),
}).required();

export default registerZodSchema;
