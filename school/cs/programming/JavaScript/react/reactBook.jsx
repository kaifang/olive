const Book = (props) => {
    return (
        <div style={{ margin: '1em' }}>
            <img width="75" src={props.avatar_url} />
            <div style={{ display: 'inline-block', marginLeft: 10 }}>
                <div style={{ fontSize: '1.25em', fontWeight: 'bold' }}>
                    {props.name}
                </div>
                <div>{props.company}</div>
            </div>
        </div>
    );
};

//Keys serve as a hint to React but they don’t get passed to your components.
//ie, component can read props.id, but not props.key
const BookList = (props) => {
    return (
        <div>
            {props.books.map(book => <Book key={book.id} {...book} />)}
        </div>
    );
};

class Form extends React.Component {
    state = { userName: '' }
    handleSubmit = (event) => {
        event.preventDefault();
        //console.log(this.userNameInput.value);
        console.log(this.state.userName);
        axios.get(`https://api.github.com/users/${this.state.userName}`)
            .then(resp => {
                this.props.onSubmit(resp.data);  // invoke the parent function
                this.setState({ userName: '' }); //clear the input field
            });
    };
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text"
                    //ref={(input) => this.useNameInput = input}
                    value={this.state.userName}
                    onChange={(event) => this.setState({ userName: event.target.value })}
                    placeholder="Github username" required />
                <button type="submit">Add book</button>
            </form>
        );
    }

}

class App extends React.Component {
    state = {
        books: []
    };

    addNewBook = (bookInfo) => {
        this.setState(prevState => ({
            books: prevState.books.concat(bookInfo)
        }));
    };

    render() {
        return (
            <div>
                <Form onSubmit={this.addNewBook} />
                <BookList books={this.state.books} />
            </div>
        );
    }
}

ReactDOM.render(<App />, mountNode);

    //we could do onClick on the button, but it's better to use form onSubmit
    //to take advantage of such as 'required' on the form field.

    //every react event function receives an event as argument.

    //could use getElementByID to get data from input, but react has a speical property ref
    //to get a reference, its function got executed when element was mounted, this function
    //receives a reference to this element, hence we can store it. But better do this
    // 1. add 'state', and 'value' attribute, which creating a controlled element.
    // 2. use onChange

    //child cannot change the state of parent, but can invoke a function which parent passed
    // to child through props
