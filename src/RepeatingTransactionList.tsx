import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React, { SyntheticEvent } from "react";
import { RepeatLabel } from "./RepeatLabel";
import { useStore } from "./store";
import { RepeatingTransaction } from "./utils";

export type RepeatingTransactionListProps = {
    transactions: RepeatingTransaction[];
    onClick: (t: RepeatingTransaction) => (ev: SyntheticEvent) => void;
};

export type RepeatingTransactionListComponent = React.FC<RepeatingTransactionListProps>;

export const RepeatingTransactionList: RepeatingTransactionListComponent = ({ transactions, onClick }): JSX.Element => {
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
                        <ListItemButton onClick={onClick(t)}>
                            <ListItemText
                                primary={`${t.label}: ${t.amount}`}
                                secondary={<RepeatLabel transaction={t} />}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
        </List>
    );
};
