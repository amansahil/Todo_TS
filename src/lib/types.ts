import * as React from 'react'
import { Dispatch } from 'redux'

export type ComponentType = React.ComponentClass<any>
export type DispatchType = Dispatch<any>

export interface TaskType {
    key: string
    date: string
    done: boolean
    color: string
    text:  string
}