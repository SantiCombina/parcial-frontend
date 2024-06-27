import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
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
import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface Props {
    refetch: () => void;
}

export function AddLocationModal({refetch}: Props) {
    const [modalOpen, setModalOpen] = useState(false);
    const [provincias, setProvincias] = useState<Provincia[]>([]);

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        setValue,
        clearErrors,
    } = useForm<AddLocationFormValues>({
        resolver: zodResolver(addClientSchema),
        defaultValues: {
            nombre: "",
        },
    });

    const getProvincias = async () => {
        const provinciaResponse = await fetch("http://localhost:3000/api/provincias");
        const provinciaData = await provinciaResponse.json();

        setProvincias(provinciaData);
    };

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

    useEffect(() => {
        getProvincias();
    }, []);

    return (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
                <Button className="text-white bg-blue-400 hover:bg-blue-300 hover:text-white w-36" variant="outline">
                    Añadir localidad
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Crear localidad</DialogTitle>
                    <DialogDescription>Complete el formulario para crear una nueva localidad.</DialogDescription>
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
                    <div className="flex flex-col gap-1">
                        <Label className="text-start">Provincia</Label>
                        <Select
                            onValueChange={(value) => {
                                clearErrors("idProvincia");
                                setValue("idProvincia", Number(value));
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccione provincia" />
                            </SelectTrigger>
                            <SelectContent>
                                {provincias.map((provincia) => (
                                    <SelectItem key={provincia.id} value={String(provincia.id)}>
                                        {provincia.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.idProvincia && <h3 className="text-sm text-red-500">{errors.idProvincia.message}</h3>}
                    </div>
                    <DialogFooter>
                        <Button type="submit">Crear</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
