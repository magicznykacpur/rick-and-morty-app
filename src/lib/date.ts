import { DateTime } from 'luxon';

export const toShortDate = (isoDate: string) =>
  DateTime.fromISO(isoDate).toFormat('dd-MM-yyyy');
