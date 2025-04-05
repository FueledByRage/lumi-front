import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Filter from "./components/Filter";
import { Page } from "../../services/customers/customers-service.types";
import Customer from "../../entities/customer";
import { CustomerService } from "../../services/customers/customers.service";
import CustomersTable from "./components/Table";
import FloatButton from "../../components/FloatButton";
import UploadDrawer from "./components/UploadDrawer";
interface QueryOptions {
  page: number;
  pageSize: number;
  year: string;
}

export default function CustomerTable() {
  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    page: 1,
    pageSize: 10,
    year: "2024"
  });
  const [activeFilter, setActiveFilter] = useState<string>("distribuidoras");
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const setCurrentPage = (page: number) => {
    setQueryOptions(prev => ({ ...prev, page }));
  };

  const setActiveYear = (year: string) => {
    setQueryOptions(prev => ({ ...prev, year }));
  };

  const { data, isLoading } = useQuery<Page<Customer>>({
    queryKey: ["customers", queryOptions, activeFilter],
    queryFn: () => CustomerService.fetchCustomers(queryOptions).then(response => response),
  });

  if (isLoading) return <p>Carregando...</p>;

  return (
    <>
      <Filter 
        onYearChange={setActiveYear}
        activeYear={queryOptions.year}
        selectedFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      
      <CustomersTable
        customersPage={data}
        currentPage={queryOptions.page}
        pageSize={queryOptions.pageSize}
        activeYear={queryOptions.year}
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