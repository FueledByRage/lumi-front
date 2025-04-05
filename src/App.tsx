import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import styled from "styled-components";

interface Invoice {
  id: number;
  referenceMonth: string;
  referenceYear: string;
  electricityConsumptionKWh: string;
  electricityCost: string;
  sceeeEnergyWithICMSKWh: string;
  sceeeEnergyWithICMSCost: string;
  compensatedEnergyKWh: string;
  compensatedEnergyCost: string;
  publicLightingContributionKWh: string;
}

interface Customer {
  id: number;
  registrationNumber: string;
  distributor: string;
  name?: string;
  consumer?: string;
  invoices: Invoice[];
}

interface ApiResponse {
  content: Customer[];
  page: string;
  pageSize: string;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  font-family: Arial, sans-serif;
  margin: 20px 0;
`;

const FiltersContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  background-color: #f5f5f5;
  padding: 8px 16px;
  border-radius: 4px;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  background-color: ${props => props.active ? "#043f23" : "#ffffff"};
  color: ${props => props.active ? "#ffffff" : "#000000"};
  border: 1px solid #ccc;
  padding: 8px 16px;
  margin-right: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

const YearButton = styled.button<{ active?: boolean }>`
  background-color: ${props => props.active ? "#868686" : "#e0e0e0"};
  color: ${props => props.active ? "#ffffff" : "#000000"};
  border: none;
  padding: 8px 16px;
  margin-right: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
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

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .pagination {
    display: flex;
    list-style: none;
    padding: 0;
  }

  .pagination li {
    margin: 0 5px;
    cursor: pointer;
  }

  .pagination li a {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #333;
  }

  .pagination li.active a {
    background-color: #043f23;
    color: white;
    border-color: #043f23;
  }
`;

const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set"];
const monthMap: Record<string, number> = {
  "JAN": 0,
  "FEV": 1,
  "MAR": 2,
  "ABR": 3,
  "MAI": 4,
  "JUN": 5,
  "JUL": 6,
  "AGO": 7,
  "SET": 8,
  "OUT": 9,
  "NOV": 10,
  "DEZ": 11
};

export default function CustomerTable() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<string>("distribuidoras");
  const [activeYear, setActiveYear] = useState<string>("2024");
  const pageSize: number = 10;

  const fetchCustomers = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/customers?page=${page + 1}&pageSize=${pageSize}&year=${activeYear}`);
      const result: ApiResponse = await response.json();
      setData(result);
    } catch (error) {
      console.error("Erro ao buscar os clientes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers(currentPage);
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

  const sampleData: ApiResponse = {
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
      <FiltersContainer>
        <FilterButton>
          <span role="img" aria-label="filter">🔍</span> Consumidores
        </FilterButton>
        <FilterButton active>
          <span role="img" aria-label="filter">🔍</span> Distribuidoras
        </FilterButton>
        {[2018, 2019, 2020, 2021, 2022, 2023].map(year => (
          <YearButton key={year} active={activeYear === year.toString()} onClick={() => setActiveYear(year.toString())}>
            {year}
          </YearButton>
        ))}
        <YearButton active={activeYear === "2024"} onClick={() => setActiveYear("2024")}>
          2024
        </YearButton>
      </FiltersContainer>
      
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
        <PaginationContainer>
          <ReactPaginate
            previousLabel={"←"}
            nextLabel={"→"}
            breakLabel={"..."}
            pageCount={displayData.totalPages || 0}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={(e) => setCurrentPage(e.selected)}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </PaginationContainer>
      </TableContainer>
    </>
  );
}