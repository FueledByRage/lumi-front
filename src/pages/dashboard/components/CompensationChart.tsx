import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function CompensationChart({ data }: { data: { month: string; value: number }[] }) {
  return (
    <>
      <h2>Valor compensado por mês (R$)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
