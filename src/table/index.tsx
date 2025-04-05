import { useEffect, useState } from "react";
import styled from "styled-components";
import Filter from "./components/Filter";
import Pagination from "./components/Pagination";
import { Page } from "../services/customers/customers-service.types";
import Customer from "../entities/customer";
import { CustomerService } from "../services/customers/customers.service";
import Invoice from "../entities/Invoice";

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  font-family: Arial, sans-serif;
  margin: 20px 0;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

const Th = styled.th`
  background-color: #043f23;
  color: white;
  padding: 12px 8px;
  border: 1px solid #043f23;
  text-align: left;
  font-weight: normal;
`;

const Td = styled.td`
  padding: 12px 8px;
  border: 1px solid #e0e0e0;
  word-wrap: break-word;
  text-align: left;
  background-color: #ffffff;
`;

const TrAlternate = styled.tr`
  &:nth-child(even) td {
    background-color: #f5f5f5;
  }
`;

const MonthIconCell = styled.td`
  text-align: center;
  border: 1px solid #e0e0e0;
  background-color: #ffffff;
  padding: 12px 4px;
  width: 40px;
`;

const InvoiceIcon = styled.span<{ active: boolean }>`
  font-size: 18px;
  cursor: ${props => props.active ? 'pointer' : 'default'};
  opacity: ${props => props.active ? 1 : 0.3};
  transition: opacity 0.2s ease;
`;

const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set"];

export default function CustomerTable() {
  const [data, setData] = useState<Page<Customer> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeFilter, setActiveFilter] = useState<string>("distribuidoras");
  const [activeYear, setActiveYear] = useState<string>("2024");
  const pageSize: number = 10;

  useEffect(() => {
    const fetchCustomers = async () => {
      setIsLoading(true);

      const response = await CustomerService.fetchCustomers({page: currentPage, pageSize, year: activeYear});
      
      setData(response.data);
      setIsLoading(false);
    }

    fetchCustomers();
  }, [currentPage, activeYear]);

  const hasInvoiceForMonth = (invoices: Invoice[], month: string, year: string): Invoice | undefined => {
    return invoices.find(invoice => 
      invoice.referenceMonth === month.toUpperCase() && 
      invoice.referenceYear === year
    );
  };

  const handleInvoiceClick = (invoice: Invoice | undefined) => {
    if (invoice) {
      console.log("Detalhes da fatura:", invoice);
    }
  };

  const sampleData: Page<Customer> = {
    content: [
      {
        id: 2,
        registrationNumber: "7202210726",
        distributor: "CEMIG",
        name: "CASA DONA COMERCIO VAREJISTA E SOLUC...",
        consumer: "CASA DONA COMERCIO VAR...",
        invoices: [
          {
            id: 12,
            referenceMonth: "JAN",
            referenceYear: "2024",
            electricityConsumptionKWh: "100",
            electricityCost: "95.52",
            sceeeEnergyWithICMSKWh: "2.3",
            sceeeEnergyWithICMSCost: "1.172",
            compensatedEnergyKWh: "2.3",
            compensatedEnergyCost: "-1.12",
            publicLightingContributionKWh: "40.45"
          }
        ]
      }
    ],
    page: "1",
    pageSize: "10",
    totalElements: 1,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false
  };

  if (isLoading) return <p>Carregando...</p>;

  const displayData = data || sampleData;

  return (
    <>
      <Filter 
        onYearChange={setActiveYear}
        activeYear={activeYear}
        selectedFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>Nome da UC</Th>
              <Th>Número da UC</Th>
              <Th>Distribuidora</Th>
              <Th>Consumidor</Th>
              {months.map(month => (
                <Th key={month} style={{ textAlign: 'center', width: '40px' }}>{month}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayData.content.map((customer, index) => (
              <TrAlternate key={customer.id}>
                <Td>{customer.name || 'N/A'}</Td>
                <Td>{customer.registrationNumber}</Td>
                <Td>{customer.distributor}</Td>
                <Td>{customer.consumer || customer.name || 'N/A'}</Td>
                {months.map((month, i) => {
                  const invoice = hasInvoiceForMonth(
                    customer.invoices, 
                    month.substring(0, 3).toUpperCase(), 
                    activeYear
                  );
                  
                  return (
                    <MonthIconCell key={month} style={{ backgroundColor: index % 2 === 1 ? '#f5f5f5' : '#ffffff' }}>
                      <InvoiceIcon 
                        active={!!invoice}
                        role="img" 
                        aria-label="invoice" 
                        title={invoice ? `Consumo: ${invoice.electricityConsumptionKWh}kWh, Custo: R$${invoice.electricityCost}` : 'Sem fatura disponível'}
                        onClick={() => handleInvoiceClick(invoice)}
                      >
                        📄
                      </InvoiceIcon>
                    </MonthIconCell>
                  );
                })}
              </TrAlternate>
            ))}
          </tbody>
        </Table>
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(displayData.totalElements / pageSize)}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </TableContainer>
    </>
  );
}