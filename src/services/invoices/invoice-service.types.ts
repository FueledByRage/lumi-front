import { MonthEnum } from "../../entities/Invoice";

export interface FetchDashboardRequest{
  customerId: number;
  month?: MonthEnum;
  year?: string;
}