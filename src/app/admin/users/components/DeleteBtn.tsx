'use client';

import { deleteUser } from "@/lib/users";

export default function DeleteBtn({ id }: { id: number }) {
    return (
        <button className="text-red-500 hover:text-red-700 font-bold cursor-pointer" onClick={() => deleteUser(id)}>
            Delete
        </button>
    );
}