import { Navbar, Footer } from "../components";
import ProductCRUD from "../components/ProductCRUD";
import Panel from "../components/Panel";

function AdminPanel() {
    return (
        <>
            <Navbar />
            {/*<Panel/>*/}
            <ProductCRUD/>
            <Footer />
        </>
    )
}

export default AdminPanel