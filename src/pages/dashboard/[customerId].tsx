import { useParams } from "react-router-dom";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";


import { Container } from "./dashboard.styles";
import { MonthEnum } from "../../entities/Invoice";
import { InvoiceService } from "../../services/invoices/InvoiceService";
import { Filters } from "./components/Filter";
import { SummaryCards } from "./components/SummaryCard";
import { Charts } from "./components/Charts";
import { AllYears } from "./components/dashboard.types";

export interface Filter {
  year: string | AllYears;
  month: MonthEnum;
}

export default function Dashboard() {
  const { customerId } = useParams();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());

  const [filters, setFilters] = useState<Filter>({
    year: AllYears.ALL,
    month: MonthEnum.ALL,
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const getRequest = () => {
    const month = filters.month === MonthEnum.ALL ? undefined : filters.month;
    const year = filters.year === AllYears.ALL ? undefined : filters.year;

    if (!customerId) throw new Error("Customer ID is required");

    return {
      year,
      month,
      customerId: Number(customerId),
    };
  };

  const { data, isLoading } = useQuery({
    queryKey: ["user-dashboard", filters],
    queryFn: () => InvoiceService.fetchDashboard(getRequest()),
  });

  const { data: chartsData, isLoading: chartsLoading } = useQuery({
    queryKey: ["invoice-charts", filters.year ],
    queryFn: () => {
      if (!customerId) throw new Error("Customer ID is required");

      const year = filters.year.match('all') ? undefined : filters.year;

      return InvoiceService.monthlyData(Number(customerId), year);
    },
    enabled: !!filters.year,
  });

  if (isLoading || chartsLoading) return <p>Carregando dashboard...</p>;
  return (
    <Container>
      <h1>Dashboard</h1>

      <Filters
        years={years}
        filters={filters}
        onChange={handleFilterChange}
      />

      <SummaryCards data={data} />
      <Charts data={chartsData} />
    </Container>
  );
}
