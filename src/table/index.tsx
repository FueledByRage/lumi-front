import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import { Page } from "../services/customers/customers-service.types";
import Customer from "../entities/customer";
import { CustomerService } from "../services/customers/customers.service";
import CustomersTable from "./components/Table";
import FloatButton from "../components/FloatButton";
import UploadDrawer from "./components/UploadDrawer";


export default function CustomerTable() {
  const [data, setData] = useState<Page<Customer> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [activeFilter, setActiveFilter] = useState<string>("distribuidoras");
  const [activeYear, setActiveYear] = useState<string>("2024");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
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

      <UploadDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />

      <FloatButton
        onClick={() => setIsDrawerOpen(true)}
        icon={<span>+</span>}
        ariaLabel="Enviar nova fatura"
      />
    </>
  );
}