import axios from "axios";
import Customer from "../../entities/customer";
import { FetchCustomersRequest, Page } from "./customers-service.types";

export const CustomerService = {
  fetchCustomers: async (request: FetchCustomersRequest) => {
    const response = await axios.get<{ data: Page<Customer> }>(`http://localhost:3000/customers`, {
      params: request
    });
    
    return response.data;
  }
  
}