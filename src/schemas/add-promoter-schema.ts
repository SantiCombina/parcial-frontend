import {z} from "zod";

export const addPromoterSchema = z.object({
    nombre: z.string({message: "El nombre es requerido"}).min(1, "El nombre es requerido"),
});

export type AddPromoterFormValues = z.infer<typeof addPromoterSchema>;
