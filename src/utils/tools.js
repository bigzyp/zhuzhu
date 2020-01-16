/*
 * @Author: zengyangping
 * @Date: 2020-01-15 16:00:22
 * @LastEditors: zengyangping
 * @LastEditTime: 2020-01-16 16:44:15
 * @Description: 
 * @FilePath: /zhuzhutool/src/utils/tools.js
 */
// 计算天数
export const computeDays = ({start, target, isRepeat}) => {
    const startTime = start ? new Date(start) : new Date();
    const curYear = startTime.getFullYear();
    let targetTime = new Date(target);
    const endDate = `/${targetTime.getMonth()+1}/${targetTime.getDate()}`;
    let time = startTime.getTime() - targetTime.getTime();
    if(isRepeat){
        targetTime = new Date(`${curYear}${endDate}`);
        if(targetTime.getTime() < startTime.getTime()){
            targetTime = new Date(`${curYear+1}${endDate}`);
        }
        time = targetTime.getTime() - startTime.getTime();
    }
    return `${isRepeat?'还有':'已经'} ${Math.ceil(time/3600000/24)} 天`
}

export const abc = () => {
    return 'abc'
}