<template>
	<div class="all">
		<div class="detail-page-content">
			<div :id="ids" class="echarts" v-bind:style="{height: height+'px'}">
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		/**
		 * 接收需要配置的选项
		 */
		props: {
			//以数组的形式，接收柱状数据，每组数据有name和value,value是一个数组
			treedatas: {
				type: Object,
				required: true
			},
			//指定图表的高度
			height: {
				type: Number,
				required: false,
				default: 700
			},
			ids: {
				type: String,
				required: false,
				default: "tree"
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
				this.myChart = echarts.init(document.getElementById(this.ids));
				info.initChart();
			});
		},
		methods: {
			initChart() {
                var info = this;
				let option = {
                    series: [
                        {
                            type: 'tree',
                            data: [this.treedatas],
                            nodePadding: 20,
                            top: '20px',
                            left: '20%',
                            bottom: '20px',
                            right: '20%',
                            symbolSize: 14,

                            label: {
                                position: 'left',
                                verticalAlign: 'middle',
                                align: 'right',
                                fontSize: 14
                            },

                            leaves: {
                                label: {
                                    position: 'right',
                                    verticalAlign: 'middle',
                                    align: 'left'
                                }
                            },
							initialTreeDepth: 3, //默认开到第几层
                            expandAndCollapse: true,
                            animationDuration: 550,
                            animationDurationUpdate: 750
                        }
                    ]
				};

				info.myChart.setOption(option, {
					notMerge: true
				});
				
				// 添加点击事件
				info.myChart.off("click");
                info.myChart.on('click', function(params) {
                    if(params.data){
						info.$emit("resetDatas", params.data);
                    }
                });
			},
			resize(){
				this.myChart.resize();
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
		position: relative;
		
	}
	.all .echarts {
			width: 100%;
		}
	.all	.download {
			position: absolute;
			right: 20px;
			cursor: pointer;
			z-index: 1;
		}
</style>