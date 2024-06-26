import {UseFormRegister} from "react-hook-form";

import {Input} from "./input";
import {Label} from "./label";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    register: UseFormRegister<any>;
    error?: string;
    label: string;
    name: string;
}

export function FormInput({register, label, name, error, ...props}: Props) {
    return (
        <div className="flex flex-col gap-1">
            <Label className="text-start" htmlFor={name}>
                {label}
            </Label>
            <Input
                {...props}
                className="col-span-3"
                id={name}
                {...register(name, {valueAsNumber: props.type === "number" ? true : false})}
            />
            {error && <h3 className="text-sm text-red-500">{error}</h3>}
        </div>
    );
}
