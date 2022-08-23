



// 获取当天是今年的第几周（周一到周日为一周）
// 如果当年1月1日不是周一，则1月第一个周一为第二周的开始
export function getWeekInYear() {
    var endDate:any = new Date(),
        curYear:any = endDate.getFullYear(),
        startDate:any = new Date(curYear, 0, 1);

    var startWeek = startDate.getDay(), // 1月1号是星期几:0-6
        offsetWeek = 0; //用来计算不完整的第一周，如果1月1号为星期一则为0，否则为1

    if (startWeek != 1) {
        offsetWeek = 1;
        if (!startWeek) {
            startDate.setDate(1);
        } else {
            startDate.setDate(8 - startWeek); // (7 - startWeek + 1)
        }
    }
    var distanceTimestamp = endDate - startDate,
        days = Math.ceil(distanceTimestamp / (24 * 60 * 60 * 1000)) + startWeek,
        weeks = Math.ceil(days / 7) + offsetWeek;
    return weeks;
}


export const diffTypes = [
  {
    label:"简单",
    value:1,
    id:1,
    color:"#123456"
  },
  {
    label:"复杂",
    value:2,
    id:2,
    color:"#f50"
  },
  {
    label:"变态",
    value:3,
    id:3,
    color:"#0f0"
  },

]


export const cateTypes:any = [
  {
    label:"原生JS",
    value:"JS",
    id:1,
    color:"#123456"
  },
  {
    label:"CSS题目",
    value:"css",
    id:2,
    color:"#f50"
  },
  {
    label:"Vue题目",
    value:"vue",
    id:3,
    color:"#0f0"
  },
  {
    label:"React题目",
    value:"react",
    id:4,
    color:"#ccc"
  },
  {
    label:"小程序",
    value:'wx',
    id:5,
    color:"#333"
  },
  {
    label:"Node后台",
    value:'node',
    id:6,
    color:"#b5b5b5"
  },

]


