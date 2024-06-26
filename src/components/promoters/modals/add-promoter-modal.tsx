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
import {AddPromoterFormValues, addPromoterSchema} from "@/schemas/add-promoter-schema";

interface Props {
    refetch: () => void;
}

export function AddPromoterModal({refetch}: Props) {
    const [modalOpen, setModalOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<AddPromoterFormValues>({
        resolver: zodResolver(addPromoterSchema),
        defaultValues: {
            nombre: "",
        },
    });

    const onSubmit = async (values: AddPromoterFormValues) => {
        const response = await fetch("http://localhost:3000/api/promotores", {
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
                <Button variant="outline">Añadir promotor</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Añadir promotor</DialogTitle>
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
