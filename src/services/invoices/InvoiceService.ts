import axios from "axios";
import { FetchDashboardRequest } from "./InvoiceService.types";

const BASE_URL = import.meta.env.VITE_API_URL;

export const InvoiceService = {
  uploadInvoice: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${BASE_URL}/invoices/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  fetchDashboard: async (request : FetchDashboardRequest) => {
    const response = await axios.get(`${BASE_URL}/invoices/dashboard-summary`, {
      params: request
    });
    return response.data;
  },

  monthlyData: async (customerId: number, year? : string | null) => {
    const response = await axios.get(`${BASE_URL}/invoices/monthly-data`, {
      params: { year, customerId },
    });
    
    return response.data;
  }
};
