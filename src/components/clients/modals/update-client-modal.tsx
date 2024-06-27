import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {toast} from "sonner";
import {Pencil} from "lucide-react";

import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {AddClientFormValues, addClientSchema} from "@/schemas/add-client-schema";
import {FormInput} from "@/components/ui/form-input";

interface Props {
    refetch: () => void;
    cliente: Cliente;
}

export function UpdateClientModal({refetch, cliente}: Props) {
    const [modalOpen, setModalOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<AddClientFormValues>({
        resolver: zodResolver(addClientSchema),
        defaultValues: {
            nombre: cliente.nombre,
            domicilio: cliente.domicilio,
            idLocalidad: cliente.idLocalidad,
            idPromotor: cliente.idPromotor,
            saldo: cliente.saldo,
        },
    });

    const onSubmit = async (values: AddClientFormValues) => {
        try {
            await fetch(`http://localhost:3000/api/cliente/${cliente.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            refetch();
            setModalOpen(false);
            toast.success("Cliente actualizado correctamente");
        } catch (error: any) {
            toast.error(error);
        }
    };

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
                <Button size={"icon"} variant="outline">
                    <Pencil width={20} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar cliente</DialogTitle>
                    <DialogDescription>Editar los datos del cliente</DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
                    <FormInput
                        autoFocus
                        error={errors.nombre?.message}
                        label="Nombre"
                        name="nombre"
                        register={register}
                        type="text"
                    />
                    <FormInput
                        error={errors.domicilio?.message}
                        label="Domicilio"
                        name="domicilio"
                        register={register}
                        type="text"
                    />
                    <FormInput
                        error={errors.idLocalidad?.message}
                        label="Localidad"
                        name="idLocalidad"
                        register={register}
                        type="number"
                    />
                    <FormInput
                        error={errors.idPromotor?.message}
                        label="Promotor"
                        name="idPromotor"
                        register={register}
                        type="number"
                    />
                    <FormInput
                        error={errors.saldo?.message}
                        label="Saldo"
                        name="saldo"
                        register={register}
                        type="number"
                    />
                    <DialogFooter>
                        <Button type="submit">Guardar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
