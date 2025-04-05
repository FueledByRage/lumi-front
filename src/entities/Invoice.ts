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
