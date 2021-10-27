<template>
    <div class="maps">
        <div :id="ids" class="echarts" v-bind:style="{height: height}"></div>
    </div>
</template>

<script>
    // import nanjings from '../../assets/maps/nanjing.json'
    // import changzhous from '../../assets/maps/changzhou.json'
    // import huaians from '../../assets/maps/huaian.json'
    // import nantongs from '../../assets/maps/nantong.json'
    // import suqians from '../../assets/maps/suqian.json'
    // import taizhous from '../../assets/maps/taizhou.json'
    // import wuxis from '../../assets/maps/wuxi.json'
    // import xuzhous from '../../assets/maps/xuzhou.json'
    // import yanchens from '../../assets/maps/yanchen.json'
    // import yangzhous from '../../assets/maps/yangzhou.json'
    // import zhenjiangs from '../../assets/maps/zhenjiang.json'
    // import suzhous from '../../assets/maps/suzhou.json'
    // import lianyungangs from '../../assets/maps/lianyungang.json'

    export default {
    name: "maps",
    props: {
        // 多图标同页面注册
        ids: {
            type: String,
            required: false,
            default: "mapchart"
        },
        //指定图表的高度
        height: {
            type: String,
            required: false,
            default: "500px"
        },
        //以数组的形式，接收饼状图的数据，每组数据有name和value,value是一个数组
        datas: {
            type: Array,
        },
        //是否显示legend
        showlegend: {
            type: Boolean,
            required: false,
            default: false
        },
        //是否强制更新数据
        forceupdate: {
            type: Number,
            required: false,
            default: -1
        },
        area: {
            type: String,
            required: false,
            default: "jiangsu"
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.myChart = echarts.init(document.getElementById(this.ids));
            this.initCharts();
        });
    },
    data() {
        return {
            myChart: null,
            // initArea: {
            //     "nanjing": nanjings,
            //     "changzhou": changzhous,
            //     "huaian": huaians,
            //     "nantong": nantongs,
            //     "suqian": suqians,
            //     "taizhou": taizhous,
            //     "wuxi": wuxis,
            //     "xuzhou": xuzhous,
            //     "yanchen": yanchens,
            //     "yangzhou": yangzhous,
            //     "zhenjiang": zhenjiangs,
            //     "suzhou": suzhous,
            //     "lianyungang": lianyungangs
            // },
            rangeColor: ["#a5d4ff",'#010c1e'],
            seriesNames: "覆盖率",
            isshowVisualmap: true,
            maxNum: 1500,
            timeTicket: null
        };
    },
    methods: {
        initCharts(){
            var info = this;
            var currentMap = "江苏";
            var currentName = "江苏";
            var isshowVisualmap = true;
            var maxNum = 1000;
            // var rangeColor = ['#010c1e', "#a5d4ff"];
            var rangeColor = ["#a5d4ff",'#010c1e'];
            var seriesNames = "覆盖率";

            if(this.area != "jiangsu" && this.area != ''){
                maxNum = 1; // 区只存在入驻与非入驻 0或1
                isshowVisualmap = false;
                rangeColor = ['#6F92B5', '#101E32'];
                seriesNames = "入驻情况";

                currentMap = this.area;
                currentName = "current"+this.area;
                echarts.registerMap(currentName, this.initArea[this.area]); //加载自定义区的地图数据
            }else{
                maxNum = 100; // 区只存在入驻与非入驻 0或1
            }
        
            var option = {
                    tooltip: {
                        trigger: 'item',
                        showDelay: 0,
                        transitionDuration: 0.2,
                        formatter: function (params) {
                            var value = params.value;
                            if(params.seriesName == "入驻情况"){
                                value = value == 1?'已入驻':'未入驻';
                                return params.seriesName + '<br/>' + params.name + ': ' + value;
                            }else{
                                return params.seriesName + '<br/>' + params.name + ': ' + value+'%';
                            }
                            
                        }
                    },
                    visualMap: {
                        itemWidth: 20, //图形的宽度，即长条的宽度。
                        itemHeight: 90, //图形的高度，即长条的高度。
                        min: 0,
                        max: maxNum,
                        left: '4%',
                        // top: 'bottom',
                        bottom: '4%',
                        text: ['覆盖率100%','覆盖率0%'],//取值范围的文字
                        inRange: {
                            color: rangeColor //取值范围的颜色
                        },
                        show: isshowVisualmap, //图注,
                        type: 'continuous',
                        textStyle: {
							color: "#011f3c"
						},
                    },
                    geo: {
                        map: currentMap, //地图名字
						itemStyle: {
							normal: {
								// areaColor: '#00bdf6',
								// borderColor: '#00bdf6',
								// borderWidth: 4,
								// shadowColor: '#00bdf6',
								// shadowBlur: 50
							}
						},
						zoom: 1,
						silent: true
                    },
                    series: [
                        {
                            name: seriesNames,
                            type: 'map',
                            roam: false,
                            map: currentName, //自定义地图数据
                            // 文本位置修正
                            textFixed: {
                                Alaska: [20, -20]
                            },
                            data: this.datas,
                            silent: false,
                            itemStyle: {
                                normal: {
                                    areaColor: '#011f3c',
                                    borderColor: '#00bdf6',
                                    borderWidth: 1,
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: "#ffffff",
                                            fontSize: 14,
                                            fontWeight: 'bold'
                                        }
                                    }
                                },
                                emphasis: {
                                    // areaColor: '#E8B604',
                                    // borderColor: '#E8B604',
                                    areaColor: '#2A77EB',
                                    borderColor: '#2A77EB',
                                    // shadowBlur: 30,
                                    // shadowColor: '#E8B604',
                                    shadowColor: '#2A77EB',
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: "#ffffff",
                                            fontSize: 14,
                                        }
                                    },
                                }
                            },
                            
                        }
                    ]
            }

            info.myChart.setOption(option);
            info.$emit("callback", info.myChart);
        }
    },
    watch: {
        forceupdate: {
            handler: function() {
                this.initChart();
            },
            deep: true
        }
    },
    beforeDestroy() {
        
    },
 };
</script> 

<style  scoped="scoped">
    .maps{
        width: 100%;
        height: 100%;
        position: relative;
        
    }
    .maps .echarts{
            width: 100%;
        }
</style>