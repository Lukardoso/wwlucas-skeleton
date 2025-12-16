import { Button } from "@headlessui/react";
import { router } from "@inertiajs/react";

export default function Home() {
    const logout = () => {
        router.post("/logout");
    }
    return (
        <div>
            <h1>Home</h1>

            <Button onClick={logout}>Logout</Button>
        </div>
    );
}