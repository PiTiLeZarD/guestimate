import { Button, MenuItem, Stack, TextField } from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RepeatTicks } from "./RepeatTicks";
import { RepeatingTransaction } from "./utils";

export type RepeatingTransactionFormProps = {
    onSubmit: SubmitHandler<RepeatingTransaction>;
};

export type RepeatingTransactionFormComponent = React.FunctionComponent<RepeatingTransactionFormProps>;

export const RepeatingTransactionForm: RepeatingTransactionFormComponent = ({ onSubmit }): JSX.Element => {
    const defaultValues: Partial<RepeatingTransaction> = {
        amount: 0,
        repeat: "week",
        repeatCount: 1,
        repeatTicks: [],
    };
    const { register, handleSubmit, watch, setValue } = useForm<RepeatingTransaction>({
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack sx={{ margin: "1em" }} spacing={2}>
                <TextField label="Label" {...register("label")} />
                <TextField label="Amount" {...register("amount")} />
                <TextField label="Repeat" select {...register("repeat")} defaultValue={defaultValues.repeat}>
                    <MenuItem value="week">week</MenuItem>
                    <MenuItem value="month">month</MenuItem>
                </TextField>
                <TextField
                    label="How often"
                    helperText="Fortnightly is week/2, quarterly is month/3 etc..."
                    select
                    {...register("repeatCount")}
                    defaultValue={defaultValues.repeatCount}
                >
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                </TextField>
                <RepeatTicks setValue={setValue} watch={watch} />
                <Button type="submit">OK</Button>
            </Stack>
        </form>
    );
};
