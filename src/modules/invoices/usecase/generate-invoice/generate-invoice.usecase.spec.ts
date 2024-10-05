import Id from "../../../@shared/domain/value-object/id.value-object"
import Invoice from "../../domain/invoice"
import Address from "../../../@shared/domain/value-object/address"
import InvoiceItems from "../../domain/invoice.items"
import GenerateInvoiceUseCase from "./generate-invoice.usecase"


const invoice = new Invoice({
  id: new Id("1"),
  name: "Invoice 1",
  document: "010101",
  address: new Address (
    "Rua A",
    "1",
    "",
    "Cidade",
    "AA",
    "12345"
  ),
  items: [
    new InvoiceItems({
      id: new Id("01"),
      name: "caneta",
      price: 1.5,
      createdAt: new Date(),
      updatedAt: new Date(),
    }), 
    new InvoiceItems({
      id: new Id("02"),
      name: "papel",
      price: 2.7,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ]
})

const MockRepository = () => {
  return {
    find: jest.fn(),
    create: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("Generate invoice usecase test", () => {

  it("should generate a invoice", async () => {
    const input = {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode:  invoice.address.zipCode,
      items: invoice.items.map(it => {
        return {
          id: it.id.id,
          name: it.name,
          price: it.price,
          createdAt: it.createdAt,
          updatedAt: it.updatedAt
        }
      }),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt
    }

    const repository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(repository);
    const result = await usecase.execute(input);

    expect(result.id).toBeDefined();
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.street).toBe(invoice.address.street);
    expect(result.number).toBe(invoice.address.number);
    expect(result.complement).toBe(invoice.address.complement);
    expect(result.city).toBe(invoice.address.city);
    expect(result.state).toBe(invoice.address.state);
    expect(result.zipCode).toBe(invoice.address.zipCode);
    expect(result.items[0].id).toBeDefined();
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.items[0].price).toBe(invoice.items[0].price);
    expect(result.items[1].id).toBeDefined();
    expect(result.items[1].name).toBe(invoice.items[1].name);
    expect(result.items[1].price).toBe(invoice.items[1].price);
    expect(result.total).toBe(invoice.items.reduce((total, it) => total + it.price, 0))
  })

})