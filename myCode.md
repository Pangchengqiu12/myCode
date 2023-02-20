**uniapp中文件上传组件uni-file-picker上传图片，在支付宝小程序中显示异常多了一个加号**

```css
	.file-picker__box-content>.icon-add {
		display: none;
	}//将多余的隐藏
```

**uniapp封装的日历组件**

*思路一*

~~~vue
<template>
	<view class="page index">
		<view class="title">
			我的投喂日记
		</view>
		<view class="time">
			{{timeYear}}年{{timeMonth}}月
		</view>
		<uni-table border stripe emptyText="暂无更多数据" style="width: 100%;">
			<!-- 表头行 -->
			<uni-tr>
				<uni-th align="center" width="10">一</uni-th>
				<uni-th align="center" width="10">二</uni-th>
				<uni-th align="center" width="10">三</uni-th>
				<uni-th align="center" width="10">四</uni-th>
				<uni-th align="center" width="10">五</uni-th>
				<uni-th align="center" width="10">六</uni-th>
				<uni-th align="center" width="10">七</uni-th>
			</uni-tr>
			<uni-tr v-for="(item,index) in dateList" :key="item[index]*index">
				<uni-th align="center" width="10">{{item[0]}}</uni-th>
				<uni-th align="center" width="10">{{item[1]}}</uni-th>
				<uni-th align="center" width="10">{{item[2]}}</uni-th>
				<uni-th align="center" width="10">{{item[3]}}</uni-th>
				<uni-th align="center" width="10">{{item[4]}}</uni-th>
				<uni-th align="center" width="10">{{item[5]}}</uni-th>
				<uni-th align="center" width="10">{{item[6]}}</uni-th>
			</uni-tr>
		</uni-table>
	</view>
</template>

<script>
	export default {
		name: "calendar",
		data() {
			return {
				timeYear: new Date().getFullYear(),
				timeMonth: new Date().getMonth() + 1,
				showCalendar: false,
				info: {
					lunar: true,
					range: true,
					insert: false,
					selected: []
				}
			};
		},
		computed: {
			dateList() {
				let date = []
				let day = new Date(`${this.timeYear}-${this.timeMonth}-01`).getDay() - 1; //获取当前月的第一天是星期几，如果日历是以周日开头的将减一去掉
				console.log(day, "liwei");
				let currentMonth = this.getDay(this.timeYear, this.timeMonth) //当前月的天数
				let preMonth = this.getDay(this.timeYear, this.timeMonth - 1) //前一个月的天数
				let nextMonth = this.getDay(this.timeYear, this.timeMonth + 1) //后一个月的天数
				let initVal = preMonth - day //起始值
				let line = this.getDateLine(currentMonth, day)
				for (let i = 0; i < line; i++) {
					let arr = []
					switch (i) {
						case 0:
							for (let j = 0; j < 7; j++) {
								if (initVal % preMonth > 0) {
									initVal++
									arr.push(initVal)
								} else {
									initVal = 1
									arr.push(initVal)
								}
							}
							break;
						case line - 1:
							for (let j = 0; j < 7; j++) {
								console.log(initVal);
								if (initVal % currentMonth > 0) {
									initVal++
									arr.push(initVal)
								} else {
									initVal = 1
									arr.push(initVal)

									// console.log(1);
									console.log(initVal);
								}
							};
							break;
						default:
							for (let j = 0; j < 7; j++) {
								arr.push(initVal)
								initVal++
							}
					}
					date.push(arr)
				}
				console.log(date);
				return date
			}
		},
		methods: {
			//判断是否是闰年
      		isLeapYear(year) {
            if (year % 4 === 0 && year % 100 !== 100 || year % 400 === 0) returntrue
            return false
       			 },
       	 //获取每个月的天数
       		getDay(year, month) {
            switch (month) {
                case 1:
                    return 31;
                case 2:
                    if (isLeapYear(year)) return 29
                    return 28;
                case 3:
                    return 31;
                case 4:
                    return 30;
                case 5:
                    return 31;
                case 6:
                    return 30;
                case 7:
                    return 31;
                case 8:
                    return 31;
                case 9:
                    return 30;
                case 10:
                    return 31;
                case 11:
                    return 30;
                case 12:
                    return 31;
            }
        },
            //判断当前月份日历的行数
      		getDateLine(monthDay, oneDay) {
            return Math.ceil((monthDay + oneDay) / 7)
        }
		}
	}
</script>

<style lang="scss">
	.index {
		font-size: 24rpx;

		.uni-table-th {
			font-size: 24rpx;
			color: black;
			padding: 6rpx 0;
		}
	}
</style>

~~~

*思路二*

~~~javascript
    //日历是从星期一
        let calendarList=[]//存放日期的数组
        let currentYear = new Date().getFullYear()//获取当前年份
        let currentMonth  = new Date().getMonth()//获取当前月份
        let day = new Date(currentYear,currentMonth,1).getDay()-1//获取当前月份第一天是星期几
        function creatCalendar(){
            for(let i = 1;true;i++){
                let calendar=new Date(currentYear,currentMonth,i)
                if(calendar.getMonth()!==currentMonth){
                    endDay=calendar.getDay()
                    break
                }
                calendarList.push(calendar)
            }
            insertBefpre()
            insertAfter()
        }
        //插入前一个月的
        function insertBefpre(){
            if(day===0) return 
            for(let i=0;i<day;i++){
                let calendar=new Date(currentYear,currentMonth,i)
                calendarList.unshift(calendar)
            }
        }
        //插入后一个月数据
        function insertAfter(){
            if(new Date(currentYear,currentMonth+1,1)===1)return 
            for(let i =1;true;i++){
                let calendar=new Date(currentYear,currentMonth+1,i)
                if(!calendar.getDay()){
                    calendarList.push(calendar)
                    break
                }
                calendarList.push(calendar)
            }
        }
        creatCalendar()
        console.log(calendarList)
~~~



