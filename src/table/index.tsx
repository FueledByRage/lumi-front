import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import { Page } from "../services/customers/customers-service.types";
import Customer from "../entities/customer";
import { CustomerService } from "../services/customers/customers.service";
import CustomersTable from "./components/Table";


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

  return (
    <>
      <Filter 
        onYearChange={setActiveYear}
        activeYear={activeYear}
        selectedFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      
      <CustomersTable
        customersPage={data}
        currentPage={currentPage}
        pageSize={pageSize}
        activeYear={activeYear}
        setActiveYear={setActiveYear}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}