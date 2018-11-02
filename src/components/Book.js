import React from "react";
import ToggleInfo from "./partials/Toggle-Info";
import Toggle from "./partials/Toggle";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { FaArrowCircleUp } from "react-icons/fa";
import { changeVote } from "../actions/Votes";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";
import Comments from "./Comments";
import { Nuggets } from "./Nuggets";

export class Book extends React.Component {
  upVote = event => {
    const bookId = event.currentTarget.id;
    const voteAction = {};
    voteAction.voteAction = "up";
    this.props.dispatch(changeVote(bookId, voteAction));
  };
  downVote = event => {
    const bookId = event.currentTarget.id;
    const voteAction = {};
    voteAction.voteAction = "down";
    this.props.dispatch(changeVote(bookId, voteAction));
  };

  render() {
    const { book } = this.props;
    console.log("book", book);
    // console.log("this.props", this.props);
    // console.log("book", book);
    const {
      title,
      author,
      subtitle,
      id,
      image,
      votes,
      description,
      nuggets
    } = this.props.book;
    console.log("image", image);
    let nuggetsDisplay, toggleInfo;
    if (this.props.book.nuggets) {
      nuggetsDisplay = <Nuggets nuggets={nuggets} />;
    }
    if (this.props.description !== "") {
      toggleInfo = <ToggleInfo info={description} />;
    }

    return (
      <div className="book" onClick={this.props.onClick}>
        <h4>{title}</h4>
        <h6>{subtitle}</h6>
        <h6>{author}</h6>
        {votes}
        <span onClick={e => this.upVote(e)} ref="btn" id={id}>
          <FaThumbsUp id={id} />
        </span>
        <span onClick={e => this.downVote(e)} ref="btn" id={id}>
          <FaThumbsDown id={id} />
        </span>
        {toggleInfo}

        <img className="book-image" src={image} id={id} />
        <ul>{nuggetsDisplay}</ul>
        <Toggle>
          {({ on, toggle }) => (
            <div>
              {!on && <a onClick={toggle}>Comments</a>}
              {on && (
                <div>
                  <FaArrowCircleUp onClick={toggle} />

                  <Comments book={this.props.book} />
                </div>
              )}
            </div>
          )}
        </Toggle>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default withRouter(connect(mapStateToProps)(Book));
