import {z} from "zod";

export const addClientSchema = z.object({
    nombre: z.string({message: "El nombre es requerido"}).min(1, "El nombre es requerido"),
    domicilio: z.string({message: "El domicilio es requerido"}).min(1, "El domicilio es requerido"),
    idLocalidad: z.number().int().min(1, "La localidad es requerida"),
    idPromotor: z.number().int().min(1, "El promotor es requerido"),
    saldo: z.number().int().min(1, "El saldo es requerido"),
});

export type AddClientFormValues = z.infer<typeof addClientSchema>;
