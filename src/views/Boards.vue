<template lang="pug">
	.container
		.board
			.board-gen
				.board-gen__up(@click="toggleCreator = !toggleCreator")
					| Создать новую доску +
				transition(name="fade")
					.board-gen__toggled(v-if="toggleCreator")
						.board-gen__title
							| Название доски
						input.board-gen__bname(placeholder="Моя доска" v-model="newBoard.title")
						.board-gen__actions
							.board-gen__actions_button.board-gen__actions_button-cancel(@click="cancelNewBoard")
								| Отмена
							.board-gen__actions_button(@click="createNewBoard")
								| Сохранить
			.board__boards
				.board__boards_title
					| Список досок:
				router-link(v-for="item in fullBoards" :to="boardPath(item)")
					board-element(:boptions="item")
</template>

<script>
import BoardElement from "@/components/elements/BoardElement"
import { mapActions, mapGetters } from 'vuex';
export default {
	name: "Boards",
	components: {
		BoardElement
	},
	data() {
		return {
			toggleCreator: false,
			newBoard: {
				title: "",
			}
		}
	},
	computed: {
		...mapGetters(["allBoards"]),
		fullBoards() {
			return this.allBoards
		},
	},
	methods: {
		...mapActions(["fetchBoardsData", "addBoards"]),
		createNewBoard() {
			if (this.newBoard.title.length > 0) {
				this.addBoards({ title: this.newBoard.title, lists: [], id: Date.now()})
				this.newBoard.title = ""
			}
		},
		cancelNewBoard() {
			this.newBoard.title = ""
			this.toggleCreator = false
		},
		boardPath(item) {
			return { path: `board/${item.id}` }
		}
	},
	mounted() {
		this.fetchBoardsData()
	},
}
</script>

<style lang="scss" scoped>
	.board {
		display: flex;
		justify-content: space-between;
		&-gen {
			&__up {
				padding: 8px 100px;
				color: #fff;
				border-color: #357ebd;
				background-color: #428bca;
				transition: 0.2s;
				cursor: pointer;

				&:hover {
					background-color: #6199ca;
				}
			}
			
			&__toggled {
				padding: 10px;
				border: 1px solid #428bca;
			}

			&__title {
				margin-bottom: 8px;
			}

			&__bname {
				outline: none;
			}

			&__actions {
				margin-top: 15px;
				display: flex;

				&_button {
					padding: 5px 13px;
					margin-right: 10px;
					background-color: #428bca;
					color: #fff;
					cursor: pointer;
					transition: 0.2s;

					&:hover {
						background-color: #6199ca;
					}
					
					&-cancel {
						background-color: #E32636;

						&:hover {
							background-color: #ee3343;
						}
					}
				}
			}
		}

		&__boards {
			width: 378px;

			&_title {
				background-color: #428bca;
				color: #fff;
				padding: 2px 7px;
			}
		}
	}
</style>