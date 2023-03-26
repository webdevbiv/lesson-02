import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    items: [],
    isEditing: false,
    carrentTodo: {},

  }

  componentDidMount() {
    const localItems = JSON.parse(localStorage.getItem('items'));
    if (localItems) {
      this.setState({ items: localItems })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.items.length !== prevState.items) {
      localStorage.setItem('items', JSON.stringify(this.state.items))
    }
  }

  onSubmit = (text) => {
    console.log(text);
    const todo = { text, id: nanoid(4) }
    console.log(todo);
    this.setState(prev => ({ items: [todo, ...prev.items] }))
  }
  handleEdit = todo => {
    this.setState({ carrentTodo: { ...todo }, isEditing: true })
  }
  onDelete = (id) => {
    this.setState(prev => ({
      items: prev.items.filter(item => item.id !== id)
    }))
  }
  handleUpdateToDo = (e) => {
    e.preventDefault();
    const { carrentTodo } = this.state;
    this.setState((prev) => ({
      isEditing: false, items: prev.items.map(item => {
        if (item.id === carrentTodo.id) { return carrentTodo }
        return item
      })
    }))

  }
  handleChange = (e) => {
    this.setState({ carrentTodo: { ...this.state.carrentTodo, text: e.target.value } })

  }

  handleCancel = () => {
    this.setState({ isEditing: false })
  }
  render() {
    return (
      <>
        {this.state.isEditing ? <EditForm currentTodo={this.state.carrentTodo} onUpdate={this.handleUpdateToDo}
          onChange={this.handleChange} onCancel={this.handleCancel} /> : <SearchForm onSubmit={this.onSubmit} />}

        <Grid>
          {this.state.items.map((item, index) => {
            return <GridItem key={item.id}>
              <Todo id={item.id} text={item.text} counter={index + 1}
                onDelete={this.onDelete}
                onEdit={() => { this.handleEdit(item) }}
                disabled={this.state.isEditing}
              />
            </GridItem>
          })}


        </Grid>
      </>
    )

  }
}