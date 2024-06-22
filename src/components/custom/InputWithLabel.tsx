import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEventHandler } from "react";
import { Textarea } from "../ui/textarea";


type PropType = {
    label: string;
    type: string;
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    value?: string;
    disabled?: boolean;
}

export function InputWithLabel({ label, onChange, type, value = "", disabled = false }: PropType) {
    return (
        <div className="grid w-full items-center gap-1.5">
            <Label htmlFor={label}>{label}</Label>
            {type === "textarea" ? <Textarea onChange={onChange} value={value} id={label} placeholder={label} disabled={disabled} />
                : <Input onChange={onChange} value={value} type={type} id={label} placeholder={label} disabled={disabled} />}
        </div>
    )
}
