import {Outlet} from "react-router-dom";

import Sidebar from "../ui/sidebar";

export function Layout() {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="container">
                <Outlet />
            </main>
        </div>
    );
}
