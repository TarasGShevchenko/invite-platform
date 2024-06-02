'use client';
import React from 'react';
import styled from 'styled-components';

import { useGlobalState } from '@/app/context/GlobalProvider';
import { Modal, CreateContent } from '../Modals';
import { Invite } from '../Invite';
import { add, moon, sun } from '@/app/utils/Icons';

export const Invites = ({ title, invites }) => {
  const { theme, changeTheme, openModal, modal } = useGlobalState();

  return (
    <InvitesStyled theme={theme}>
      {modal && <Modal content={<CreateContent />} />}
      <div className="top">
        <h1>{title}</h1>

        <button className="btn-rounded" onClick={changeTheme}>
          {theme.name === 'dark' ? sun : moon}
        </button>
      </div>

      <div className="invites grid">
        {invites.map(
          ({
            id,
            email,
            message,
            details,
            date,
            completed,
            important
          }) => (
            <Invite
              key={id}
              email={email}
              message={message}
              details={details}
              date={date}
              completed={completed}
              important={important}
              id={id}
            />
          )
        )}
        <button className="invite-task" onClick={() => openModal('create')}>
          {add}
          Add New Invite
        </button>
      </div>
    </InvitesStyled>
  );
};

const InvitesStyled = styled.main`
  position: relative;
  padding: 2rem;
  width: 100%;
  color: ${props => props.theme.colorTextLight};
  background-color: ${props => props.theme.colorBg2};
  border: 2px solid ${props => props.theme.borderColor};
  border-radius: 1rem;
  height: 100%;

  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .btn-rounded {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;

    background-color: ${props => props.theme.colorBg};
    border: 2px solid ${props => props.theme.borderColor};
    box-shadow: 0 3px 15px rgba(0, 0, 0, 0.3);
    color: ${props => props.theme.colorGrey2};
    font-size: 1.4rem;

    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px) {
    }
  }

  .invites {
    margin: 2rem 0;
  }

  > h1 {
    font-size: clamp(1.5rem, 2vw, 2rem);
    font-weight: 800;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 0;
      width: 3rem;
      height: 0.2rem;
      background-color: ${props => props.theme.colorPrimaryGreen};
      border-radius: 0.5rem;
    }
  }

  .invite-task {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    height: 16rem;
    color: ${props => props.theme.colorGrey2};
    font-weight: 600;
    cursor: pointer;
    border-radius: 1rem;
    border: 3px dashed ${props => props.theme.colorGrey5};
    transition: all 0.3s ease;

    i {
      font-size: 1.5rem;
      margin-right: 0.2rem;
    }

    &:hover {
      background-color: ${props => props.theme.colorGrey5};
      color: ${props => props.theme.colorGrey0};
    }
  }
  @media screen and (max-width: 768px) {
      padding: 1rem;
  }
`;
