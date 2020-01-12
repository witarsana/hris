<template>
	<div>
		

		<button @click="selectTab(row.id)" 
			v-bind:key="row"
			v-for="row in content"
			:class="{'bg-gray-300':currentTab == row.id}"
			class="p-4 font-bold">{{row.title}}</button>
		

		<div 
			v-bind:key="row"
			v-for="row in content"
			>
			<template 
				v-if="currentTab == row.id" 
				class="bg-gray-100 p-8"
				>
				<h2>Some title here {{row.id}}</h2>
				<p>{{row.content}}
				</p>
			</template>
			
		</div>



	</div>
</template>

<script>
export default {
	props: {
		content: Array
	},
	data: function(){
		return{
			currentTab: 1	
		}		
	},
	methods:{
		selectTab(selectedTab){
			this.currentTab = selectedTab
		}
	}
}
</script>

<style>
	
</style>