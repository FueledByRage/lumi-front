import { FilterEnum } from '../../table.types';
import { FilterButton, YearButton, FiltersContainer, SearchInput, FiltersButtonsContainer } from './Filter.styles';

export interface FilterProps {
  onFilterChange: (filter: FilterEnum) => void;
  onYearChange: (year: string) => void;
  activeYear: string;
  selectedFilter: FilterEnum;
  onQueryChange: (query: string) => void;
  query: string | null;
}

export default function Filter({ onYearChange, activeYear, onFilterChange, selectedFilter, onQueryChange, query }: FilterProps) {
  return(
    <FiltersContainer>
      <FiltersButtonsContainer>
        <FilterButton active={selectedFilter === FilterEnum.CONSUMERS} onClick={() => {onFilterChange(FilterEnum.CONSUMERS)}}>
          <span role="img" aria-label="filter">🔍</span> Consumidores
        </FilterButton>
        <FilterButton  active={selectedFilter === FilterEnum.DISTRIBUTORS} onClick={() => {onFilterChange(FilterEnum.DISTRIBUTORS)}}>
          <span role="img" aria-label="filter">🔍</span> Distribuidoras
        </FilterButton>
        {[2018, 2019, 2020, 2021, 2022, 2023, 2024].map(year => (
          <YearButton key={year} active={activeYear === year.toString()} onClick={() => {onYearChange(year.toString())}}>
            {year}
          </YearButton>
        ))}
      </FiltersButtonsContainer>
      <SearchInput
        value={query || ''}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Pesquisar..."
      />
    </FiltersContainer>
  )
}
