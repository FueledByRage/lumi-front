import { MonthEnum, MonthEnumTranslation } from "../../../../entities/Invoice";

export const months = [
  { value: MonthEnum.ALL, label: MonthEnumTranslation[MonthEnum.ALL] },
  { value: MonthEnum.JAN, label: MonthEnumTranslation[MonthEnum.JAN] },
  { value: MonthEnum.FEB, label: MonthEnumTranslation[MonthEnum.FEB] },
  { value: MonthEnum.MAR, label: MonthEnumTranslation[MonthEnum.MAR] },
  { value: MonthEnum.APR, label: MonthEnumTranslation[MonthEnum.APR] },
  { value: MonthEnum.MAY, label: MonthEnumTranslation[MonthEnum.MAY] },
  { value: MonthEnum.JUN, label: MonthEnumTranslation[MonthEnum.JUN] },
  { value: MonthEnum.JUL, label: MonthEnumTranslation[MonthEnum.JUL] },
  { value: MonthEnum.AUG, label: MonthEnumTranslation[MonthEnum.AUG] },
  { value: MonthEnum.SEP, label: MonthEnumTranslation[MonthEnum.SEP] },
  { value: MonthEnum.OCT, label: MonthEnumTranslation[MonthEnum.OCT] },
  { value: MonthEnum.NOV, label: MonthEnumTranslation[MonthEnum.NOV] },
  { value: MonthEnum.DEC, label: MonthEnumTranslation[MonthEnum.DEC] },
];