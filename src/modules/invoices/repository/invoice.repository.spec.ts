import { Sequelize } from "sequelize-typescript"
import Id from "../../@shared/domain/value-object/id.value-object"
import Address from "../../@shared/domain/value-object/address"
import InvoiceModel from "./invoice.model"
import InvoiceItemModel from "./invoice.model.item"
import InvoiceRepository from "./invoice.repository"
import InvoiceItem from "../domain/invoice.items"
import Invoice from "../domain/invoice"

describe("invoice Repository test", () => {

  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([InvoiceModel, InvoiceItemModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it("should create a invoice", async () => {

    const invoice = new Invoice({
      id: new Id("1"),
      name: "Invoice 1",
      document: "1234-5678",
      address: new Address(
        "Rua 123",
        "99",
        "Casa Verde",
        "Criciúma",
        "SC",
        "88888-888"
      ),
      items: [
        new InvoiceItem({
          id: new Id("01"),
          name: "Caneta",
          price: 1.5,
        }),
        new InvoiceItem({
          id: new Id("02"),
          name: "Papel",
          price: 3.7,
        }),
      ]
    })

    const repository = new InvoiceRepository()
    await repository.create(invoice)

    const invoiceDb = await InvoiceModel.findOne({ where: { id: "1" }, include: ["items"] })

    expect(invoiceDb).toBeDefined()
    expect(invoiceDb.id).toEqual(invoice.id.id)
    expect(invoiceDb.name).toEqual(invoice.name)
    expect(invoiceDb.document).toEqual(invoice.document)
    expect(invoiceDb.street).toEqual(invoice.address.street)
    expect(invoiceDb.number).toEqual(invoice.address.number)
    expect(invoiceDb.complement).toEqual(invoice.address.complement)
    expect(invoiceDb.city).toEqual(invoice.address.city)
    expect(invoiceDb.state).toEqual(invoice.address.state)
    expect(invoiceDb.zipCode).toEqual(invoice.address.zipCode)
    expect(invoiceDb.createdAt).toStrictEqual(invoice.createdAt)
    expect(invoiceDb.updatedAt).toStrictEqual(invoice.updatedAt)
    expect(invoiceDb.total).toStrictEqual(invoice.total())
    expect(invoiceDb.items.length).toBe(2);
    expect(invoiceDb.items[0].id).toEqual(invoice.items[0].id.id);
    expect(invoiceDb.items[0].name).toEqual(invoice.items[0].name);
    expect(invoiceDb.items[0].price).toEqual(invoice.items[0].price);
    expect(invoiceDb.items[0].createdAt).toStrictEqual(invoice.items[0].createdAt)
    expect(invoiceDb.items[0].updatedAt).toStrictEqual(invoice.items[0].updatedAt)
    expect(invoiceDb.items[1].id).toEqual(invoice.items[1].id.id);
    expect(invoiceDb.items[1].name).toEqual(invoice.items[1].name);
    expect(invoiceDb.items[1].price).toEqual(invoice.items[1].price);
    expect(invoiceDb.items[1].createdAt).toStrictEqual(invoice.items[1].createdAt)
    expect(invoiceDb.items[1].updatedAt).toStrictEqual(invoice.items[1].updatedAt)
    
  })

  /*it("should find a invoice", async () => {

    const invoice = await invoiceModel.create({
      id: '1',
      name: 'Lucian',
      email: 'lucian@123.com',
      document: "1234-5678",
      street: "Rua 123",
      number: "99",
      complement: "Casa Verde",
      city: "Criciúma",
      state: "SC",
      zipcode: "88888-888",      
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const repository = new invoiceRepository()
    const result = await repository.find(invoice.id)

    expect(result.id.id).toEqual(invoice.id)
    expect(result.name).toEqual(invoice.name)
    expect(result.email).toEqual(invoice.email)
    expect(result.address.street).toEqual(invoice.street)
    expect(result.address.number).toEqual(invoice.number)
    expect(result.address.complement).toEqual(invoice.complement)
    expect(result.address.city).toEqual(invoice.city)
    expect(result.address.state).toEqual(invoice.state)
    expect(result.address.zipCode).toEqual(invoice.zipcode)
    expect(result.createdAt).toStrictEqual(invoice.createdAt)
    expect(result.updatedAt).toStrictEqual(invoice.updatedAt)
  })*/
})