import Thought from "../../domain/viewModel/Thought";
import User from "../../domain/viewModel/User";
import * as firebase from "firebase";
import {Dispatch} from "redux";
import * as moment from 'moment';

export const ADD_THOUGHT: string = 'ADD_THOUGHT';
export const REMOVE_THOUGHT: string = 'REMOVE_THOUGHT';
export const GET_THOUGHTS: string = 'GET_THOUGHTS';

export interface IAddThought {
    type: string,
    thought: Thought
}


export interface IRemoveThought {
    type: string,
    id: string
}

export const addThought = (thought: Thought): any =>
    async (dispatch: Dispatch, getState: any) => {
        const {user} = getState();
        const updates = {};
        const date = moment(thought.timestamp).format('DD-MM-YYYY');
        updates[`/thoughts/${user.id}/${date}/${thought.id}`] = thought;
        try {
            dispatch({
                type: ADD_THOUGHT,
                thought
            });
            await firebase.database().ref().update(updates);
        } catch (error) {
            console.log(error);
        }
    };

export const getThoughts = (date: Date = new Date()): any =>
    async (dispatch: Dispatch, getState: any) => {
        const {user} = getState();
        const formattedDate = moment(date).format('DD-MM-YYYY');
        try {
            const snapshot = await firebase.database().ref(`/thoughts/${user.id}/${formattedDate}`).once('value');
            const thoughts = snapshot.val();
            for (const thoughtId in thoughts) {
                if (thoughts.hasOwnProperty(thoughtId)) {
                    dispatch({
                        type: ADD_THOUGHT,
                        thought: thoughts[thoughtId]
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };


export const removeThought = (id: string): any =>
    async (dispatch: Dispatch, getState: any) => {
        const {user} = getState();
        // fix date here or only thoughts from today can be deleted
        const formattedDate = moment(new Date()).format('DD-MM-YYYY');
        try {
            dispatch({
                type: REMOVE_THOUGHT,
                id
            });
            await firebase.database().ref(`/thoughts/${user.id}/${formattedDate}`).child(id).remove();
        } catch (error) {
            console.log(error);
        }
    };
