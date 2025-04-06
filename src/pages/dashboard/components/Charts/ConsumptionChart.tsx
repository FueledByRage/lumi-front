import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";


export interface MontlhyData{
  month: string;
  value: number;
}

export interface ConsumptionChartProps {
  data?: MontlhyData[];
}

export default function ConsumptionChart({ data }: ConsumptionChartProps ) {
  return (
    <>
      <h2>Consumo mensal</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
