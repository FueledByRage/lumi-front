import axios from "axios";
import Customer from "../../entities/customer";
import { FetchCustomersRequest, Page } from "./CustomersService.types";

const BASE_URL = import.meta.env.VITE_API_URL;

export const CustomerService = {
  fetchCustomers: async (request: FetchCustomersRequest) => {
    const response = await axios.get<Page<Customer>>(`${BASE_URL}/customers`, {
      params: request
    });

    return response.data;
  },
}