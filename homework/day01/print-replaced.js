export function printReplaced(regNum){
    let splitNums = regNum.split('-');
    splitNums[1] = splitNums[1].substr(0,1)+'******';
    console.log(splitNums[0] + '-' + splitNums[1]);
}