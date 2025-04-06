import { useQuery } from "@tanstack/react-query";
import ConsumptionChart from "./components/ConsumptionChart";
import styled from "styled-components";
import CompensationChart from "./components/CompensationChart";
import SummaryCard from "./components/SummaryCard";
import { useState } from 'react';
import { MonthEnum, MonthEnumTranslation } from "../../entities/Invoice";
import { useParams } from "react-router-dom";
import { InvoiceService } from "../../services/invoices/InvoiceService";


const Container = styled.div`
  padding: 2rem;
`;

const CardsWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  align-items: center;
`;

const FilterLabel = styled.label`
  font-weight: 500;
  margin-right: 0.5rem;
`;

const FilterSelect = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #fff;
  min-width: 120px;
`;
  
const months = [
  { value: MonthEnum.ALL, label: MonthEnumTranslation[MonthEnum.ALL] },
  { value: MonthEnum.JAN, label: MonthEnumTranslation[MonthEnum.JAN] },
  { value: MonthEnum.FEB, label: MonthEnumTranslation[MonthEnum.FEB] },
  { value: MonthEnum.MAR, label: MonthEnumTranslation[MonthEnum.MAR] },
  { value: MonthEnum.APR, label: MonthEnumTranslation[MonthEnum.APR] },
  { value: MonthEnum.MAY, label: MonthEnumTranslation[MonthEnum.MAY] },
  { value: MonthEnum.JUN, label: MonthEnumTranslation[MonthEnum.JUN] },
  { value: MonthEnum.JUL, label: MonthEnumTranslation[MonthEnum.JUL] },
  { value: MonthEnum.AUG, label: MonthEnumTranslation[MonthEnum.AUG] },
  { value: MonthEnum.SEP, label: MonthEnumTranslation[MonthEnum.SEP] },
  { value: MonthEnum.OCT, label: MonthEnumTranslation[MonthEnum.OCT] },
  { value: MonthEnum.NOV, label: MonthEnumTranslation[MonthEnum.NOV] },
  { value: MonthEnum.DEC, label: MonthEnumTranslation[MonthEnum.DEC] },
];

export default function Dashboard() {
  const { customerId } = useParams();
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => (currentYear - i).toString());


  const [filters, setFilters] = useState({
    year: currentYear.toString(),
    month: MonthEnum.ALL,
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const getRequest = (filter) =>{
    const month = filter.month === MonthEnum.ALL ? null : filter.month;

    if (!customerId) {
      throw new Error("Customer ID is required");
    }

    return {
      year: filter.year,
      month: month,
      customerId: Number(customerId)
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ["user-dashboard", filters],
    queryFn: () => InvoiceService.fetchDashboard(getRequest(filters)),
  });

  const { data: chartsData, isLoading: chartsLoading } = useQuery({
    queryKey: ["invoice-charts", filters.year],
    queryFn: () => {
      if (!customerId) {
        throw new Error("Customer ID is required");
      }

      return InvoiceService.monthlyData(filters.year, Number(customerId))
    },
    enabled: !!filters.year,
  })

  if (isLoading || chartsLoading) return <p>Carregando dashboard...</p>;

  return (
    <Container>
      <h1>Dashboard</h1>

      <FilterContainer>
        <div>
          <FilterLabel htmlFor="yearFilter">Ano:</FilterLabel>
          <FilterSelect
            id="yearFilter"
            value={filters.year}
            onChange={(e) => handleFilterChange("year", e.target.value)}
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </FilterSelect>
        </div>

        <div>
          <FilterLabel htmlFor="monthFilter">Mês:</FilterLabel>
          <FilterSelect
            id="monthFilter"
            value={filters.month}
            onChange={(e) => handleFilterChange("month", e.target.value)}
          >
            {months.map(month => (
              <option key={month.value} value={month.value}>{month.label}</option>
            ))}
          </FilterSelect>
        </div>
      </FilterContainer>

      <CardsWrapper>
      <SummaryCard
        title="Energia Total Consumida"
        value={`${data.totalEnergy} kWh`}
      />
      <SummaryCard
        title="Valor Total"
        value={`R$ ${data.totalValue.toFixed(2)}`}
      />
      <SummaryCard
        title="Custo Médio por kWh"
        value={`R$ ${data.averageCostPerKWh.toFixed(2)}`}
      />
      <SummaryCard
        title="Faturas Encontradas"
        value={data.invoiceCount}
      />
      <SummaryCard
        title="Valor Compensado"
        value={`R$ ${data.compensatedValue.toFixed(2)}`}
      />
    </CardsWrapper>
    
    <ConsumptionChart data={chartsData.consumption} />
    <CompensationChart data={chartsData.compensation} />
    </Container>
  );
}