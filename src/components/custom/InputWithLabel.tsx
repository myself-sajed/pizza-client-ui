import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEventHandler } from "react";
import { Textarea } from "../ui/textarea";


type PropType = {
    label: string;
    type: string;
    onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export function InputWithLabel({ label, onChange, type }: PropType) {
    return (
        <div className="grid w-full items-center gap-1.5">
            <Label htmlFor={label}>Email</Label>
            {type === "textarea" ? <Textarea onChange={onChange} id={label} placeholder={label} />
                : <Input onChange={onChange} type={type} id={label} placeholder={label} />}
        </div>
    )
}
