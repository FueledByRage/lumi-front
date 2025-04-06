import styled from "styled-components";

const Card = styled.div`
  flex: 1;
  min-width: 200px;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 12px;
  box-shadow: 0 0 10px #0001;
`;

export default function SummaryCard({ title, value }: { title: string; value: string | number }) {
  return (
    <Card>
      <h3>{title}</h3>
      <p>{value}</p>
    </Card>
  );
}
