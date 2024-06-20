import {Link, Route, Routes} from "react-router-dom";

import {Layout} from "./components/layout/layout";
import {Clients} from "./views/clients";

function App() {
    return (
        <>
            <Routes>
                <Route element={<Layout />}>
                    <Route element={<Link to="/clientes">Clientes</Link>} path="/" />
                    <Route element={<Clients />} path="/clientes" />
                </Route>
            </Routes>
        </>
    );
}

export default App;
