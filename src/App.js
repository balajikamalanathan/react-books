import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBarComp from './SearchBarComp'
import BookListComp from './BookListComp'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        bookList: []
      };
      this.updateBookShelfFn = this.updateBookShelfFn.bind(this);
      this.getSearchedBookListFn = this.getSearchedBookListFn.bind(this);
  }

  componentDidMount() {
    this.getAllBooks();
  }

  getAllBooks = () => {
    BooksAPI.getAll().then((bookList) => {
      this.setState({bookList})
    })
  }

  updateBookShelfFn = (shelf, book) => {
    BooksAPI.update(book, shelf).then((updatedBookList) => {
      this.getAllBooks();
    })
  }

  getSearchedBookListFn = (query, bookList) => {
    BooksAPI.search(query, 100).then((searchedBookList) => {
      this.setState({
        searchedBookList: searchedBookList
      })
    })
  }
  render() {
    console.log(this.state.bookList);
    return (
      <div className="app" >
        <Route exact path="/" render={() => (
           <BookListComp
              bookList={this.state.bookList}
              updateBookShelfFn={this.updateBookShelfFn}
            />
        )} />
        <Route exact path="/search" render={() => (
           <SearchBarComp
            searchedBookList={this.state.searchedBookList}
            getSearchedBookListFn={this.getSearchedBookListFn}
            updateBookShelfFn={this.updateBookShelfFn}
            bookList={this.state.bookList}
            />
        )} />
      </div>
    )
  }
}

export default BooksApp
