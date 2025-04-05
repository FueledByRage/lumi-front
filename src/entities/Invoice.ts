export enum MonthEnum {
  ALL="ALL",
  JAN="JAN",
  FEB="FEB",
  MAR="MAR",
  APR="APR",
  MAY="MAY",
  JUN="JUN",
  JUL="JUL",
  AUG="AUG",
  SEP="SEP",
  OCT="OCT",
  NOV="NOV",
  DEC="DEC",
}

export enum MonthEnumTranslation {
  ALL="Todos",
  JAN="Janeiro",
  FEB="Fevereiro",
  MAR="Março",
  APR="Abril",
  MAY="Maio",
  JUN="Junho",
  JUL="Julho",
  AUG="Agosto",
  SEP="Setembro",
  OCT="Outubro",
  NOV="Novembro",
  DEC="Dezembro",
}

export default interface Invoice {
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
