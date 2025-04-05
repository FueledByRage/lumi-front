import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";


export interface ConsumptionChartProps {
  data: {
    month: string;
    kWh: number;
  }[];
}

export default function ConsumptionChart({ data }: ConsumptionChartProps ) {
  return (
    <>
      <h2>Consumo mensal (kWh)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Line type="monotone" dataKey="kWh" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
