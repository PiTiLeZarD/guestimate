import { Typography } from "@mui/material";
import React from "react";
import { RepeatingTransaction, days } from "./utils";

export type RepeatLabelProps = {
    transaction: RepeatingTransaction;
};

export type RepeatLabelComponent = React.FC<RepeatLabelProps>;

export const RepeatLabel: RepeatLabelComponent = ({ transaction }): JSX.Element => {
    return (
        <Typography>
            Repeats every {transaction.repeatCount > 1 ? transaction.repeatCount : ""} {transaction.repeat}
            {transaction.repeatCount > 1 ? "s" : ""} on{" "}
            {transaction.repeat == "week"
                ? transaction.repeatTicks.map((t) => days[t]).join(", ")
                : transaction.repeatTicks.join(", ")}
        </Typography>
    );
};
