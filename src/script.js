var todoItems = [];
todoItems.push({ index: 1, value: "Reading a book", done: true });
todoItems.push({ index: 2, value: "Family Time", done: true });
todoItems.push({ index: 3, value: "Sleep Early", done: true });

class TodoList extends React.Component {
    render() {
        var items = this.props.items.map((item, index) => {
            return (
                React.createElement(TodoListItem, { key: index, item: item, index: index, removeItem: this.props.removeItem, markTodoDone: this.props.markTodoDone }));

        });
        return (
            React.createElement("ul", { className: "list-group" }, " ", items, " "));

    }
}


class TodoListItem extends React.Component {
    constructor(props) {
        super(props);
        this.onClickClose = this.onClickClose.bind(this);
        this.onClickDone = this.onClickDone.bind(this);
    }
    onClickClose() {
        var index = parseInt(this.props.index);
        this.props.removeItem(index);
    }
    onClickDone() {
        var index = parseInt(this.props.index);
        this.props.markTodoDone(index);
    }
    render() {
        var todoClass = this.props.item.done ?
            "done" : "undone";
        return (
            React.createElement("li", { className: "list-group-item " },
                React.createElement("div", { className: todoClass },
                    React.createElement("span", { className: "glyphicon glyphicon-ok icon", "aria-hidden": "true", onClick: this.onClickDone }),
                    this.props.item.value,
                    React.createElement("button", { type: "button", className: "close", onClick: this.onClickClose }, "\xD7"))));



    }
}


class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        this.refs.itemName.focus();
    }
    onSubmit(event) {
        event.preventDefault();
        var newItemValue = this.refs.itemName.value;

        if (newItemValue) {
            this.props.addItem({ newItemValue });
            this.refs.form.reset();
        }
    }
    render() {
        return (
            React.createElement("form", { ref: "form", onSubmit: this.onSubmit, className: "form-inline" },
                React.createElement("input", { type: "text", ref: "itemName", className: "form-control", placeholder: "Add a new item to list." }),
                React.createElement("button", { type: "submit", className: "btn btn-default" }, "Good Job , Add New Task")));


    }
}


class TodoHeader extends React.Component {
    render() {
        return React.createElement("h3", null, "A simple List To Do Your Work ;)");
        React.createElement("br", null);
    }
}


class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.markTodoDone = this.markTodoDone.bind(this);
        this.state = { todoItems: todoItems };
    }
    addItem(todoItem) {
        todoItems.push({
            index: todoItems.length + 1,
            value: todoItem.newItemValue,
            done: false
        });

        this.setState({ todoItems: todoItems });
    }
    removeItem(itemIndex) {
        todoItems.splice(itemIndex, 1);
        this.setState({ todoItems: todoItems });
    }
    markTodoDone(itemIndex) {
        var todo = todoItems[itemIndex];
        todoItems.splice(itemIndex, 1);
        todo.done = !todo.done;
        todo.done ? todoItems.push(todo) : todoItems.push(todo);
        this.setState({ todoItems: todoItems });
    }
    render() {
        return (
            React.createElement("div", { id: "main" },
                React.createElement(TodoHeader, null),
                React.createElement(TodoList, { items: this.props.initItems, removeItem: this.removeItem, markTodoDone: this.markTodoDone }),
                React.createElement(TodoForm, { addItem: this.addItem })));


    }
}


ReactDOM.render(React.createElement(TodoApp, { initItems: todoItems }), document.getElementById('app'));