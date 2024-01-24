import {createSlice} from '@reduxjs/toolkit';
import strings from '../../../theme/constant/strings';

const initialState = {
  moviesData: [],
  version: {
    updateVersion: '1.0.0.1',
    isForceUpdate: false,
    isGenericUpdate: true,
    appPrivacyUrl: strings.appPrivacyUrl,
    appShareMessage: strings.appShareMessage,
    appUrl: strings.appUrl,
  },
};

const firebaseSlice = createSlice({
  name: 'firebase',
  initialState,
  reducers: {
    setVersion: (state, action) => {
      const {
        updateVersion,
        isForceUpdate,
        isGenericUpdate,
        appPrivacyUrl,
        appShareMessage,
        appUrl,
      } = action.payload;
      state.version.updateVersion = updateVersion;
      state.version.isForceUpdate = isForceUpdate;
      state.version.isGenericUpdate = isGenericUpdate;
      state.version.appPrivacyUrl = appPrivacyUrl;
      state.version.appShareMessage = appShareMessage;
      state.version.appUrl = appUrl;
    },
    setMoviesData: (state, action) => {
      state.moviesData = action.payload;
    },
  },
});

export const {setVersion, setMoviesData} = firebaseSlice.actions;
export default firebaseSlice.reducer;
