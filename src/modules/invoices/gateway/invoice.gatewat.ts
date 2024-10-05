import Invoice from "../domain/invoice";

export default interface InvoiceGateway {
  find(id: any): Promise<Invoice>;
  create(invoice: Invoice): Promise<void>;
}