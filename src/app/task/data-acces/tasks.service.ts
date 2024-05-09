import { response } from "express";
import { Task } from "../model/Task";
import { fetchingError } from "../../utils/list-state.type";
import { json } from "express";
import { Inject, Injectable } from "@angular/core";


const API_URL = 'https://apiforproject-a5613-default-rtdb.europe-west1.firebasedatabase.app/';

export type TaskPayload = { done?: boolean, name?: string };

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private URL = API_URL;

  async getAll(): Promise<Task[] | { status: number, message: string }> {
    console.log("tekst,",this.URL);
    return fetch(`${this.URL}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          return { status: response.status, message: response.statusText };
        }
      });

  }

  async update(taskId: number, payload: TaskPayload): Promise<Task | Error> {
    return fetch(`${this.URL}/${taskId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Can't update task");
        }
      });
  }
       
  async add(name: string): Promise<Task | Error> {
    const taskPayload: TaskPayload = { name, done: false };
    return fetch(`${this.URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskPayload),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Can't add task");
        }
      });
  }

  async delete(taskId: number): Promise<Error | undefined> {
    return fetch(`${this.URL}/${taskId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          return undefined;
        } else {
          throw new Error("Can't delete task");
        }
      });
  }
}
