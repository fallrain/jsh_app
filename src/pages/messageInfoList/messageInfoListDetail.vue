<template>
    <view class="massageDetail">
        <view class="massageDetail-infotitle">
            <text class="massageDetail-littleTitle">{{detail.littleTitle}}</text>
            <text class="massageDetail-title">{{detail.title}}</text>
        </view>
        <view class="massageDetail-info">
            <view class="massageDetail-infoTips"> {{detail.infoTips}}</view>
            <view class="massageDetail-border"></view>
            <view>
                <text class="massageDetail-time">{{detail.time}}</text>
                <text class="massageDetail-time massageDetail-delete">X 删除此消息</text>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    name: "messageInfoListDetail",
    data(){
        return {
            detail:[]
        }
    },
    methods:{
        findDetailById(id,item){
            this.detail= {
                id:id,
                littleTitle:item.littleTitle,
                title: item.title,
                time:item.time,
                info: '尊敬的客户您提报的整车订单，订单200021623445...',
                infoTips:"您好，您的自助建店单号:5285199,已经超过三天未缴纳押金请前往365RRS缴纳押金。",
                isNew: false
            }
        }
    },
    onLoad(option){
        let {id,item } = option
       
        this.findDetailById(id,JSON.parse(item))
        // console.log(option.id)
    }
}
</script>
<style lang="scss" scoped>
    .massageDetail{
        padding:24px;
        background:rgba(245,245,245,1);
        .massageDetail-littleTitle{
            display: inline-block;
            width:88px;
            height:32px;
            background:rgba(237,40,86,1);
            border-radius:17px;
            font-size:16px;
            font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(255,255,255,1);
            line-height:32px;
            margin:8px 26px 8px 10px;
            text-align:center;
        
        }
        .massageDetail-title{
            display: inline-block;
            width:272px;
            height:48px;
            font-size:34px;
            font-family:PingFangSC-Light,PingFang SC;
            font-weight:300;
            color:rgba(51,51,51,1);
            line-height:48px;
            
        }
        .massageDetail-info{
            width:702px;
            height:214px;
            background:rgba(255,255,255,1);
            border-radius:20px;
            padding:24px 24px 28px 24px;
            .massageDetail-infoTips{
                width:654px;
                height:80px;
                font-size:24px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(102,102,102,1);
                line-height:40px;
            }
            .massageDetail-border{
               border-bottom:1px solid #D8D8D8;
                margin-top:24px;
            }
            .massageDetail-time{   
                width:238px;
                height:34px;
                font-size:24px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(237,40,86,1);
                line-height:34px;
                margin-top:24px;
            }
            .massageDetail-delete{
                margin-left:272px;
            }
            
        }
        
    }
</style>