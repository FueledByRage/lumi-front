import axios from "axios";

export const InvoiceService = {
  uploadInvoice: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post("http://localhost:3000/invoices/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
};
