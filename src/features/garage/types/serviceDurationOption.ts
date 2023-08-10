type DayValues = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 14 | 21 | 28;
type MonthValues = 1 | 2 | 3 | 4 | 5 | 6 | 9;
type YearValues = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type DayAsDaysNumber = DayValues;
type MonthAsDaysNumber = 30 | 60 | 90 | 120 | 150 | 180 | 270;
type YearAsDaysNumber = 365 | 730 | 1095 | 1460 | 1825 | 2190 | 2555 | 2920 | 3285 | 3650;

export type ServiceDurationOption = {
  value: DayValues;
  type: "day";
  daysNumber: DayAsDaysNumber;
} | {
  value: MonthValues;
  type: "month";
  daysNumber: MonthAsDaysNumber;
} | {
  value: YearValues;
  type: "year";
  daysNumber: YearAsDaysNumber;
};
