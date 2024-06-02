'use client';
import React, { createContext, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';

import themes from './themes';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  currentTheme,
  loadingState,
  modalState,
  modalTypeState,
  setModal,
  switchTheme,
  allInvites as allInvitesAction,
  deleteInvite as deleteInviteAction,
  createInvite as createInviteAction,
  updateInvite as updateInviteAction,
  allInvitesState,
  resetFormData,
  updateFormData,
  formDataState,
  editInviteIdState,
  setEditInviteId
} from '@/lib/features/app/appSlice';

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {
  const dispatch = useAppDispatch();

  const selectedTheme = useAppSelector(currentTheme);
  const modal = useAppSelector(modalState);
  const modalType = useAppSelector(modalTypeState);
  const isLoading = useAppSelector(loadingState);
  const invites = useAppSelector(allInvitesState);
  const editInviteId = useAppSelector(editInviteIdState);
  const formData = useSelector(formDataState);

  const theme = themes[selectedTheme];

  const changeTheme = () => {
    dispatch(switchTheme());
  };

  const openModal = type => {
    dispatch(setModal({ open: true, type }));
  };

  const closeModal = () => {
    dispatch(setModal({ open: false }));
  };

  const allInvites = async () => {
    await dispatch(allInvitesAction());
  };

  const deleteInvite = async id => {
    await dispatch(deleteInviteAction(id));
    allInvites();
  };

  const createInvite = async invite => {
    await dispatch(createInviteAction(invite));
    allInvites().then(() => {
      closeModal();
      resetForm();
    });
  };

  const updateInvite = async invite => {
    await dispatch(updateInviteAction(invite));
    allInvites().then(() => {
      closeModal();
      resetForm();
    });
  };

  const updateForm = (name, value) => {
    dispatch(updateFormData({ [name]: value }));
  };

  const setEditId = (id, invite) => {
    Object.keys(invite).forEach(key => {
      dispatch(updateFormData({ [key]: invite[key] }));
    });
    dispatch(setEditInviteId(id));
  };

  const resetForm = () => {
    dispatch(resetFormData());
  };

  const completedInvites = invites.filter(invite => invite.completed === true);
  const importantInvites = invites.filter(invite => invite.important === true);

  useEffect(() => {
    allInvites();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        theme,
        changeTheme,
        invites,
        deleteInvite,
        isLoading,
        completedInvites,
        importantInvites,
        updateInvite,
        createInvite,
        modal,
        modalType,
        openModal,
        closeModal,
        allInvites,
        formData,
        updateForm,
        resetForm,
        setEditId,
        editInviteId
      }}>
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
