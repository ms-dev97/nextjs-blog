'use client';

import { Switch } from "@/components/ui/switch";
import { useRef, useState } from "react";

export default function FormSwitch({name, id}: {name: string, id: string}) {
    const [checkboxState, setCheckboxState] = useState<boolean>(false);

    return (
        <>
            <input type="checkbox" name={name} id={id} className="hidden" checked={checkboxState} onChange={() => setCheckboxState(!checkboxState)} />

            <Switch checked={checkboxState} onCheckedChange={checked => setCheckboxState(checked)} />
        </>
    );
}