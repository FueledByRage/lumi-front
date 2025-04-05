import Invoice from "../../../../entities/Invoice";
import { InvoiceIcon, MonthIconCell } from "./table.styles";

export interface MonthCellProps {
  invoice?: Invoice;
  onClick: (invoice: Invoice) => void;
}

export default function MonthCell ({ invoice, onClick } : MonthCellProps) {
  const handleClick = () => {
    if (invoice) {
      onClick(invoice);
    }
  };

  return (
    <MonthIconCell>
      <InvoiceIcon
        active={!!invoice}
        role="img"
        aria-label="invoice"
        title={invoice ? `Consumo: ${invoice.electricityConsumptionKWh}kWh, Custo: R$${invoice.electricityCost}` : 'Sem fatura disponível'}
        onClick={handleClick}
      >
        📄
      </InvoiceIcon>
    </MonthIconCell>
  );
}