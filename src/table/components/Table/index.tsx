import Customer from "../../../entities/customer";
import Invoice from "../../../entities/Invoice";
import { Page } from "../../../services/customers/customers-service.types";
import Pagination from "../Pagination";
import MonthCell from "./MonthCell";
import { Table, TableContainer, Td, Th, TrAlternate } from "./table.styles";

export interface CustomersTableProps {
  customersPage: Page<Customer> | null;
  currentPage: number;
  pageSize: number;
  activeYear: string;
  setActiveYear: (year: string) => void;
  setCurrentPage: (page: number) => void;
}

const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set"];

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

export default function CustomersTable ({ customersPage, currentPage, pageSize, setCurrentPage, activeYear }: CustomersTableProps ){
  
  return(   
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
                {customersPage?.content.map((customer) => (
                  <TrAlternate key={customer.id}>
                    <Td>{customer.name || 'N/A'}</Td>
                    <Td>{customer.registrationNumber}</Td>
                    <Td>{customer.distributor}</Td>
                    <Td>{customer.consumer || customer.name || 'N/A'}</Td>

                    { 
                      months.map((month) => {
                        const invoice = hasInvoiceForMonth(
                          customer.invoices, 
                          month.substring(0, 3).toUpperCase(), 
                          activeYear
                        );
                        
                        return (
                          <MonthCell
                            key={month}
                            invoice={invoice}
                            onClick={() => handleInvoiceClick(invoice)}
                          />
                        )
                      })
                    }
                  </TrAlternate>
                ))}
              </tbody>
            </Table>
            <Pagination
              currentPage={currentPage}
              totalPages={customersPage ? Math.ceil(customersPage.totalElements / pageSize) : 0}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          </TableContainer>
  )

}