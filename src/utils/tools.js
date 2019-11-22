// 计算天数
export const computeDays = ({start, target, isRepeat}) => {
    const startTime = start ? new Date(start) : new Date();
    const curYear = startTime.getFullYear();
    const endDate = target.substr(4, 6);
    let targetTime = new Date(target);
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