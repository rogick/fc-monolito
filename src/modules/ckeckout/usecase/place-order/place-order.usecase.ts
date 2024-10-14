import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {

  constructor() {}
  
  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    
    return {
      id: "",
      invoiceId: "",
      status: "",
      total: 0,
      products: [{productId: ""}],
    };
  }

}