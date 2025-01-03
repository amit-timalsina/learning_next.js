import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import Form from "@/app/ui/invoices/edit-form";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{ id: string }>}) {
    const params = await props.params;
    const id = params.id;
    const invoice = await fetchInvoiceById(id);
    const customers = await fetchCustomers();

    if (!invoice) {
        notFound();
    }
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'Invoices', href: '/dashboard/invoices' },
                    { label: 'Edit Invoices', href: `/dashboard/invoices/${id}/edit`, active: true }
                ]}
            >
            </Breadcrumbs>
            <Form invoice={invoice} customers={customers} />
        </main>
    )
}