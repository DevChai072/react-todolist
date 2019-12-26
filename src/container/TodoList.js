import React, { Component } from 'react';
import TodoListView from '../view/TodoListView';

export default class TodoList extends Component {
    state = {
        txtTodoList: "",
        itemTodoList: []
    }

    /**
     * function put value to state {newItemTodo}
     * dev Somchai O00085
     * parame {*} evt
     */
    handleChangeCreateInput = (evt) => {
        this.setState({txtTodoList: evt.target.value});
    }

    /**
     * function use event key and click to create new todo
     * dev Somchai O00085
     * parame {*} evt
     */
    handleKeyCreateInput = (evt) => {
        if (evt.keyCode === 13) {
            this.setState({txtTodoList: evt.target.value});
            this.createNewTodo();
        }
    }

    /**
     * function handle click
     * dev Somchai O00085
     */
    handleClickAddItem = () => {
        this.createNewTodo();
    }

    /**
     * function create new data to state {itemTodo}
     * dev Somchai O00085
     */
    createNewTodo = () => {
        const itemTodoList = this.state.itemTodoList;
        const txtTodoList = this.state.txtTodoList;

        const countArray = itemTodoList.length + 1;

        if (txtTodoList != "") {
            const prepareNewItem = {
                id: countArray,
                name: txtTodoList,
                isChecked: false,
                isUpdate: false,
                txtTodoUpdate: txtTodoList
            }

            itemTodoList.splice(countArray, 0, prepareNewItem);

            this.setState({
                txtTodoList: "",
                itemTodoList: itemTodoList
            });

        } else {
            alert("กรุณากรอกข้อมูล");
        }
    }

    /**
     * function click to edit todo
     * dev Somchai O00085
     * parame {*} id
     */
    handleClickEditTodo = (id) => {
        const itemTodoList = this.state.itemTodoList;
        const findItem = this.findItemArray(id, itemTodoList);
        const index = itemTodoList.indexOf(findItem);

        findItem.isUpdate = !findItem.isUpdate;
        // from use --->
        // if (findItem.isUpdate) {
        //     findItem.isUpdate = false;
        // } else {
        //     findItem.isUpdate = true;
        // }

        const newArray = this.replaceAt(itemTodoList, index, findItem);
        this.setState({itemTodoList: newArray});
    }

    /**
     * function update value to state {itemTodoList.txtTodoUpdate}
     * dev Somchai O00085
     * parame {*} id, evt
     */
    handleChangeUpdateInput = (id, evt) => {
        const itemTodoList = this.state.itemTodoList;
        const findItem = this.findItemArray(id, itemTodoList);
        const index = itemTodoList.indexOf(findItem);

        findItem.txtTodoUpdate = evt.target.value;

        const newArray = this.replaceAt(itemTodoList, index, findItem);
        this.setState({itemTodoList: newArray});
    }

    /**
     * function update value to state {itemTodoList.name} when key {enter}
     * dev Somchai O00085
     * parame {*} id, evt
     */
    handleKeyUpdateInput = (id, evt) => {
        const itemTodoList = this.state.itemTodoList;
        const findItem = this.findItemArray(id, itemTodoList);
        const index = itemTodoList.indexOf(findItem);

        if (evt.keyCode === 13) {
            findItem.isUpdate = !findItem.isUpdate;
            findItem.name = findItem.txtTodoUpdate;
        } 
        else if (evt.keyCode === 27) {
            findItem.isUpdate = !findItem.isUpdate;
        }

        const newArray = this.replaceAt(itemTodoList, index, findItem);
        this.setState({itemTodoList: newArray});
    }

    /**
     * function delete data from state {itemTodo}
     * dev Somchai O00085
     * parame {*} value
     */
    handleDeleteTodo = (id) => {
        if (window.confirm("ต้องการลบ Todo นี้ไช่หรือไม่ ?")) {
            const itemTodoList = this.state.itemTodoList;
            const findItem = this.findItemArray(id, itemTodoList);
            if (findItem) {
                const dataArray = itemTodoList.slice(0);
                const index = dataArray.indexOf(findItem);
                dataArray.splice(index, 1);
                this.setState({itemTodoList: dataArray});
            }
        }
    }

    /**
     * fonction click todo list is checked
     * dev Somchai O00085
     * parame {*} value
     */
    handleCheckedTodo = (id) => {
        const itemTodoList = this.state.itemTodoList;
        const findItem = this.findItemArray(id, itemTodoList);
        const index = itemTodoList.indexOf(findItem);

        findItem.isChecked = !findItem.isChecked;
        const newArray = this.replaceAt(itemTodoList, index, findItem);
        this.setState({itemTodoList: newArray});
    }

    /**
     * =================================================================
     * Re-use function
     * =================================================================
     */

    /**
     * function for find item is math in array {state itemTodo}
     * dev Somchai O00085
     * parame {*} id, array
     */
    findItemArray = (id, array) => {
        return array.find(item => item.id == id);
    }

    /**
     * function for replace data [change data in array]
     * dev Somchai O00085
     * parame {*} array, index, value
     */
    replaceAt = (array, index, value) => {
        const newArray = array.slice(0);
        newArray[index] = value;
        return newArray;
    }

    render() {

        const {txtTodoList, itemTodoList} = this.state;
        const sumTodo = itemTodoList.length;
        const countTodoChecked = itemTodoList.filter(data => data.isChecked).length;

        const propsState = {
            txtTodoList: txtTodoList,
            itemTodoList: itemTodoList,
            sumTodo: sumTodo,
            countTodoChecked: countTodoChecked
        }
        const propsEvent = {
            handleChangeCreateInput: this.handleChangeCreateInput,
            handleKeyCreateInput: this.handleKeyCreateInput,
            handleClickAddItem: this.handleClickAddItem,
            handleClickEditTodo: this.handleClickEditTodo,
            handleCheckedTodo: this.handleCheckedTodo,
            handleChangeUpdateInput: this.handleChangeUpdateInput,
            handleKeyUpdateInput: this.handleKeyUpdateInput,
            handleDeleteTodo: this.handleDeleteTodo
        }

        return (
            <TodoListView
                propsState={propsState}
                propsEvent={propsEvent}
            />
        )
    }
}