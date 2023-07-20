import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

const initialState = {
  value: 0,
  userData: {},
  Image: '',
  status: 'idle',
  error: null,
};

export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (uid) => {
      const user = await firestore().collection('Information').doc(uid).get();
      if (user.exists) {
        const userData = user.data();
        //serializable value type datetime
        const { Birthday, ...rest } = userData;
        return {
          ...rest,
          Birthday: {
            seconds: Birthday.seconds,
            nanoseconds: Birthday.nanoseconds
          }
        };
      } else {
        throw new Error('Tài liệu không tồn tại!');
      }
    }
  );

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateNooodle: (state) => {
        state.value += 1;
    },
    updateCups: (state, action) => {
      state.userData.Cups += action.payload;
      action.payload=0;
    },
    setImage: (state, action) => {
        state.Image = action.payload;
    },
    initValue: (state, action) => {
      state.userData = {};
      state.Image = '';
      status = 'idle';
      error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userData = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {setUser, setImage, updateNooodle, initValue, updateCups } = userSlice.actions;

export default userSlice.reducer;