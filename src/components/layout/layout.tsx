import {Outlet} from "react-router-dom";

import Sidebar from "../ui/sidebar";

export function Layout() {
    return (
        <div className="flex w-full min-h-screen">
            <Sidebar />
            <main className="container py-8">
                <Outlet />
            </main>
        </div>
    );
}
