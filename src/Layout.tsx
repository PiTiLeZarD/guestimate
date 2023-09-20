import AddIcon from "@mui/icons-material/Add";
import { Button, Dialog, Paper, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { shallow } from "zustand/shallow";
import { ProjectionChart } from "./ProjectionChart";
import { RepeatingTransactionForm } from "./RepeatingTransactionForm";
import { RepeatingTransactionList } from "./RepeatingTransactionList";
import { useStore } from "./store";
import { RepeatingTransaction } from "./utils";

export type LayoutProps = {};

export type LayoutComponent = React.FunctionComponent<LayoutProps>;

export const Layout: LayoutComponent = (): JSX.Element => {
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
    const [selectedTransaction, setSelectedTransaction] = React.useState<RepeatingTransaction | undefined>(undefined);
    const { startingPoint, setStartingPoint, repeatingTransactions, setRepeatingTransactions } = useStore(
        (state) => ({
            startingPoint: state.startingPoint,
            setStartingPoint: state.setStartingPoint,
            repeatingTransactions: state.repeatingTransactions,
            setRepeatingTransactions: state.setRepeatingTransactions,
        }),
        shallow
    );

    const onSubmit = (data: RepeatingTransaction) => {
        setRepeatingTransactions([
            ...repeatingTransactions.filter((t) => t.label !== data.label),
            { ...data, amount: +data.amount, repeatCount: +data.repeatCount },
        ]);
        onDialogClose();
    };

    const onClick = (t: RepeatingTransaction) => (ev) => {
        setDialogOpen(true);
        setSelectedTransaction(t);
    };

    const onDialogClose = () => {
        setSelectedTransaction(undefined);
        setDialogOpen(false);
    };

    return (
        <>
            <Dialog open={dialogOpen} onClose={onDialogClose}>
                <RepeatingTransactionForm onSubmit={onSubmit} edit={selectedTransaction} />
            </Dialog>
            <Stack spacing={4}>
                <Paper elevation={2} sx={{ padding: "1em" }}>
                    <Stack direction="row" spacing={4}>
                        <TextField
                            value={String(startingPoint)}
                            onChange={(ev) => setStartingPoint(+ev.target.value)}
                            label="Starting Point"
                        />
                        <Button size="large" startIcon={<AddIcon />} onClick={() => setDialogOpen(true)}>
                            Add a transaction
                        </Button>
                    </Stack>
                </Paper>
                <Paper elevation={2}>
                    <ProjectionChart />
                </Paper>
                <Stack direction="row" spacing={4}>
                    <Paper elevation={2} sx={{ flex: 1, padding: "1em" }}>
                        <Stack spacing={2}>
                            <Typography variant="h5">Income</Typography>
                            <RepeatingTransactionList
                                onClick={onClick}
                                transactions={repeatingTransactions.filter((t) => t.amount > 0)}
                            />
                        </Stack>
                    </Paper>
                    <Paper elevation={2} sx={{ flex: 1, padding: "1em" }}>
                        <Stack spacing={2}>
                            <Typography variant="h5">Expense</Typography>
                            <RepeatingTransactionList
                                onClick={onClick}
                                transactions={repeatingTransactions.filter((t) => t.amount < 0)}
                            />
                        </Stack>
                    </Paper>
                </Stack>
            </Stack>
        </>
    );
};
