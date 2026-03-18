import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatSliceState {
  messages: ChatMessage[]
  draftInput: string
  isLoading: boolean
  streamingContent: string
}

const initialState: ChatSliceState = {
  messages: [],
  draftInput: '',
  isLoading: false,
  streamingContent: '',
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<ChatMessage>) {
      state.messages.push(action.payload)
    },
    setDraftInput(state, action: PayloadAction<string>) {
      state.draftInput = action.payload
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setStreamingContent(state, action: PayloadAction<string>) {
      state.streamingContent = action.payload
    },
    clearMessages(state) {
      state.messages = []
    },
  },
})

export const { addMessage, setDraftInput, setIsLoading, setStreamingContent, clearMessages } =
  chatSlice.actions

export default chatSlice.reducer
