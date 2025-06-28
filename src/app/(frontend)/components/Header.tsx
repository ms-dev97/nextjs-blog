import Link from "next/link";

export default function Header() {
    return (
        <header className="mb-10 py-4 shadow backdrop-blur-2xl sticky top-0 z-50">
            <div className="container mx-auto flex justify-between">
                <Link href="/">Blog</Link>

                <nav>
                    <ul>
                        <li>
                            <Link href="posts">Posts</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}