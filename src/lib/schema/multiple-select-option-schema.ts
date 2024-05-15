import { z } from 'zod';

export const multipleSelectOptionSchema = z.object({
    label: z.string(),
    value: z.string(),
});

export interface MultipleSelectOption {
    value: string;
    label: string;
    disable?: boolean;
    /** fixed option that can't be removed. */
    fixed?: boolean;
    /** Group the options by providing key. */
    [key: string]: string | boolean | undefined;
}
