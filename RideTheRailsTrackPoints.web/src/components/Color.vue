<script>
export default {
	name: 'player',
	props: {
		color: {
			required: true,
			default: {
				name: '',
				hex: ''
			}
		},
		radius: {
			required: false,
			default: '30px'
		},
		check: {
			type: Boolean,
			required: true,
			default: false
		}
	},
	data() {
	},
	methods: {
		clicked() {
			this.$emit('colorClicked')
		}
	},
	computed: {
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