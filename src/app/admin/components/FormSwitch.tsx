'use client';

import { Switch } from "@/components/ui/switch";
import { useRef, useState } from "react";

export default function FormSwitch({name, id, isSwitchedOn}: {name: string, id: string, isSwitchedOn: boolean}) {
    const [checkboxState, setCheckboxState] = useState<boolean>(isSwitchedOn);

    return (
        <>
            <input type="checkbox" name={name} id={id} className="hidden" checked={checkboxState} onChange={() => setCheckboxState(!checkboxState)} />

            <Switch checked={checkboxState} onCheckedChange={checked => setCheckboxState(checked)} />
        </>
    );
}