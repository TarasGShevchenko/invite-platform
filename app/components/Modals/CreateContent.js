'use client';
import React from 'react';
import styled from 'styled-components';

import { useGlobalState } from '@/app/context/GlobalProvider';
import { Button } from '../Button';
import { add } from '@/app/utils/Icons';

export const CreateContent = () => {
  const {
    theme,
    modalType,
    createInvite,
    updateInvite,
    editInviteId,
    formData: { message, details, email, date, completed, important },
    updateForm,
  } = useGlobalState();

  const handleChange = name => e => {
    const value =
      name === 'completed' || name === 'important'
        ? e.target.checked
        : e.target.value;
    updateForm(name, value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const invite = {
      message,
      details,
      email,
      date,
      completed,
      important
    };
    switch (modalType) {
      case 'create':
        createInvite(invite);
        break;
      case 'update': {
        updateInvite({ id: editInviteId, ...invite });
        break;
      }
    }
  };

  return (
    <CreateContentStyled onSubmit={handleSubmit} theme={theme}>
      <h1>{`${modalType === 'create' ? 'Create' : 'Update'} a Invite`}</h1>
      <div className="input-control">
        <label htmlFor="message">Message</label>
        <input
          type="text"
          id="message"
          value={message}
          name="message"
          onChange={handleChange('message')}
          placeholder="e.g, Call to Bran Stark."
        />
      </div>
      <div className="input-control">
        <label htmlFor="details">Details</label>
        <textarea
          value={details}
          onChange={handleChange('details')}
          name="details"
          id="details"
          rows={2}
          placeholder="Type something..."></textarea>
      </div>
      <div className="input-control">
        <input
          type="text"
          id="email"
          value={email}
          name="email"
          onChange={handleChange('email')}
          placeholder="e.g, branstark@gmail.com"
        />
      </div>
      <div className="input-control">
        <label htmlFor="date">Date</label>
        <input
          value={date}
          onChange={handleChange('date')}
          type="date"
          name="date"
          id="date"
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="completed">Toggle Completed</label>
        <input
          checked={!!completed}
          onChange={handleChange('completed')}
          type="checkbox"
          name="completed"
          id="completed"
        />
      </div>
      <div className="input-control toggler">
        <label htmlFor="important">Toggle Important</label>
        <input
          checked={!!important}
          onChange={handleChange('important')}
          type="checkbox"
          name="important"
          id="important"
        />
      </div>
      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name={`${modalType === 'create' ? 'Create' : 'Update'} Invite`}
          icon={add}
          padding={'0.8rem 2rem'}
          borderRad={'0.8rem'}
          fw={'500'}
          fs={'1.2rem'}
          background={'rgb(0, 163, 255)'}
        />
      </div>
    </CreateContentStyled>
  );
};

const CreateContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  color: ${props => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;

    @media screen and (max-width: 450px) {
      margin: 1rem 0;
    }

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${props => props.theme.colorGrey3};
      }
    }

    input,
    textarea {
      width: 100%;
      padding: 1rem;

      resize: none;
      background-color: ${props => props.theme.colorGreyDark};
      color: ${props => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .submit-btn button {
    transition: all 0.35s ease-in-out;

    @media screen and (max-width: 500px) {
      font-size: 0.9rem !important;
      padding: 0.6rem 1rem !important;

      i {
        font-size: 1.2rem !important;
        margin-right: 0.5rem !important;
      }
    }

    i {
      color: ${props => props.theme.colorGrey0};
    }

    &:hover {
      background: ${props => props.theme.colorPrimaryGreen} !important;
      color: ${props => props.theme.colorTextLight} !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`;
