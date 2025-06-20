'use client';

import { deleteCategory } from "@/lib/categories";

export default function DeleteBtn({ id }: { id: number }) {
    return (
        <button className="text-red-500 hover:text-red-700 font-bold cursor-pointer" onClick={() => deleteCategory(id)}>
            Delete
        </button>
    );
}