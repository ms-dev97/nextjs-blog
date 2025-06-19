import { signup } from "@/lib/auth";

export default function SignUpPage() {
    return (
        <div className="max-w-lg mx-auto my-16 border border-gray-300 rounded-md px-10 py-5">
            <h1>Sign Up</h1>
            
            <form action={signup}>
                <div className="mb-3">
                    <label htmlFor="name" className="select-none font-medium leading-none text-sm">Name</label>
                    <input type="text" id="name" name="name" placeholder="name" className="block border border-gray-400 w-full px-3 py-1 h-9 mt-2 rounded-md" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="select-none font-medium leading-none text-sm">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Your email" required className="block border border-gray-400 w-full px-3 py-1 h-9 mt-2 rounded-md" />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="select-none font-medium leading-none text-sm">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Password" required className="block border border-gray-400 w-full px-3 py-1 h-9 mt-2 rounded-md" />
                </div>
                <button type="submit" className="cursor-pointer bg-black text-white px-8 py-2 rounded-md">
                    Sign Up
                </button>
            </form>
        </div>
    );
}