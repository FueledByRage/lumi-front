import { MonthEnum } from "../../../../entities/Invoice";
import { AllYears } from "../dashboard.types";
import { FilterContainer, FilterLabel, FilterSelect } from "./filters.styles";
import { months } from "./types";

interface FiltersProps {
  filters: {
    year: string | null;
    month: MonthEnum;
  };
  years: string[];
  onChange: (field: string, value: string) => void;
}

export function Filters({ filters, years, onChange }: FiltersProps) {
  return (
    <FilterContainer>
      <div>
        <FilterLabel htmlFor="yearFilter">Ano:</FilterLabel>
        <FilterSelect
          id="yearFilter"
          value={filters.year ?? ""}
          onChange={(e) => onChange("year", e.target.value)}
        >
          <option value={AllYears.ALL}>Todos</option>
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </FilterSelect>
      </div>

      <div>
        <FilterLabel htmlFor="monthFilter">Mês:</FilterLabel>
        <FilterSelect
          id="monthFilter"
          value={filters.month}
          onChange={(e) => onChange("month", e.target.value)}
        >
          {months.map((month) => (
            <option key={month.value} value={month.value}>{month.label}</option>
          ))}
        </FilterSelect>
      </div>
    </FilterContainer>
  );
}
