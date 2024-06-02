'use client';
import React, {useCallback} from 'react';
import styled from 'styled-components';
import moment from 'moment/moment';

import { useGlobalState } from '@/app/context/GlobalProvider';
import { edit, trash } from '@/app/utils/Icons';
import { CreateContent, Modal } from '@/app/components/Modals';

export const Invite = ({
  email,
  message,
  details,
  date,
  completed,
  important,
  id
}) => {
  const {
    theme,
    deleteInvite,
    updateInvite,
    openModal,
    modal,
    setEditId
  } = useGlobalState();

  const handleUpdate = useCallback(e => {
    e.preventDefault();

    updateInvite({ id, completed: !completed });
  }, [id, completed]);

  const handleEdit = e => {
    e.preventDefault();
    setEditId(id, {
      email,
      message,
      details,
      date,
      completed,
      important
    });
    openModal('update');
  };

  const handleDelete = e => {
    e.preventDefault();
    deleteInvite(id);
  };

  return (
    <InviteStyled theme={theme}>
      {modal && <Modal content={<CreateContent />} />}
      <h1>{message}</h1>
      <p>{details}</p>
      <p>{email}</p>
      <p className="date">{moment(date).format('DD/MM/YYYY')}</p>
      <div className="invite-footer">
        {completed ? (
          <button className="completed" onClick={handleUpdate}>
            Completed
          </button>
        ) : (
          <button className="incomplete" onClick={handleUpdate}>
            Incomplete
          </button>
        )}
        <button className="edit" onClick={handleEdit}>
          {edit}
        </button>
        <button className="delete" onClick={handleDelete}>
          {trash}
        </button>
      </div>
    </InviteStyled>
  );
};

const InviteStyled = styled.div`
  padding: 1.2rem 1rem;
  border-radius: 1rem;
  color: ${props => props.theme.colorTextLight};
  background-color: ${props => props.theme.colorBg};
  box-shadow: ${props => props.theme.shadow7};
  border: 2px solid ${props => props.theme.borderColor};

  height: 16rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .date {
    margin-top: auto;
  }

  > h1 {
    font-size: 1.5rem;
    font-weight: 600;
  }

  .invite-footer {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    button {
      border: none;
      outline: none;
      cursor: pointer;

      i {
        font-size: 1.4rem;
        color: ${props => props.theme.colorGrey2};
      }
    }

    .edit {
      margin-left: auto;
    }

    .completed,
    .incomplete {
      display: inline-block;
      padding: 0.4rem 1rem;
      background: ${props => props.theme.colorDanger};
      border-radius: 30px;
    }

    .completed {
      background: ${props => props.theme.colorGreenDark} !important;
    }
  }
`;
