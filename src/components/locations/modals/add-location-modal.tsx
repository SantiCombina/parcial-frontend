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
import {addClientSchema} from "@/schemas/add-client-schema";
import {AddLocationFormValues} from "@/schemas/add-location-schema";

interface Props {
    refetch: () => void;
}

export function AddLocationModal({refetch}: Props) {
    const [modalOpen, setModalOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<AddLocationFormValues>({
        resolver: zodResolver(addClientSchema),
        defaultValues: {
            nombre: "",
        },
    });

    const onSubmit = async (values: AddLocationFormValues) => {
        const response = await fetch("http://localhost:3000/api/localidades", {
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
                <Button variant="outline">Añadir localidad</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit localidad</DialogTitle>
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
                    <DialogFooter>
                        <Button type="submit">Crear</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
