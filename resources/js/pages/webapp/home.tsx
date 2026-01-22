import Button from "@/components/button";
import HintOnHover from "@/components/hint-on-hover";
import Popover from "@/components/popover";
import Popup from "@/components/popup";
import Select from "@/components/select";
import { SortableTable } from "@/components/sortable-table";
import Layout from "@/layouts/webapp/layout";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

type BusinessData = {
    website: string;
    email: string;
    phone: string;
    address: string;
    map: string;
}

export default function Home() {
    const [open, setOpen] = useState(false);
    const { business } = usePage<{ business: BusinessData }>().props;

    const handleConfirm = () => {
        alert('ação confirmada');
    };

    const customers = [
        {
            id: 1,
            name: "John Doe Long Name",
            email: "2A2Gw@example.com",
            phone: "457",
            address: "123 Main St, Anytown, USA",
            city: "Anytown",
            state: "CA",
            zip_code: "12345",
            country: "USA",
            birthday: "1990-01-01"
        },
        {
            id: 2,
            name: "Jane Doe",
            email: "2A2Gw@example.com",
            phone: "123",
            address: "123 Main St, Anytown, USA",
            city: "Anytown",
            state: "CA",
            zip_code: "12345",
            country: "USA",
            birthday: "1990-01-11"
        },
        {
            id: 3,
            name: "Lucas Doe",
            email: "2A2Gw@example.com",
            phone: "567",
            address: "123 Main St, Anytown, USA",
            city: "Anytown",
            state: "CA",
            zip_code: "12345",
            country: "USA",
            birthday: "1990-01-21"
        }
    ]

    return (
        <Layout title="Test Page">
            <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">

                <div className="flex flex-wrap items-end gap-2 p-4 rounded bg-foreground shadow">
                    <div>
                        <iframe
                            src={business.map}
                            width="300"
                            height="250"
                            loading="lazy"
                            className="mt-4"
                        />
                    </div>
                    <div>
                        <div>
                            <h1 className="text-2xl font-semibold">My Business</h1>
                            <p className="text-xs tracking-wider font-semibold text-primary/50">Data from server via inertia response</p>
                        </div>

                        <div className="mt-4">
                            <p>Website: <a href={business.website}>{business.website}</a></p>
                            <p>Email: {business.email}</p>
                            <p>Phone: {business.phone}</p>
                            <p>Address: {business.address}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button>
                        Button
                    </Button>
                    <Button variant="secondary">
                        Button
                    </Button>
                    <Button variant="destructive">
                        Button
                    </Button>
                    <Button disabled>
                        Button
                    </Button>
                    <Button className="bg-green-500">
                        Button
                    </Button>
                </div>

                <div>
                    <SortableTable data={customers} columns={[
                        { key: 'name', type: 'string' },
                        { key: 'email', type: 'string' },
                        { key: 'phone', type: 'number' },
                        { key: 'address', type: 'string' },
                        { key: 'birthday', type: 'date' },
                        { key: 'country', type: 'string' },
                        { key: 'state', type: 'string' },
                        { key: 'city', type: 'string' },
                        { key: 'zip_code', type: 'string' },
                        { key: 'id', type: 'number' },
                    ]} />
                </div>

                <div>
                    <Button onClick={() => setOpen(true)}>
                        Abrir Popup
                    </Button>

                    <Popup
                        open={open}
                        onClose={() => setOpen(false)}
                        title="The Popup"
                        action={handleConfirm}
                    >
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam provident laborum ea magnam nobis consequuntur?
                    </Popup>
                </div>

                <div>
                    <Popover
                        trigger={
                            <p className="underline cursor-pointer text-brand">
                                Abrir Popover
                            </p>
                        }
                    >
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, libero omnis corporis unde doloremque laudantium velit. Maiores repudiandae aliquam deleniti unde nobis hic. Doloremque, facilis pariatur sequi aliquid expedita recusandae asperiores dolorem, vero consectetur deserunt autem eveniet obcaecati tenetur qui nesciunt a, reprehenderit et cupiditate. Saepe eum beatae doloremque ea, quam voluptatum incidunt illum reiciendis esse in, corporis soluta, repudiandae repellat? Amet fugit incidunt quo quisquam odit corporis corrupti accusamus repudiandae, tempore cupiditate rem, veniam eligendi quam. Magni aperiam sequi harum ex odio, doloribus optio praesentium nisi nostrum quam ea, ipsum dolorum pariatur, atque deleniti incidunt possimus dolorem explicabo numquam.
                    </Popover>
                </div>

                <div className="flex justify-between items-center">
                    <HintOnHover
                        directionX="left"
                        directionY="bottom"
                        trigger={<p className="underline cursor-pointer text-brand"> Hint on hover </p>}
                    >
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo dolorum ad pariatur esse fugiat ut temporibus nisi hic alias inventore!
                    </HintOnHover>

                    <HintOnHover
                        directionX="right"
                        directionY="top"
                        trigger={
                            <p className="underline cursor-pointer text-brand">
                                Hint on hover
                            </p>
                        }
                    >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, alias?
                    </HintOnHover>
                </div>

                <div className="sm:w-xs">
                    <Select label="Select an option" name="select" options={["Option 1", "Option 2", "Option 3"]} />
                </div>
            </div>
        </Layout >
    );
}