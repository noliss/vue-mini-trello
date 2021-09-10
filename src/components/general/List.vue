<template lang="pug">
	.lists-item
		.lists-item__action_delete(@click="deleteList")
		.lists-item__title
			| {{boardLists.title}}
		draggable.lists-item__column(group="tasks" :list="boardLists.fullList" @change="swapRows")
			li.lists-item__row(
				v-for="flist in boardLists.fullList"
				@click="disableRow({listId: boardLists.id, rowId: flist.id, complete: flist.complete})" 
				:class="{'lists-item__row_completed':flist.complete}"
			)
				| {{flist.title}}
		.lists-item__add
			input.lists-item__add-action(
				v-model="newPoint.title"
				placeholder="Новый пункт" 
				v-on:keyup.enter="addRowInList(boardLists.id)"
					)
</template>

<script>
import draggable from 'vuedraggable'
import { mapActions } from 'vuex'
export default {
	name: "List",
	props: ["boardLists"],
	components: { draggable },
	data() {
		return {
			newPoint: {
				title: "",
				complete: false
			},
		}
	},
	methods: {
		...mapActions(["toggleRowInList", "addPointInList", "deleteListInBoard", "swapRowInLists"]),
		disableRow(listData) {
			this.toggleRowInList(listData)
		},
		addRowInList(listId) {
			if (this.newPoint.title.length > 0) { 
				this.addPointInList({title: this.newPoint.title, listId})
				this.newPoint.title = ""
			}
		},
		deleteList() {
			this.deleteListInBoard(this.boardLists.id)
		},
		swapRows() {
			this.$emit('updateBoard')
		}
	}
}
</script>

<style lang="scss" scoped>
	.lists {
		&-item {
			position: relative;
			width: 270px;
			background-color: #428bca;
			color: #fff;
			margin-right: 30px;
			margin-bottom: 25px;

			&__action {
				&_delete {
					position: absolute;
					right: 0px;
					top: 10px;
					width: 20px;
					height: 20px;
					opacity: 0.3;
					cursor: pointer;

					&:hover {
						opacity: 1;
					}

					&::before, 
					&::after {
						position: absolute;
						content: ' ';
						height: 20px;
						width: 2px;
						background-color: #333;
					}

					&::before {
						transform: rotate(45deg);
					}

					&::after {
						transform: rotate(-45deg);
					}
				}
			}

			&:nth-child(3n) {
				margin-right: 0px;
			}

			&__title {
				text-align: center;
				padding: 10px 0;
			}

			&__column {
				padding: 0px 15px;
			}

			&__row {
				padding: 5px 0px;
				border-bottom: 1px solid rgba(0, 0, 0, 0.2);
				cursor: pointer;

				&:hover {
					box-shadow: 0px 0px 8px 2px rgba(255, 255, 255, 0.2) inset;
				}

				&:last-child {
					border-bottom: none;
				}

				&_completed {
					text-decoration: line-through;
				}
			}

			&__add {
				text-align: center;
				padding: 15px;

				&-action {
					width: 100%;
					outline: none;
					text-align: center;
				}
			}
		}
	}
</style>