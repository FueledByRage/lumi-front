import { FilterButton, YearButton, FiltersContainer } from './Filter.styles';

export interface FilterProps {
  onFilterChange: (filter: string) => void;
  onYearChange: (year: string) => void;
  activeYear: string;
  selectedFilter: string;
}

export default function Filter({ onYearChange, activeYear }: FilterProps) {

  return(
    <FiltersContainer>
    <FilterButton>
      <span role="img" aria-label="filter">🔍</span> Consumidores
    </FilterButton>
    <FilterButton active>
      <span role="img" aria-label="filter">🔍</span> Distribuidoras
    </FilterButton>
    {[2018, 2019, 2020, 2021, 2022, 2023, 2024].map(year => (
      <YearButton key={year} active={activeYear === year.toString()} onClick={() => onYearChange(year.toString())}>
        {year}
      </YearButton>
    ))}
  </FiltersContainer>
  )

}
