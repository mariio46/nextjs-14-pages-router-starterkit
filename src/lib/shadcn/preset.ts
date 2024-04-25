import { type Config } from 'tailwindcss';
import { shadcnPlugin } from './plugin';

export const shadcnPreset = {
    content: [],
    plugins: [shadcnPlugin],
} satisfies Config;
