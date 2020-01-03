import { createReducer, on } from '@ngrx/store'

import * as actions from './actions'
import { Transaction } from '@tezblock/interfaces/Transaction'
import { Baker } from '@tezblock/services/api/api.service'
import { TableState, getInitialTableState } from '@tezblock/domain/table'

const preprocessBakersData = (bakerData: any[]) =>
  bakerData.map(bakerDataItem => ({
    ...bakerDataItem,
    number_of_votes: bakerDataItem.staking_balance ? Math.floor(bakerDataItem.staking_balance / (8000 * 1000000)) : null
  }))

export interface State {
  doubleBakings: TableState<Transaction>
  doubleEndorsements: TableState<Transaction>
  activeBakers: {
    table: TableState<Baker>
    total: number
  }
}

const initialState: State = {
  doubleBakings: getInitialTableState(),
  doubleEndorsements: getInitialTableState(),
  activeBakers: {
    table: getInitialTableState(),
    total: undefined
  }
}

export const reducer = createReducer(
  initialState,
  on(actions.loadDoubleBakings, state => ({
    ...state,
    doubleBakings: {
      ...state.doubleBakings,
      loading: true
    }
  })),
  on(actions.loadDoubleBakingsSucceeded, (state, { doubleBakings }) => ({
    ...state,
    doubleBakings: {
      ...state.doubleBakings,
      data: doubleBakings,
      loading: false
    }
  })),
  on(actions.loadDoubleBakingsFailed, state => ({
    ...state,
    doubleBakings: {
      ...state.doubleBakings,
      loading: false
    }
  })),
  on(actions.increasePageOfDoubleBakings, state => ({
    ...state,
    doubleBakings: {
      ...state.doubleBakings,
      pagination: {
        ...state.doubleBakings.pagination,
        currentPage: state.doubleBakings.pagination.currentPage + 1
      }
    }
  })),
  on(actions.loadDoubleEndorsements, state => ({
    ...state,
    doubleEndorsements: {
      ...state.doubleEndorsements,
      loading: true
    }
  })),
  on(actions.loadDoubleEndorsementsSucceeded, (state, { doubleEndorsements }) => ({
    ...state,
    doubleEndorsements: {
      ...state.doubleEndorsements,
      data: doubleEndorsements,
      loading: false
    }
  })),
  on(actions.loadDoubleEndorsementsFailed, state => ({
    ...state,
    doubleEndorsements: {
      ...state.doubleEndorsements,
      loading: false
    }
  })),
  on(actions.increasePageOfDoubleEndorsements, state => ({
    ...state,
    doubleEndorsements: {
      ...state.doubleEndorsements,
      pagination: {
        ...state.doubleEndorsements.pagination,
        currentPage: state.doubleEndorsements.pagination.currentPage + 1
      }
    }
  })),
  on(actions.loadActiveBakers, state => ({
    ...state,
    activeBakers: {
      ...state.activeBakers,
      table: {
        ...state.activeBakers.table,
        loading: true
      }
    }
  })),
  on(actions.loadActiveBakersSucceeded, (state, { activeBakers }) => ({
    ...state,
    activeBakers: {
      ...state.activeBakers,
      table: {
        ...state.activeBakers.table,
        data: preprocessBakersData(activeBakers),
        loading: false
      }
    }
  })),
  on(actions.loadActiveBakersFailed, state => ({
    ...state,
    activeBakers: {
      ...state.activeBakers,
      table: {
        ...state.activeBakers.table,
        loading: false
      }
    }
  })),
  on(actions.increasePageOfActiveBakers, state => ({
    ...state,
    activeBakers: {
      ...state.activeBakers,
      table: {
        ...state.activeBakers.table,
        pagination: {
          ...state.activeBakers.table.pagination,
          currentPage: state.activeBakers.table.pagination.currentPage + 1
        }
      }
    }
  })),
  on(actions.loadTotalActiveBakers, state => ({
    ...state,
    activeBakers: {
      ...state.activeBakers,
      total: undefined
    }
  })),
  on(actions.loadTotalActiveBakersSucceeded, (state, { totalActiveBakers }) => ({
    ...state,
    activeBakers: {
      ...state.activeBakers,
      total: totalActiveBakers
    }
  })),
  on(actions.loadTotalActiveBakersFailed, state => ({
    ...state,
    activeBakers: {
      ...state.activeBakers,
      total: null
    }
  })),
  on(actions.reset, () => initialState)
)
