import React, { Component } from 'react'

export default class TodoListView extends Component {
    render() {

        const {txtTodoList, itemTodoList, sumTodo, countTodoChecked} = this.props.propsState;

        const {
            handleChangeCreateInput, 
            handleKeyCreateInput,
            handleClickAddItem,
            handleChangeUpdateInput,
            handleKeyUpdateInput, 
            handleCheckedTodo, 
            handleClickEditTodo,
            handleDeleteTodo
        } = this.props.propsEvent;

        return (
            <div className="container">
                <div className="border-box">
                    <div className="content-box">
                        <h1 className="left">TODO</h1>
                        <h1 className="right">{countTodoChecked}/{sumTodo}</h1>
                    </div>
                </div>
                <div className="border-box">
                    <div className="content-box">
                        <input type="text" id="txtTodoName" className="left"
                            onChange={(evt) => handleChangeCreateInput(evt)}
                            onKeyDown={(evt) => handleKeyCreateInput(evt)}
                            value={txtTodoList}
                        />
                        <button id="btnAdd" className="right" onClick={() => handleClickAddItem()}>Add</button>
                    </div>
                    <div className="content-box">
                        <ul className="listGroup">
                            {itemTodoList.map(item => {
                                let isHide = item.isChecked ? "isHide" : "";
                                let divItem = null;
                                if(item.isUpdate) {
                                    divItem = (
                                        <div key={item.id} className="left listName">
                                            <input type="text" id="txtTodoEdit"
                                                onChange={(evt) => handleChangeUpdateInput(item.id, evt)}
                                                onKeyUp={(evt) => handleKeyUpdateInput(item.id, evt)}
                                                value={item.txtTodoUpdate}/>
                                        </div>
                                    )
                                } else {
                                    let wordStyle = item.isChecked ? "upgradeWord" : "originalWord";
                                    divItem = (
                                        <div key={item.id} className="left listName" onClick={() => handleCheckedTodo(item.id)}>
                                            <span className={wordStyle}>{item.name}</span>
                                        </div>
                                    )
                                }
                                return (
                                    <li key={item.id} className={isHide}>
                                        {divItem}
                                        <div className="right listAction">
                                            <button id="btnEdit" className="btn" onClick={() => handleClickEditTodo(item.id)}>Edit</button>
                                            <button id="btnDel" className="btn" onClick={() => handleDeleteTodo(item.id)}>Delete</button>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}