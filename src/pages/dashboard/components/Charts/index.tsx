import CompensationChart from "./CompensationChart";
import ConsumptionChart from "./ConsumptionChart";

interface ChartsProps {
  data: {
    consumption: any;
    compensation: any;
  };
}

export function Charts({ data }: ChartsProps) {
  return (
    <>
      <ConsumptionChart data={data.consumption} />
      <CompensationChart data={data.compensation} />
    </>
  );
}
