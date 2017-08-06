import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'

class SearchBarComp extends React.Component {
  constructor(){
    super();
    this.state = {
      query: '',
      selectBoxPopupContent: [
        {
          text: "Move to",
          select: "moveTo",
          disable: true,
        },
        {
          text: "Currently Reading",
          select: "currentlyReading",
          disable: false,
        },
        {
          text: "Want To Read",
          select: "wantToRead",
          disable: false,
        },
        {
          text: "Read",
          select: "read",
          disable: false,
        },
      ],
    }
  }

  updateQuery = (query) => {
    this.setState({
      query: query.trim(),
    })
    this.props.getSearchedBookListFn(query, this.props.bookList);
  }

  gotoUpdateShelfEvent = (shelf, book) => {
    this.props.updateBookShelfFn(shelf, book);
  }

  getCurrentBookShelfFn = (s_bookid, s_shelf) => {
    let myShelf = '';
      this.props.bookList.map(function (el) {
          if(el.id === s_bookid) {
            myShelf = el.shelf;
          }
      });
      return myShelf !== '' ? myShelf : s_shelf;
  }

  render() {
    const { searchedBookList } = this.props;
    const { selectBoxPopupContent, shelfSelected} = this.state;
    const { query } = this.state
    let filteredBookList = '';
    return (
    <div>
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search" />
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
      <div className="list-books">
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <div className="bookshelf-books">
                <ol className="books-grid">
                {searchedBookList && searchedBookList.length > 0 && searchedBookList.map((node,index) => (
                  <li key={index}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${node.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                          <select value={this.getCurrentBookShelfFn(node.id, node.shelf)} onChange={(event) => this.gotoUpdateShelfEvent(event.target.value, {id: node.id})} >
                            {selectBoxPopupContent.map((selectNode, selectIndex) => (
                              <option
                                key={selectNode.select}
                                value={selectNode.select}
                                disabled={selectNode.disable === true ? true : false}>
                              {selectNode.text}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{node.title}</div>
                    </div>
                  </li>
                ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search"  />
        </div>
      </div>
    </div>
    )
  }
}
export default SearchBarComp
