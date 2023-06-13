import { Navbar, Footer } from "../components";
import ProductCRUD from "../components/ProductCRUD";

function AdminPanel() {
    return (
        <>
            <Navbar />
            <ProductCRUD/>
            <Footer />
        </>
    )
}

export default AdminPanel