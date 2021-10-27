<template>
	<div class="all">
		<div id="lines" class="echarts" v-bind:style="{height: height}"></div>
	</div>
</template>
<script>
	export default {
		/**
		 * 接收需要配置的选项
		 */
		props: {
			//以数组的形式，接收柱状数据，每组数据有name和value,value是一个数组
			linedatas: {
				type: Array,
				required: true
			},
			//指定图表的高度
			height: {
				type: String,
				required: false,
				default: "100%"
            },
            //指定图表的高度
			linelabel: {
				type: Array,
				required: true
			}
		},
		data: function() {
			return {
				myChart: {},
				series: [],
				legenddata: [],
				itemgap: 70,
				selected: {}
			}
		},
		mounted: function() {
			var info = this;
			this.$nextTick(function() {
				this.myChart = echarts.init(document.getElementById('lines'));
				info.initChart();
			});
		},
		methods: {
			initChart() {
                var info = this;
                for(var i=0; i<this.linedatas.length; i++){
                    this.series.push(this.linedatas[i].name);
                }

				let option = {
                    tooltip: {
						trigger: 'axis',
						transitionDuration: 0
                    },
                    legend: {
                        data: this.series,
                        icon : 'circle',//图例的形状
						itemWidth: 8,//图例的宽
						 textStyle:{//图例文字的样式
							color:'#444444',
							fontSize: 13
                        },
                        show: false
                    },
                    grid: {
                        left: '4%',
                        right: '10%',
						bottom: '10%',
						top: '14%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: this.linelabel,
                        axisLine: {
                            lineStyle: {
								color: "#6c6c6c"
                            }
                        },
                        splitLine: {
                            lineStyle: {
								color: "#6c6c6c",
								type: "dashed"
                            }
                        },
                        axisLabel: {
                            fontSize: 12,
                            color:"#000000",
							interval: 0,
							margin: 16
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: "#6c6c6c",
                            }
                        },
                        splitLine: {
                            lineStyle: {
                                color: "#6c6c6c",
                                type: "dashed"
                            }
                        },
                        axisLabel: {
                            fontSize: 14,
                            color:"#444444"
                        }
                    },
                    series: this.linedatas
				};

				info.myChart.setOption(option, {
					notMerge: true
				});
				info.$emit("callback", this.myChart);
			}
		},
		watch: {
			forceupdate: function(newval, oldval) {
				this.initChart();
			}
		}
	}
</script>
<style scoped >
	.all {
		width: 100%;
		height: 100%;
		position: relative;
		
	}
	.all .echarts {
			width: 100%;
			height: 100%;
		}
</style>