import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Filter from "./components/Filter";
import { Page } from "../../services/customers/customers-service.types";
import Customer from "../../entities/customer";
import { CustomerService } from "../../services/customers/customers.service";
import CustomersTable from "./components/Table";
import FloatButton from "../../components/FloatButton";
import UploadDrawer from "./components/UploadDrawer";
import { FilterEnum } from "./table.types";
export interface QueryOptions {
  page: number;
  pageSize: number;
  year: string;
  query: string | null;
  type: FilterEnum;
}
export default function CustomerTable() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const [queryOptions, setQueryOptions] = useState<QueryOptions>({
    page: 1,
    pageSize: 10,
    year: "2024",
    query: null,
    type: FilterEnum.DISTRIBUTORS,
  });

  const setCurrentPage = (page: number) => {
    setQueryOptions(prev => ({ ...prev, page }));
  };

  const setActiveYear = (year: string) => {
    setQueryOptions(prev => ({ ...prev, year }));
  };

  const setActiveQuery = (query: string) => {
    setQueryOptions(prev => ({ ...prev, query }));
  };

  const setActiveFilter = (type: FilterEnum) => {
    setQueryOptions(prev => ({ ...prev, type }));
  };

  const queryKey = ['customers', queryOptions]

  const { data, isLoading } = useQuery<Page<Customer>>({
    queryKey,
    queryFn: () => CustomerService.fetchCustomers(queryOptions).then(response => response),
  });

  if (isLoading) return <p>Carregando...</p>;

  return (
    <>
      <Filter 
        onYearChange={setActiveYear}
        activeYear={queryOptions.year}
        selectedFilter={queryOptions.type}
        onFilterChange={setActiveFilter}
        onQueryChange={setActiveQuery}
        query={queryOptions.query}
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
        queryKey={queryKey}
      />

      <FloatButton
        onClick={() => setIsDrawerOpen(true)}
        icon={<span>+</span>}
        ariaLabel="Enviar nova fatura"
      />
    </>
  );
}