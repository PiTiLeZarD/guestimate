import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import React from "react";
import { RepeatLabel } from "./RepeatLabel";
import { useStore } from "./store";
import { RepeatingTransaction } from "./utils";

export type RepeatingTransactionListProps = {
    transactions: RepeatingTransaction[];
};

export type RepeatingTransactionListComponent = React.FC<RepeatingTransactionListProps>;

export const RepeatingTransactionList: RepeatingTransactionListComponent = ({ transactions }): JSX.Element => {
    const setRepeatingTransactions = useStore((state) => state.setRepeatingTransactions);
    const repeatingTransactions = useStore((state) => state.repeatingTransactions);

    const deleteTransaction = (t) => (ev) =>
        setRepeatingTransactions(repeatingTransactions.filter((transaction) => transaction.label !== t.label));

    return (
        <List>
            {transactions
                .sort((t1, t2) => (Math.abs(t2.amount) > Math.abs(t1.amount) ? 1 : -1))
                .map((t) => (
                    <ListItem
                        key={t.label}
                        secondaryAction={
                            <IconButton edge="end" aria-label="delete" onClick={deleteTransaction(t)}>
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemText>
                            {t.label}: {t.amount} <RepeatLabel transaction={t} />
                        </ListItemText>
                    </ListItem>
                ))}
        </List>
    );
};
