import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice";
import InvoiceItem from "../domain/invoice.items";
import InvoiceGateway from "../gateway/invoice.gatewat";
import InvoiceModel from "./invoice.model";
import InvoiceItemModel from "./invoice.model.item";

export default class InvoiceRepository implements InvoiceGateway {
  
  async create(entity: Invoice): Promise<void> {
    await InvoiceModel.create(
      {
        id: entity.id.id,
        name: entity.name,
        document: entity.document,
        street: entity.address.street,
        number: entity.address.number,
        complement: entity.address.complement,
        city: entity.address.city,
        state: entity.address.state,
        zipCode: entity.address.zipCode,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id.id,
          name: item.name,
          price: item.price,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt
        })),
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt
      },
      {
        include: [{ model: InvoiceItemModel }],
      }
    );
  }

  async find(id: any): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({ where: { id }, include: [{ model: InvoiceItemModel }]});

    if (!invoice) {
      throw new Error("Invoice not found")
    }

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: new Address(
        invoice.street,
        invoice.number,
        invoice.complement,
        invoice.city,
        invoice.state,
        invoice.zipCode,
      ),
      items: invoice.items.map((item) => {
        return new InvoiceItem({
                      id: new Id(item.id),
                      name: item.name,
                      price: item.price,
                      createdAt: item.createdAt,
                      updatedAt: item.updatedAt
                    })
      }),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt
    })
  }

}
