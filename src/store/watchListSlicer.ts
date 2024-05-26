import {
    PayloadAction,
    createSlice
} from '@reduxjs/toolkit';

interface WatchListItem {
    id: string;
    title: string;
    year: string;
    image: string;
}

interface RootWatchListItem {
    [key: string]: WatchListItem[];
}

interface WatchListState {
    watchList: RootWatchListItem;
    selectedList: string | null;
}
const loginData = localStorage.getItem('email');
let data;
if (loginData) {
    data = localStorage.getItem(`${loginData}-watchList`);
}

const initialState: WatchListState = {
    watchList: {},
    selectedList: null
};

if (data) {
    initialState.watchList = JSON.parse(data);
}

const watchListSlice = createSlice({
    name: 'watchList',
    initialState,
    reducers: {
        addMovie: (state, action: PayloadAction<{listName: string, watchList: WatchListItem, email: string}>) => {
            if (!state.watchList[action.payload.listName]) {
                state.watchList[action.payload.listName] = [];
            }
            state.watchList[action.payload.listName].push(action.payload.watchList);

            localStorage.setItem(`${action.payload.email}-watchList`, JSON.stringify(state.watchList));

        },
        removeMovie: (state, action: PayloadAction<string>) => {
            const keys = Object.keys(state.watchList);
            for (let i = 0; i < keys.length; i++) {
                state.watchList[keys[i]] = state.watchList[keys[i]].filter(movie => movie.id !== action.payload);
                if (state.watchList[keys[i]]?.length === 0) {
                    delete state.watchList[keys[i]]
                    if (state.selectedList === keys[i]) {
                        state.selectedList = null;
                    }
                }
            }
            localStorage.setItem(`${loginData}-watchList`, JSON.stringify(state.watchList));
        },
        updateFromLocalStorage: (state) => {
            const email = localStorage.getItem('email');
            const data = localStorage.getItem(`${email}-watchList`);
            if (data) {
                state.watchList = JSON.parse(data);
            }else{
                state.watchList = {};
            }
        },
        selectList: (state, action: PayloadAction<string | null>) => {
            state.selectedList = action.payload;
        },
    },
});

export const { addMovie, removeMovie, updateFromLocalStorage, selectList } = watchListSlice.actions;
export type { WatchListItem, RootWatchListItem };
export default watchListSlice.reducer;

