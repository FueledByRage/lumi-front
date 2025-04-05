import Invoice from "./Invoice";

export default interface Customer {
  id: number;
  registrationNumber: string;
  distributor: string;
  name?: string;
  consumer?: string;
  invoices: Invoice[];
}