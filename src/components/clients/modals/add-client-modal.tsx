import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useForm} from "react-hook-form";

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
import {FormInput} from "@/components/ui/form-input";
import {AddClientFormValues, addClientSchema} from "@/schemas/add-client-schema";

interface Props {
    refetch: () => void;
}

export function AddClientModal({refetch}: Props) {
    const [modalOpen, setModalOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<AddClientFormValues>({
        resolver: zodResolver(addClientSchema),
        defaultValues: {
            nombre: "",
            domicilio: "",
            idLocalidad: 0,
            idPromotor: 0,
            saldo: 0,
        },
    });

    const onSubmit = async (values: AddClientFormValues) => {
        const response = await fetch("http://localhost:3000/api/clientes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        if (response.ok) {
            refetch();
            reset();
            setModalOpen(false);
        }
    };

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Añadir cliente</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when youre done.
                    </DialogDescription>
                </DialogHeader>
                <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
                    <FormInput
                        autoFocus
                        error={errors.nombre?.message}
                        label="Nombre"
                        name="nombre"
                        placeholder="Ingrese nombre"
                        register={register}
                        type="text"
                    />
                    <FormInput
                        error={errors.domicilio?.message}
                        label="Domicilio"
                        name="domicilio"
                        placeholder="Ingrese domicilio"
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
                        <Button type="submit">Crear</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
