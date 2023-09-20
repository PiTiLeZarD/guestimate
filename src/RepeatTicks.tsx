import { Checkbox, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { RepeatingTransaction, days } from "./utils";

export type RepeatTicksProps = {
    watch: UseFormWatch<RepeatingTransaction>;
    setValue: UseFormSetValue<RepeatingTransaction>;
};

export type RepeatTicksComponent = React.FC<RepeatTicksProps>;

export const RepeatTicks: RepeatTicksComponent = ({ watch, setValue }): JSX.Element => {
    const repeat = watch("repeat");
    const repeatTicks = watch("repeatTicks");

    const onTickChange = (i) => (ev, checked) => {
        setValue("repeatTicks", checked ? [...repeatTicks, i] : repeatTicks.filter((t) => t !== i));
    };

    return (
        <Grid container>
            {new Array(repeat == "week" ? 7 : 31).fill(null).map((_, i) => (
                <Grid key={i} item xs={repeat == "week" ? 12 / 7 : 1}>
                    <Stack>
                        <Checkbox checked={repeatTicks.includes(i + 1)} onChange={onTickChange(i + 1)} />
                        <Typography>{repeat == "week" ? days[i] : i + 1}</Typography>
                    </Stack>
                </Grid>
            ))}
        </Grid>
    );
};
