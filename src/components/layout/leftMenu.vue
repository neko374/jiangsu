<template>
	<div class="leftMenu" style="width: 213px">
		<ul id="leftMenu" @click="leftMenu($event)">
			<li
				v-for="(item, i) in menus"
				:key="i"
				:class="nowTitle == item.title ? 'curr' : ''"
			>
				<img
				:src="nowTitle == item.title ? item.imgCurr : item.img"
				style="pointer-events: none"
				/>{{ item.title }}
			</li>
		</ul>
		
		<slot name="icon"></slot>
		
	</div>
</template>

<script>
import $ from "jquery";
export default {
	name:"leftMenu",
	props: [
		"menus", 
		"index"
	],
	data() {
		return {
			nowTitle: "",
			indexMenu:0,
		};
	},
	mounted() {
		this.initNav();
		
	},
	methods: {
		leftMenu(e) {
			console.log(e.target);
			$(e.target).addClass("curr");
			$(e.target).siblings().removeClass("curr");
			this.nowTitle = e.target.innerText;
			this.$emit("now-title", e.target.innerText);
		},
		initNav(){
			// 判断路由后面的参数 决定左侧高亮显示的栏目
			if (this.index != 0 && this.index) {
				this.nowTitle = this.menus[this.index - 1].title;
				// console.log("index"+this.index)
			} else if (this.index == 0) {
				this.nowTitle = "";
			} else {
				this.nowTitle = this.menus[0].title;
			}
			// console.log(this.index)
		}
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
</style>
