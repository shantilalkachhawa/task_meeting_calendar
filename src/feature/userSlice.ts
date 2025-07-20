import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../redux/store'
import { dummyStudentsData } from '.'


export const fetchDummyUserAction = createAsyncThunk(
    'users/fetchUsersList',
    async () => {
        return dummyStudentsData
    },
)

interface UserState {
    userList: any[]
}
const initialState: UserState = {
    userList: []
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchDummyUserAction.fulfilled, (state, action) => {
            state.userList = action.payload
        })

    },
})

// Other code such as selectors can use the imported `RootState` type
export const selectUserList = (state: RootState) => state.users.userList

export default userSlice.reducer