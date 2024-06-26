import {Route, Routes} from "react-router-dom";
import {Toaster} from "sonner";

import {Layout} from "./components/layout/layout";
import {Clients} from "./views/clients";
import {Promoters} from "./views/promoters";
import {Locations} from "./views/locations";
import {Dashboard} from "./views/dashboard";

function App() {
    return (
        <>
            <Routes>
                <Route element={<Layout />}>
                    <Route element={<Dashboard />} path="/" />
                    <Route element={<Clients />} path="/clientes" />
                    <Route element={<Promoters />} path="/promotores" />
                    <Route element={<Locations />} path="/localidades" />
                </Route>
            </Routes>
            <Toaster richColors />
        </>
    );
}

export default App;
