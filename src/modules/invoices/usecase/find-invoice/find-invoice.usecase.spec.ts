import Id from "../../../@shared/domain/value-object/id.value-object"
import Invoice from "../../domain/invoice"
import Address from "../../../@shared/domain/value-object/address"
import InvoiceItems from "../../domain/invoice.items"
import FindInvoiceUseCase from "./find-invoice.usecase"


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
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    create: jest.fn(),
  };
};

describe("Find invoice usecase test", () => {

  it("should generate a invoice", async () => {
    const input = {
      id: "1"
    }

    const repository = MockRepository();
    const usecase = new FindInvoiceUseCase(repository);
    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled()
    expect(result.id).toBeDefined();
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address.street).toBe(invoice.address.street);
    expect(result.address.number).toBe(invoice.address.number);
    expect(result.address.complement).toBe(invoice.address.complement);
    expect(result.address.city).toBe(invoice.address.city);
    expect(result.address.state).toBe(invoice.address.state);
    expect(result.address.zipCode).toBe(invoice.address.zipCode);
    expect(result.items[0].id).toBeDefined();
    expect(result.items[0].name).toBe(invoice.items[0].name);
    expect(result.items[0].price).toBe(invoice.items[0].price);
    expect(result.items[1].id).toBeDefined();
    expect(result.items[1].name).toBe(invoice.items[1].name);
    expect(result.items[1].price).toBe(invoice.items[1].price);
    expect(result.total).toBe(invoice.items.reduce((total, it) => total + it.price, 0))
  })

})