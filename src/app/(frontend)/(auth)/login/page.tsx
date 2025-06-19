import { login } from "@/lib/auth";

export default function LoginPage() {
    return (
        <div className="max-w-lg mx-auto my-16 border border-gray-300 rounded-md px-10 py-5">
            <h1>Login</h1>
            
            <form action={login}>
                <div className="mb-3">
                    <label htmlFor="email" className="select-none font-medium leading-none text-sm">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Your email" required className="block border border-gray-400 w-full px-3 py-1 h-9 mt-2 rounded-md" />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="select-none font-medium leading-none text-sm">Password:</label>
                    <input type="password" id="password" name="password" placeholder="Password" required className="block border border-gray-400 w-full px-3 py-1 h-9 mt-2 rounded-md" />
                </div>
                <button type="submit" className="cursor-pointer bg-black text-white px-8 py-2 rounded-md">
                    Login
                </button>
            </form>
        </div>
    );
}