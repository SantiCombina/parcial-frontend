import {zodResolver} from "@hookform/resolvers/zod";
import {Pencil} from "lucide-react";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {toast} from "sonner";

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
import {AddLocationFormValues, addLocationSchema} from "@/schemas/add-location-schema";

interface Props {
    refetch: () => void;
    localidad: Localidad;
}

export function UpdateLocationModal({refetch, localidad}: Props) {
    const [modalOpen, setModalOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<AddLocationFormValues>({
        resolver: zodResolver(addLocationSchema),
        defaultValues: {
            nombre: localidad.nombre,
        },
    });

    const onSubmit = async (values: AddLocationFormValues) => {
        try {
            await fetch(`http://localhost:3000/api/localidad/${localidad.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            refetch();
            setModalOpen(false);
            toast.success("Localidad actualizada correctamente");
        } catch (error: any) {
            toast.error(error);
        }
    };

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Pencil width={18} />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Editar localidad</DialogTitle>
                    <DialogDescription>Editar los datos de la localidad</DialogDescription>
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
                    <DialogFooter>
                        <Button type="submit">Guardar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
