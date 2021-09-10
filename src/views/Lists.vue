<template lang="pug">
	.lists
		.container
			.lists__board
				| {{board.title}}
			.lists__list
				list(v-for="list in board.lists" :boardLists="list" @updateBoard="updateBoard")
				.lists-new
					input.lists-new__title(v-model="newList.title")
					.lists__add(@click="listInBoard")
						| Добавить список
</template>

<script>
import List from "@/components/general/List"
import { mapActions, mapGetters } from "vuex"
export default {
	name: "Lists",
	components: { List },
	data() {
		return {
			newList: {
				title: []
			}
		}
	},
	computed: {
		...mapGetters(['allBoards', 'activeBoard']),
		board() {
			return this.activeBoard || {}
		}
	},
	methods: {
		...mapActions(["fetchBoardsData", "takeBoard", "addListInBoard", "updateListsInBoard"]),
		listInBoard() {
			if (this.newList.title.length > 0) {
				this.addListInBoard({title: this.newList.title})
				this.newList.title = ""
			}
		},
		updateBoard() {
			this.updateListsInBoard(this.board)
		}
	},
	mounted() {
		this.fetchBoardsData()
		this.takeBoard(this.$route.params.id)
	}
}
</script>

<style lang="scss" scoped>
	.lists {
		&__board, &__add {
			padding: 8px 100px;
			color: #fff;
			background-color: #428bca;
			transition: 0.2s;
			cursor: pointer;
			text-align: center;
		}

		&__list {
			display: flex;
			flex-wrap: wrap;
			margin-top: 25px;
		}

		&-new {
			width: 270px;

			&__title {
				width: 100%;
				height: auto;
				padding: 5px;
				outline: none;
			}
		}

		&__add {
			padding: 10px;
			margin-top: 5px;
		}
	}
</style>