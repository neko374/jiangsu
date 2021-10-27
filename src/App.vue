<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>
<script>
export default {
  methods:{
    saveData(val){
       //在页面加载时读取sessionStorage里的状态信息
      if (localStorage.getItem(val)) {
        this.$store.replaceState(
          Object.assign(
            {},
            this.$store.state,
            JSON.parse(localStorage.getItem(val))
          )
        );
      }
      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload", () => {
        localStorage.setItem(val, "");
        localStorage.setItem(val, JSON.stringify(this.$store.state));
      });
    },
  },
	beforeCreated() {
    console.log("123");
    this.saveData('loginData');
    //this.saveData('isLogin');
  },
  mounted(){
   
  },
  watch:{
    //window
  }
}
</script>
<style >
	#app {
		width: 100%;
	height: 100%;
		overflow-x: hidden;
		
	}
	
</style>
