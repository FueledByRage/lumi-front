import SummaryCard from "./SummaryCard";
import { CardsWrapper } from "./summaryCard.styles";

interface SummaryCardsProps {
  data: {
    totalEnergy: number;
    totalValue: number;
    averageCostPerKWh: number;
    invoiceCount: number;
    compensatedValue: number;
  };
}

export function SummaryCards({ data }: SummaryCardsProps) {
  return (
    <CardsWrapper>
      <SummaryCard title="Energia Total Consumida" value={`${data.totalEnergy} kWh`} />
      <SummaryCard title="Valor Total" value={`R$ ${data.totalValue.toFixed(2)}`} />
      <SummaryCard title="Custo Médio por kWh" value={`R$ ${data.averageCostPerKWh.toFixed(2)}`} />
      <SummaryCard title="Faturas Encontradas" value={data.invoiceCount} />
      <SummaryCard title="Valor Compensado" value={`R$ ${data.compensatedValue.toFixed(2)}`} />
    </CardsWrapper>
  );
}
