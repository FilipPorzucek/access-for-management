import { Task } from "../task/model/Task";

export type fetchingError = { status: number; message: string };


//idle - initial

type IdleState={
  state:'idle'
}
//loadking
type loadingState={
  state:'loading'
}
//succes
type succesState<T>={
  state:'succes',
  results:T[];
}
//error
type ErrorState={
  state:'error',
  error:fetchingError
}

export type ComponentListState<T>=IdleState | loadingState | succesState<Task>| ErrorState;