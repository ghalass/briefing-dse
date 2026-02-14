import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
} from "recharts";

type Serie = {
  dataKey: string;
  stroke?: string;
  name?: string;
  showValues?: boolean;
  dashed?: boolean; // ← ajout
};
interface MultiLineChartProps {
  data: any[];
  xKey: string;
  series: Serie[];
  height?: number;
}

export function MultiLineChart({
  data,
  xKey,
  series,
  height = 300,
}: MultiLineChartProps) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={xKey}
            angle={-45}
            textAnchor="end"
            interval={0}
            height={70}
          />
          <YAxis />
          <Tooltip />
          <Legend
            layout="horizontal"
            verticalAlign="top"
            align="center"
            wrapperStyle={{ marginBottom: 10 }}
          />

          {series.map((s) => (
            <Line
              key={s.dataKey}
              type="monotone" // monotone linear
              dataKey={s.dataKey}
              stroke={s.stroke || "#8884d8"}
              name={s.name || s.dataKey}
              strokeWidth={2}
              strokeDasharray={s.dashed ? "5 5" : undefined} // ← ligne pointillée si true
            >
              {s.showValues && (
                <LabelList
                  dataKey={s.dataKey}
                  position="top"
                  fill={s.stroke || "#8884d8"}
                  style={{ fontSize: 12, fontWeight: "bold" }}
                />
              )}
            </Line>
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
