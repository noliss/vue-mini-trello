<template lang="pug">
	.b-item
		.b-item__title
			| {{boptions.title}}
		.b-item__count
			| {{boptions.lists.length}}
</template>

<script>
export default {
	name: "BoardElement",
	props: {
		boptions: {
			type: Object,
			required: true,
		}
	},
}
</script>

<style lang="scss" scoped>
	.b-item {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #428bca;
		padding: 7px 7px;
		cursor: pointer;
		transition: 0.2s;

		&:hover {
			background-color: #428bca;
			color: #fff;
		}

		&__count {
			width: 40px;
			text-align: center;
		}
	}
</style>