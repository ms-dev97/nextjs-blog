import { Copyright } from "lucide-react";

export default function Footer() {
    return (
        <footer className="py-2 flex justify-center items-center gap-1.5 border-t border-gray-300 mt-15 text-sm font-bold">
            All rights reserved <Copyright size={18} />
        </footer>
    );
}