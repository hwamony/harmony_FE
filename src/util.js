import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

export const getMonth = (month = dayjs().month()) => {
  const year = dayjs().year();
  const firstDay = dayjs(new Date(year, month, 1)).day();
  let curMonthCnt = 0 - firstDay;

  const daysMatrix = Array(5)
    .fill([])
    .map(() => {
      return Array(7)
        .fill(null)
        .map(() => {
          curMonthCnt++;
          return dayjs(new Date(year, month, curMonthCnt));
        });
    });

  return daysMatrix;
};
