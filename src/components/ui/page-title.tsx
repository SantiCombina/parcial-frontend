import {cn} from "@/lib/utils";

type Props = {
    title: string;
    className?: string;
};

export function PageTitle({title, className}: Props) {
    return <h1 className={cn("text-3xl font-semibold", className)}>{title}</h1>;
}
