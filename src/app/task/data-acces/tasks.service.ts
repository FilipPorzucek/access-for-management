import { response } from "express";
import { Task } from "../model/Task";
import { fetchingError } from "../../utils/list-state.type";
import { json } from "express";
import { Inject, Injectable } from "@angular/core";

const URL="http://localhost:3006"; 


export type TaskPayload={done?:boolean,name?:string};

@Injectable({
  providedIn:"root",
})


export class TaskService{
  private URL="http://localhost:3006";
  async getAll(){
    return fetch(`${URL}/tasks`)
    .then<Task[] | fetchingError>((response)=>{
      if(response.ok){
        return response.json();
      }
      return{status:response.status, message: response.statusText}
    })}
    async update(taskId:number, payload:TaskPayload){
      return fetch(`${this.URL}/tasks/${taskId}`,{
        method:'PATCH',
        headers:{
          'Content-Type':'application/json',

        },
        body:JSON.stringify(payload),
      })
      .then<Task | Error>(response=>{
        if(response.ok){
          return response.json()
        }
        return new Error("Cant update task")
      })
    }
       
    async add(name:string)
    {
      return fetch(`${URL}/tasks`,{
      method:`POST`,
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify({
        createdAt:new Date().getTime(),
        name,
        done:false
      }as Task)
    }).then<Task | Error>(response=>{
      if(response.ok){
        return response.json()
      }
      return new Error('Cant add task');
    
    })

    ;}
  

  async delete(tasksId: number){
    return fetch(`${this.URL}/tasks/${tasksId} `,{
      method:'DELETE'
    }).then< Error|undefined>(response=>{
      if(response.ok){
        return response.json()
      }
      return new Error('Cant delete Task');
    
    })
  }


}






