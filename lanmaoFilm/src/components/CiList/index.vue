<template>            
    <div class="cinema_body">
        <Loading v-if="isLoading"></Loading>  
        <Scroller>
            <ul>
                <!-- <li>
                    <div>
                        <span>大地影院(澳东世纪店)</span>
                        <span class="q"><span class="price">22.9</span> 元起</span>
                        <div class="adress">
                            <span>金州区大连经济技术开发区澳东世纪3层</span>
                            <span>1763.5km</span>
                        </div>
                        <div class="card">
                            <div>小吃</div>
                            <div>折扣卡</div>
                        </div>
                    </div>
                </li>            -->
                <li v-if="cinemaList == ''">{{errMessge}}</li> 
                
                <li v-for="item in cinemaList" :key="item.id">
                    
                    <div>
                        <span>{{ item.nm}}</span>
                        <span class="q"><span class="price">{{ item.sellPrice }}</span> 元起</span>
                        <div class="adress">
                            <span>{{ item.addr}}</span>
                            <span>{{ item.distance }}</span>
                        </div>
                        <div class="card">
                            <div v-for="(num,key) in item.tag" :key="key" :class=" key | classCard" v-if="num===1">{{ key | formatCard }}</div>
                        </div>
                    </div>
                </li>   
            </ul>
        </Scroller>
    </div>   
</template>

<script>
export default {
    name : 'Clist',
    
    data(){        
        return {
            cinemaList : [],
            errMessge : '',
            isLoading : true,
            prevCityId : -1
        }
    },
    activated(){
         var cityId = this.$store.state.city.id;        
         console.log(cityId,this.$store.state.city.nm);
        if ( this.prevCityId === cityId ){ return; }
        this.isLoading = true;    
        this.axios.get('/api/cinemaList?cityId=' + cityId).then((res)=>{
        console.log(cityId,res);
            var msg = res.data.msg;
            var data = res.data.data;
            if(msg === 'ok'){               
                if(data.cinemas) {
                    this.cinemaList = data.cinemas;
                    this.isLoading = false; 
                    this.prevCityId = cityId; 
                }else{
                    this.errMessge = '暂无数据';
                    this.isLoading = false;
                    var newData = {
                        msg : 'ok',
                        status : 0,
                        data : {
                            cinemas : [
                                {
                                    id : 17158,
                                    mark : 0,
                                    nm : '(测试)JIA(嘉莱影城九亭店)',
                                    sellPrice : 18,
                                    addr : '松江区地铁九号线九亭站地铁二号口内(地下一层)',
                                    distance : '1071km',
                                    tag : {
                                        allowRefund : 1,
                                        buout : 0,
                                        cityCardTag : 0,
                                        deal : 0,
                                        endorse : 1,
                                        hallTypeWList : [],
                                        sell : 1,
                                        snack : 1,
                                        vipTag : '折扣卡'
                                    },
                                    promotion: {
                                        cardPromotinTag : '开卡特惠，首单2张立减10元'
                                    }
                                },
                                {
                                    id : 16620,
                                    mark : 0,
                                    nm : '星铁IMAX影城(九亭U天地旗舰店)',
                                    sellPrice : 18,
                                    addr : '松江区九亭镇蒲汇路178弄九亭U天地2楼',
                                    distance : '1071.2km',
                                    tag : {
                                        allowRefund : 1,
                                        buout : 0,
                                        cityCardTag : 0,
                                        deal : 0,
                                        endorse : 1,
                                        hallTypeWList : [],
                                        sell : 1,
                                        snack : 1,
                                        vipTag : '折扣卡'
                                    },
                                    promotion: {
                                        cardPromotinTag : '开卡特惠，首单2张立减10元'
                                    }
                                },{
                                    id : 17159,
                                    mark : 0,
                                    nm : '(测试2)JIA(嘉莱影城九亭店)',
                                    sellPrice : 18,
                                    addr : '松江区地铁九号线九亭站地铁二号口内(地下一层)',
                                    distance : '1071km',
                                    tag : {
                                        allowRefund : 1,
                                        buout : 0,
                                        cityCardTag : 0,
                                        deal : 0,
                                        endorse : 1,
                                        hallTypeWList : [],
                                        sell : 1,
                                        snack : 1,
                                        vipTag : '折扣卡'
                                    },
                                    promotion: {
                                        cardPromotinTag : '开卡特惠，首单2张立减10元'
                                    }
                                },
                                {
                                    id : 16621,
                                    mark : 0,
                                    nm : '星铁IMAX影城2(九亭U天地旗舰店)',
                                    sellPrice : 18,
                                    addr : '松江区九亭镇蒲汇路178弄九亭U天地2楼',
                                    distance : '1071.2km',
                                    tag : {
                                        allowRefund : 1,
                                        buout : 0,
                                        cityCardTag : 0,
                                        deal : 0,
                                        endorse : 1,
                                        hallTypeWList : [],
                                        sell : 1,
                                        snack : 1,
                                        vipTag : '折扣卡'
                                    },
                                    promotion: {
                                        cardPromotinTag : '开卡特惠，首单2张立减10元'
                                    }
                                },
                                {
                                    id : 16622,
                                    mark : 0,
                                    nm : '星铁IMAX影城2(九亭U天地旗舰店)',
                                    sellPrice : 18,
                                    addr : '松江区九亭镇蒲汇路178弄九亭U天地2楼',
                                    distance : '1071.2km',
                                    tag : {
                                        allowRefund : 1,
                                        buout : 0,
                                        cityCardTag : 0,
                                        deal : 0,
                                        endorse : 1,
                                        hallTypeWList : [],
                                        sell : 1,
                                        snack : 1,
                                        vipTag : '折扣卡'
                                    },
                                    promotion: {
                                        cardPromotinTag : '开卡特惠，首单2张立减10元'
                                    }
                                }


                            ]
                        }
                    }
                    this.cinemaList = newData.data.cinemas;
                }            
            }
            
        });  
    },
    filters : {
        formatCard(key){
            var card = [
                { key : 'allowRefund', value :　'改签' },
                { key : 'endorse' , value : '退' },
                { key : 'sell' , value : '折扣卡' },
                { key : 'snack' , value : '小吃' }            

            ];
            for(var i=0;i<card.length;i++){
                if(card[i].key === key){
                    return card[i].value;
                }
            }
            return '';
        },
        classCard(key){
            var card = [
                { key : 'allowRefund', value :　'bl' },
                { key : 'endorse' , value : 'bl' },
                { key : 'sell' , value : 'or' },
                { key : 'snack' , value : 'or' }            

            ];
            for(var i=0;i<card.length;i++){
                if(card[i].key === key){
                    return card[i].value;
                }
            }
            return '';

        }

    }

}
</script>

<style scoped>
#content .cinema_body{ flex:1; overflow: auto;}
.cinema_body ul{ margin: 0 12px; overflow: hidden;}
.cinema_body li{ border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color: #f03d07;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color: #666;}
.cinema_body .address span:nth-of-type(2){ float:right;}
.cinema_body .card{ display: flex;}
.cinema_body .card div{margin-right: 6px; padding:3px; height: 12px; line-height: 12px; font-size:12px; border-radius: 2px; color:#f90; border: 1px solid #f90;}
.cinema_body .card div.or{ color: #f90; border:1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>
