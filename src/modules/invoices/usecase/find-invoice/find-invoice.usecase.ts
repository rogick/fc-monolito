
import Address from "../../../@shared/domain/value-object/address";
import InvoiceGateway from "../../gateway/invoice.gatewat";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.dto";

export default class FindInvoiceUseCase {

  private _invoiceRepository: InvoiceGateway

  constructor(clientRepository: InvoiceGateway) {
    this._invoiceRepository = clientRepository
  }

  async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {

    const result = await this._invoiceRepository.find(input.id)

    return {
      id: result.id.id,
      name: result.name,
      document: result.document,
      address: new Address(
        result.address.street,
        result.address.number,
        result.address.complement,
        result.address.city,
        result.address.state,
        result.address.zipCode,
      ),
      items: result.items.map(item=> {
        return {
          id: item.id.id,
          name: item.name,
          price: item.price
        }
      }),
      total: result.total(),
      createdAt: result.createdAt
    }
  }
}