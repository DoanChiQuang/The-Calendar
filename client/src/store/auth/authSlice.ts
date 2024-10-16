import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import signinAction from '@/store/auth/actions/signin';
import { TAuth } from '@/store/auth/types/auth';

const initialState: TAuth = {
    loading: false,
    userInfo: {},
    error: '',
    success: false,
    isLogged: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.userInfo = {};
            state.isLogged = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signinAction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signinAction.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload.data.user;
                state.success = true;
                state.isLogged = true;
            })
            .addCase(
                signinAction.rejected,
                (state, action: PayloadAction<any>) => {
                    state.loading = false;
                    state.error = action.payload;
                    state.success = false;
                },
            );
    },
});

export default authSlice.reducer;
