import Button from "@/components/button";
import { SortableTable } from "@/components/sortable-table";
import Layout from "@/layouts/webapp/layout";

export default function Home() {
    const customers = [
        {
            id: 1,
            name: "John Doe",
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
            <div className="lg:p-12 space-y-4">
                <div className="space-x-2">
                    <div className="p-4 space-x-2 border">
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
                </div>

                <div className="ml-4">
                    <SortableTable data={customers} columns={[
                        { key: 'name', type: 'string' },
                        { key: 'email', type: 'string' },
                        { key: 'phone', type: 'number' },
                        { key: 'address', type: 'string' },
                        { key: 'birthday', type: 'date' },
                    ]} />
                </div>

                <div>
                    popup
                </div>

                <div>
                    dialog
                </div>

                <div>
                    dropdown
                </div>

                <div>
                    confirmation popup
                </div>
            </div>
        </Layout>
    );
}