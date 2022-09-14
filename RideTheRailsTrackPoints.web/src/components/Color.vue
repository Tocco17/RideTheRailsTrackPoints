<!-- To have a colored pointer -->
<script>
export default {
	name: 'player',
	props: {
		//Color of the component
		color: {
			required: true,
			default: {
				name: '',
				hex: ''
			}
		},
		//How big it must be
		radius: {
			required: false,
			default: '30px'
		},
		//Check
		check: {
			type: Boolean,
			required: true,
			default: false
		}
	},
	data() {
		return {}
	},
	methods: {
		//When the div is clicked
		clicked() {
			this.$emit('colorClicked')
		}
	},
	computed: {
		//All style variables
		colorVariable() {
			return {
				'--color': this.color.hex,
				'--radius': this.radius,
				'--opacity': this.check ? 1 : 0.5
			}
		}

	}
}
</script>
    
<template>
	<div class="color" :style="colorVariable" @click="clicked">
	</div>
</template>
    
<style>
.color {
	width: var(--radius);
	height: var(--radius);
	background-color: var(--color);
	border-color: black;
	border-style: solid;
	border-width: 1px;
	border-radius: 100%;
	opacity: var(--opacity);
}
</style>