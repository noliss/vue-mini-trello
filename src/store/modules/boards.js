import data from "./boardsData"
// из-за древовидной структуры данных получилось несколько вложенных циклов
// в идеале формировать данные сервера отдельно и связывать их на фронте :/
export default {
	actions: {
		async fetchBoardsData({commit}) {
			// Тут будем получать данные с сервера
			// const res = await fetch(api)
			commit('updateBoardsData', data)
		},
		async addBoards({dispatch}, newBoard) {
			// Отправляем данные на сервер и получае снова
			data.boards.push(newBoard)
			dispatch('fetchBoardsData', data)
		},
		takeBoard({commit}, boardId) {
			commit("selectedBoard", boardId)
		},
		async addListInBoard({state, dispatch}, newList) {
			// Добавили на сервер в доску новый лист
			data.boards.filter((e) => e.id === state.activeBoard[0].id)[0].lists.push({
				fullList: [],
				id: Date.now(),
				title: newList.title
			})
			// получае новые данные
			dispatch('fetchBoardsData', data)
		},
		async addPointInList({state, dispatch}, {title, listId}) {
			// Отправляем запрос на сервер для добавления нового пункта в лист
			data.boards.filter((e) => e.id === state.activeBoard[0].id)[0].lists
				.filter((x) => x.id === listId)[0].fullList.push({
					complete: false,
					id: Date.now(),
					title
				})
			dispatch('fetchBoardsData', data)
		},
		async toggleRowInList({state, dispatch}, {listId, rowId, complete}) {
			// Запрос на изменения состояния таска
			data.boards.filter((e) => e.id === state.activeBoard[0].id)[0].lists
				.filter((x) => x.id === listId)[0].fullList
				.filter((z) => z.id === rowId)[0].complete = !complete
			dispatch('fetchBoardsData', data)
		},
		async deleteListInBoard({state, dispatch}, listId) {
			// Запрос на удаление
			data.boards.filter((e) => e.id === state.activeBoard[0].id)[0].lists = 
			data.boards.filter((e) => e.id === state.activeBoard[0].id)[0].lists
				.filter((x) => x.id !== listId)
			dispatch('fetchBoardsData', data)
		},
		async updateListsInBoard({dispatch}, updatedBoard) {
			// Запрос на перенос таска в другой лист
			console.log("upd")
			data.boards.filter((e) => e.id === updatedBoard.id)[0] = updatedBoard
			dispatch('fetchBoardsData', data)
		}
	},
	state: {
		boards: [],
		activeBoard: {}
	},
	mutations: {
		updateBoardsData(state, { boards }) {
			state.boards = boards
		},
		selectedBoard(state, boardId) {
			state.activeBoard = state.boards.filter((element) => element.id === parseInt(boardId))
		}
	},
	getters: {
		allBoards(state) {
			return state.boards
		},
		activeBoard(state) {
			return state.activeBoard[0]
		}
	}
}