import classNames from 'classnames';
import { useState } from 'react';
import { CommentData } from '../types/Comment';

type NewCommentFormProps = {
  onCommentAdd: (commentData: CommentData) => Promise<void>;
  isAddingComment: boolean;
};

export const NewCommentForm: React.FC<NewCommentFormProps> = ({
  onCommentAdd,
  isAddingComment,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [bodyError, setBodyError] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameError('');
    setName(e.target.value);
    if (e.target.value.trim() === '') {
      setNameError('Name is required');
    }
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailError('');
    setEmail(e.target.value);
    if (e.target.value.trim() === '') {
      setEmailError('Email is required');
    }
  };
  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBodyError('');
    setBody(e.target.value);
    if (e.target.value.trim() === '') {
      setBodyError('Enter some text');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (name.trim() === '') {
      setNameError('Name is required');
      hasError = true;
    }

    if (email.trim() === '') {
      setEmailError('Email is required');
      hasError = true;
    }

    if (body.trim() === '') {
      setBodyError('Enter some text');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    onCommentAdd({ name, email, body }).then(() => {
      setBody('');
    });
  };

  const handleFromReset = () => {
    setName('');
    setEmail('');
    setBody('');
    setNameError('');
    setEmailError('');
    setBodyError('');
  };

  return (
    <form data-cy="NewCommentForm" onSubmit={handleSubmit}>
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': nameError })}
            value={name}
            onChange={handleNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>

          {nameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {nameError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': emailError })}
            value={email}
            onChange={handleEmailChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {emailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>

        {emailError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            placeholder="Type comment here"
            className={classNames('textarea', { 'is-danger': bodyError })}
            value={body}
            onChange={handleBodyChange}
          />
        </div>

        {bodyError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link ', {
              'is-loading': isAddingComment,
            })}
            disabled={isAddingComment}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button
            type="reset"
            className="button is-link is-light"
            onClick={handleFromReset}
          >
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};
