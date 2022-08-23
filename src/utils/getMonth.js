import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

const getMonth = (month = dayjs().month()) => {
  const year = dayjs().year();
  const firstDay = dayjs(new Date(year, month, 1)).day();
  let curMonthCnt = 0 - firstDay;

  const daysMatrix = Array(6)
    .fill([])
    .map(() => {
      return Array(7)
        .fill(null)
        .map(() => {
          curMonthCnt++;
          return dayjs(new Date(year, month, curMonthCnt));
        });
    });

  if (daysMatrix[4][0].format('M') !== daysMatrix[5][0].format('M')) {
    daysMatrix.pop();
  }

  return daysMatrix;
};

export default getMonth;
