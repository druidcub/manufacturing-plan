export function clonedObject(obj) {                                             //建立物件副本
    return JSON.parse(JSON.stringify(obj));
}

//單位換算區
export function perth(value){                                                   //顯示數值的千分號
    if (!value) return 0;
    value = parseFloat(value);
    // 獲取整數部分
    const intPart = Math.trunc(value)
    // 整數部分處理，增加,
    const absIntPart = Math.abs(intPart); // 取絕對值
    const intPartFormat = (value < 0 ? '-':'') + absIntPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    // 預定義小數部分
    let floatPart = ''
    // 將數值截取為小數部分和整數部分
    const valueArray = value.toString().split('.')
    if (valueArray.length === 2) { // 有小數部分
        floatPart = valueArray[1].toString() // 取得小數部分
        return intPartFormat + '.' + floatPart
    }
    return intPartFormat + floatPart
}
export function wSign(value){                                                   //顯示數值，以萬為單位
    let res = value;
    if(res > 100000)
    {
        res = Math.round(res/10000);
        res = perth(res) + "萬";
    }
    else if(res > 10000)
    {
        res = Math.round(res/1000) / 10;
        res = perth(res) + "萬";
    }
    else
    {
        res = perth(res);
    }

    return res;
}

//HTML處理區
export function toHtml(str){                                                    //將換行符號\n改成html的換行符號<br>
    if(str === null || str === undefined)
    {
        return "";
    }
    else
    {
        return str.replace(/\n/g, '<br>');
    }
}
export function fromHtml(str){                                                  //將html的換行符號<br>改成換行符號\n
    if(str === null || str === undefined)
    {
        return "";
    }
    else
    {
        return str.replace(/<br>/g, '\n');
    }
}

//日期處理區
export function weekday(d){                                                     //輸入日期字串，顯示星期幾的中文字符
    const dayArray = ["日","一","二","三","四","五","六"];
    var res = '';
    if(d instanceof Date)
    {
        res = dayArray[d.getDay()];
    }
    else if(d !== '')
    {
        res = dayArray[new Date(d).getDay()];
    }
    return res;
}
export function localizeDate(tsString, defaultStr){                             //輸出本地時區的日期
    if(tsString  === "")
    {
        return defaultStr;
    }
    //timestamptz若為0，就回傳空白
    let d = new Date(tsString);
    if(d.getTime() === 0)
    {
        return defaultStr;
    }
    else
    {
        return d.toLocaleString('sv', { hour12: false }).slice(0,10).replace(/-/g,"/");
    }
}
export function localizeMonth(monthString, defaultStr)                          //輸出本地時區的年/月
{
    const strs = monthString.split("-");
    if(strs.length !== 2)
    {
        return defaultStr;
    }
    else
    {
        return `${strs[0]}年${strs[1]}月`;
    }
}
export function formatDate(numb, format = '-', excelData = undefined) {         //把各種格式的日期文字轉成yyyy-mm-dd
    if(numb === undefined || numb === "")
    {
        return "";
    }
    else if (isNaN(numb)) {
        if(numb.indexOf("星期") !== -1 && numb.split(' ').length === 2)    //格式-> 3/01 (星期五)
        {
            let yyyy = new Date().getFullYear();
            //console.log(numb.split(' ')[0]);
            return formatDate(yyyy + "/" + numb.split(' ')[0]);
        }
        else if(numb.indexOf("星期") !== -1 && numb.split('(').length === 2)    //格式-> 2024-05-19(星期日)
        {
            //console.log(numb.split(' ')[0]);
            return formatDate(numb.split('(')[0]);
        }
        else if(numb.indexOf("月") !== -1)  //12月2日
        {
            let yyyy = new Date().getFullYear();
            return formatDate(yyyy + "/" + numb.replace("月","/").replace("日",""));
        }
        else
        {
            let dateParts = numb.split('/');
            if (dateParts.length === 3) {
                let y = dateParts[0];
                if (!isNaN(y) && parseInt(y) > 100 && parseInt(y) < 2000) {
                    return (parseInt(y) + 1911) + "-" + dateParts[1] + "-" + dateParts[2];
                } else {
                    return dateParts[0] + "-" + 
                            (dateParts[1].length === 1? "0"+ dateParts[1] : dateParts[1]) + "-" + 
                            (dateParts[2].length === 1? "0"+ dateParts[2] : dateParts[2]);
                }
            } else if (dateParts.length === 2) {
                let yyyy = (excelData !== undefined && excelData[0] !== undefined && excelData[0][0] !== undefined)? excelData[0][0].class_date.slice(0, 4): new Date().getFullYear();
                return yyyy + "-" + 
                        (dateParts[0].length === 1? "0"+ dateParts[0] : dateParts[0]) + "-" + 
                        (dateParts[1].length === 1? "0"+ dateParts[1] : dateParts[1]);
            }
            else
            {
                dateParts = numb.split('-');
                if (dateParts.length === 3) {
                    let y = dateParts[0];
                    if (!isNaN(y) && parseInt(y) > 100 && parseInt(y) < 2000) {
                        return (parseInt(y) + 1911) + "-" + dateParts[1] + "-" + dateParts[2];
                    } else {
                        return dateParts[0] + "-" + 
                                (dateParts[1].length === 1? "0"+ dateParts[1] : dateParts[1]) + "-" + 
                                (dateParts[2].length === 1? "0"+ dateParts[2] : dateParts[2]);
                    }
                } else if (dateParts.length === 2) {
                    let yyyy = (excelData !== undefined && excelData[0] !== undefined && excelData[0][0] !== undefined)? excelData[0][0].class_date.slice(0, 4): new Date().getFullYear();
                    return yyyy + "-" + 
                            (dateParts[0].length === 1? "0"+ dateParts[0] : dateParts[0]) + "-" + 
                            (dateParts[1].length === 1? "0"+ dateParts[1] : dateParts[1]);
                }
                else
                {
                    return "";
                }
            }
        }
    } else {
        const time = new Date((numb - 25567) * 24 * 3600000 - 5 * 60 * 1000 - 43 * 1000 - 24 * 3600000 - 8 * 3600000)

        time.setYear(time.getFullYear())
        const year = time.getFullYear() + ''
        const month = time.getMonth() + 1 + ''
        const date = time.getDate() + ''
        if (format && format.length === 1) {
            return year + format + (month < 10 ? '0' + month : month) + format + (date < 10 ? '0' + date : date)
        } else {
            return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date);
        }
    }

}
export function formatTime(numb, format = '-') {                                //把各種格式的時間文字轉成(yyyy-mm-dd )HH/MM/SS
    if (isNaN(numb)) {
        numb = numb.replace("“", ":");
        let date = "";
        let timeParts = numb.split(':');
        if (timeParts[0].indexOf("/") !== -1 && timeParts[0].indexOf(" ") !== -1) //還帶有日期
        {
            date = timeParts[0].split(" ")[0];
            date = formatDate(date) + " ";
            timeParts[0] = timeParts[0].split(" ")[1];
        }

        if (timeParts.length === 3) {
            return date + timeParts.join(":");
        } else if (timeParts.length === 2) {
            return date + timeParts.join(":") + ":00";
        } else {
            alert("無法解析的時間：" + numb);
        }
    } else {
        let totalSeconds = numb * 24 * 60 * 60;
        let hours = Math.floor(totalSeconds / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let res = ((hours < 10) ? '0' + hours : hours) + ":" +
            ((minutes < 10) ? '0' + minutes : minutes) + ":" +
            ((seconds < 10) ? '0' + seconds : seconds);
        return res;
    }
}
export function isHistoryDate(date){                                            //判斷是否為歷史日期(才可以做編輯或詳情觀看)
    return new Date().getTime() > new Date(date).getTime();
}
export function calculateDays(date1 , date2){                                   //計算兩個輸入日期文字的天數間隔(含頭尾)
    let result = "";
    if (date1 !== "" && date2 !== "" ) {
        const start = new Date(date1.replace(/\//g, '-'));
        const end = new Date(date2.replace(/\//g, '-'));

        // 計算兩個日期之間的天數
        const timeDiff = Math.abs(end - start);
        const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24) + 1);
        

        result = days;
        
    } else {
        // 如果起始日期或結束日期為空，清空計算結果
        result = 0;
    }

    return result;
}   
