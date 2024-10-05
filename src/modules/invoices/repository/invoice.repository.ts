import Invoice from "../domain/invoice";
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
}
