import { DateTime, Interval } from "luxon";

export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export type RepeatingTransaction = {
    label: string;
    amount: number;
    repeat: "week" | "month";
    repeatCount: number;
    repeatTicks: number[];
};

type ProjectionPoint = [DateTime, RepeatingTransaction[]][];
const getRepeatsBetween = (repeats: RepeatingTransaction[], dateFrom: DateTime, dateTo: DateTime): ProjectionPoint => {
    const result: ProjectionPoint = [];
    let cursor = DateTime.fromObject(dateFrom.toObject());

    while (cursor < dateTo) {
        result.push([
            cursor,
            [
                ...repeats.filter(
                    (r) =>
                        r.repeat == "week" &&
                        r.repeatTicks.includes(cursor.weekday) &&
                        Math.floor(Interval.fromDateTimes(dateFrom, cursor).length("weeks")) % r.repeatCount == 0
                ),
                ...repeats.filter(
                    (r) =>
                        r.repeat == "month" &&
                        r.repeatTicks.includes(cursor.day) &&
                        Math.floor(Interval.fromDateTimes(dateFrom, cursor).length("months")) % r.repeatCount == 0
                ),
            ],
        ]);
        cursor = cursor.plus({ day: 1 });
    }
    return result;
};

export type Granularity = "day" | "week" | "month" | "year";
type Ledger = [DateTime, number][];
export const getLedger = (
    startAmount: number,
    repeats: RepeatingTransaction[],
    dateFrom: DateTime,
    dateTo: DateTime,
    granularity: Granularity = "month"
): Ledger => {
    const projection = getRepeatsBetween(repeats, dateFrom, dateTo);
    const ledger: Ledger = [];
    let cursor = DateTime.fromObject(dateFrom.toObject());
    let cursorAmount = startAmount;

    while (cursor <= dateTo) {
        const nextCursor = cursor.plus({ [granularity]: 1 });
        cursorAmount += projection
            .filter(([dt, rs]) => dt >= cursor && dt < nextCursor)
            .reduce((acc, [dt, rs]) => acc + rs.reduce((ra, r) => ra + r.amount, 0), 0);
        ledger.push([cursor, cursorAmount]);
        cursor = nextCursor;
    }

    return ledger;
};
