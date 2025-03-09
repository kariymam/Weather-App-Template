import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-(--background) p-4 rounded-xl">
        <p className="label text-xs">{label}</p>
        <p className="desc">{`${payload[0].value}F`}</p>
      </div>
    );
  }
}

export default function HourlyForecastChart({ data }) {
    return (
        <>
        <ResponsiveContainer width='95%' height={450}>
              <AreaChart accessibilityLayer data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  dataKey="temperature"
                  type="natural"
                  stroke="var(--primary)"
                />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            </ResponsiveContainer>
        </>
    )
}