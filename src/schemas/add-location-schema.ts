import {z} from "zod";

export const addLocationSchema = z.object({
    nombre: z.string({message: "El nombre es requerido"}).min(1, "El nombre es requerido"),
    idProvincia: z.number().int().min(1, "La provincia es requerida"),
});

export type AddLocationFormValues = z.infer<typeof addLocationSchema>;
