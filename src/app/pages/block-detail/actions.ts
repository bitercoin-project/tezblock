import { createAction, props } from '@ngrx/store'

import { Transaction } from '@tezblock/interfaces/Transaction'
import { Block } from '@tezblock/interfaces/Block'
import { Count } from '@tezblock/domain/tab'
import { OrderBy } from '@tezblock/services/base.service'
import { OperationErrorsById } from '@tezblock/domain/operations'

const featureName = 'Block Detail'

export const loadBlock = createAction(`[${featureName}] Load Block`, props<{ id: string }>())
export const loadBlockSucceeded = createAction(`[${featureName}] Load Block Succeeded`, props<{ block: Block }>())
export const loadBlockFailed = createAction(`[${featureName}] Load Block Failed`, props<{ error: any }>())

// TODO: remove block argument when it'll be in store
export const loadTransactionsByKind = createAction(
  `[${featureName}] Load Transactions By Kind`,
  props<{ blockHash: string; kind: string }>()
)
export const loadTransactionsByKindSucceeded = createAction(
  `[${featureName}] Load Transactions By Kind Succeeded`,
  props<{ data: Transaction[] }>()
)
export const loadTransactionsByKindFailed = createAction(`[${featureName}] Load Transactions By Kind Failed`, props<{ error: any }>())

export const sortTransactionsByKind = createAction(`[${featureName}] Sort Transactions`, props<{ orderBy: OrderBy }>())

export const changeBlock = createAction(`[${featureName}] Change Block`, props<{ change: number }>())

export const increasePageSize = createAction(`[${featureName}] Change Page Size`)

export const loadTransactionsCounts = createAction(`[${featureName}] Load Transactions Counts`)
export const loadTransactionsCountsSucceeded = createAction(
  `[${featureName}] Load Transactions Counts Succeeded`,
  props<{ counts: Count[] }>()
)
export const loadTransactionsCountsFailed = createAction(`[${featureName}] Load Transactions Counts Failed`, props<{ error: any }>())

export const loadTransactionsErrors = createAction(`[${featureName}] Load Transactions Errors`, props<{ transactions: Transaction[] }>())
export const loadTransactionsErrorsSucceeded = createAction(
  `[${featureName}] Load Transactions Errors Succeeded`,
  props<{ operationErrorsById: OperationErrorsById[] }>()
)
export const loadTransactionsErrorsFailed = createAction(`[${featureName}] Load Transactions Errors Failed`, props<{ error: any }>())

export const reset = createAction(`[${featureName}] Reset`)
