'use client';

import { deletePost } from "@/lib/post";

export default function DeleteBtn({ id }: { id: number }) {
    return (
        <button className="text-red-500 hover:text-red-700 font-bold cursor-pointer" onClick={() => deletePost(id)}>
            Delete
        </button>
    );
}