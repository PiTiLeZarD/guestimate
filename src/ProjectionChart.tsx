import { MenuItem, Stack, TextField, Typography } from "@mui/material";
import { DateTime } from "luxon";
import React from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { useStore } from "./store";
import { Granularity, getLedger } from "./utils";

const durations = [
    ["3 months", { months: 3 }],
    ["6 months", { months: 6 }],
    ["1 year", { years: 1 }],
    ["5 years", { years: 5 }],
    ["10 years", { years: 10 }],
];

export type ProjectionChartProps = {};

export type ProjectionChartComponent = React.FC<ProjectionChartProps>;

export const ProjectionChart: ProjectionChartComponent = (): JSX.Element => {
    const [granularity, setGranularity] = React.useState<Granularity>("month");
    const [duration, setDuration] = React.useState<number>(2);
    const repeatingTransactions = useStore((state) => state.repeatingTransactions);
    const startingPoint = useStore((state) => state.startingPoint);

    const data = getLedger(
        startingPoint,
        repeatingTransactions,
        DateTime.now(),
        DateTime.now().plus(durations[duration][1] as object),
        granularity
    ).map(([dt, amount]) => ({ date: dt.toSQLDate(), amount }));

    return (
        <Stack spacing={2}>
            <Stack direction="row" spacing={10}>
                <Typography variant="h5">Projection</Typography>
                <TextField
                    label="Granularity"
                    select
                    value={granularity}
                    onChange={(ev) => setGranularity(ev.target.value as Granularity)}
                >
                    <MenuItem value="day">Day</MenuItem>
                    <MenuItem value="week">Week</MenuItem>
                    <MenuItem value="month">Month</MenuItem>
                    <MenuItem value="year">Year</MenuItem>
                </TextField>
                <TextField label="Duration" select value={duration} onChange={(ev) => setDuration(+ev.target.value)}>
                    {durations.map(([label], i) => (
                        <MenuItem key={label as string} value={i}>
                            {label as string}
                        </MenuItem>
                    ))}
                </TextField>
            </Stack>
            <LineChart width={1400} height={400} data={data}>
                <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" />
                <XAxis dataKey="date" />
                <YAxis />
            </LineChart>
        </Stack>
    );
};
