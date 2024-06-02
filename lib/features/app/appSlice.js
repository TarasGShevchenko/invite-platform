import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('theme') || 'dark';
  }
  return 'dark';
};

const initialState = {
  theme: getInitialTheme(),
  modal: false,
  modalType: 'create',
  invites: [],
  loading: false,
  formData: {
    message: '',
    details: '',
    email: '',
    date: '',
    completed: false,
    important: false
  },
  editInviteId: ''
};

export const allInvites = createAsyncThunk(
  'app/allInvites',
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get('/api/invites');
      return res.data.sort((a, b) => {
        return (
          new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime()
        );
      });
    } catch (error) {
      toast.error('Something went wrong');
      return rejectWithValue(error.response.data);
    }
  }
);

export const createInvite = createAsyncThunk(
  'app/createInvite',
  async (invite, { rejectWithValue }) => {
    try {
      await axios.post(`/api/invites`, invite);
      toast.success('Invite created successfully.');
    } catch (error) {
      toast.error('Something went wrong');
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateInvite = createAsyncThunk(
  'app/updateInvite',
  async (invite, { rejectWithValue }) => {
    try {
      await axios.put(`/api/invites`, invite);
      toast.success('Invite updated');
    } catch (error) {
      toast.error('Something went wrong');
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteInvite = createAsyncThunk(
  'app/deleteInvite',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/invites/${id}`);
      toast.success('Invite deleted');
    } catch (error) {
      toast.error('Something went wrong');
      return rejectWithValue(error.response.data);
    }
  }
);

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: create => ({
    switchTheme: create.reducer(state => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', state.theme);
    }),
    setModal: create.reducer((state, { payload: { open, type } }) => {
      state.modal = open;
      type && (state.modalType = type);
    }),
    updateFormData: (state, { payload }) => {
      state.formData = { ...state.formData, ...payload };
    },
    resetFormData: state => {
      state.formData = initialState.formData;
    },
    setEditInviteId: (state, { payload }) => {
      state.editInviteId = payload;
    }
  }),
  extraReducers: builder => {
    builder
      .addCase(allInvites.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(allInvites.fulfilled, (state, action) => {
        state.loading = false;
        state.invites = action.payload;
      })
      .addCase(createInvite.pending, state => {
        state.loading = true;
      })
      .addCase(createInvite.fulfilled, state => {
        state.loading = false;
      })
      .addCase(updateInvite.pending, state => {
        state.loading = true;
      })
      .addCase(updateInvite.fulfilled, state => {
        state.loading = false;
        state.editInviteId = '';
      })
      .addCase(deleteInvite.pending, state => {
        state.loading = true;
      })
      .addCase(deleteInvite.fulfilled, state => {
        state.loading = false;
      });
  },
  selectors: {
    currentTheme: state => state.theme,
    modalState: state => state.modal,
    modalTypeState: state => state.modalType,
    loadingState: state => state.loading,
    allInvitesState: state => state.invites,
    formDataState: state => state.formData,
    editInviteIdState: state => state.editInviteId
  }
});

export const {
  switchTheme,
  setModal,
  updateFormData,
  resetFormData,
  setEditInviteId
} = appSlice.actions;

export const {
  currentTheme,
  modalState,
  modalTypeState,
  loadingState,
  allInvitesState,
  formDataState,
  editInviteIdState
} = appSlice.selectors;
