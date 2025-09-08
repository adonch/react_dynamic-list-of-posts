import React, { useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type UserSelectorProps = {
  users: User[];
  setSelectedUserId: (id: number) => void;
  selectedUserId: number | null;
  setLoading: (isLoading: boolean) => void;
};

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  setSelectedUserId,
  selectedUserId,
  setLoading,
}) => {
  const [isActive, setIsActive] = useState(false);

  function toggleDropdown() {
    setIsActive(!isActive);
  }
  function handleUserSelect(id: number) {
    setSelectedUserId(id);
    setIsActive(false);
    setLoading(true);
  }
  const selectedUser = users.find(user => user.id === selectedUserId) || null;
  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isActive })}
      onClick={toggleDropdown}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className="dropdown-item"
              onClick={() => handleUserSelect(user.id)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
