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
import {addClientSchema} from "@/schemas/add-client-schema";
import {AddPromoterFormValues} from "@/schemas/add-promoter-schema";

interface Props {
    refetch: () => void;
    promotor: Promotor;
}

export function UpdatePromoterModal({refetch, promotor}: Props) {
    const [modalOpen, setModalOpen] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<AddPromoterFormValues>({
        resolver: zodResolver(addClientSchema),
        defaultValues: {
            nombre: promotor.nombre,
        },
    });

    const onSubmit = async (values: AddPromoterFormValues) => {
        try {
            await fetch(`http://localhost:3000/api/promotor/${promotor.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            refetch();
            setModalOpen(false);
            toast.success("Promotor actualizado correctamente");
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
                    <DialogFooter>
                        <Button type="submit">Guardar</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
