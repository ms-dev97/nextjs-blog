import { ReactNode } from "react";

export default function ContentWrapper({children}: Readonly<{children: ReactNode}>) {
    return (
        <div className="py-5 px-15">
            {children}
        </div>
    );
}