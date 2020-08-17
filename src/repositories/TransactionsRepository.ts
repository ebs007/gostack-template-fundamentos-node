import Transaction from '../models/Transaction'

interface Balance {
  income: number
  outcome: number
  total: number
}

interface TransactionDTO {
  title: string
  value: number
  type: 'income' | 'outcome'
}
class TransactionsRepository {
  private transactions: Transaction[]

  constructor () {
    this.transactions = []
  }

  public all (): Transaction[] {
    return this.transactions
  }

  public getBalance (): Balance {
    let income = this.transactions.reduce(function (
      acumulador,
      valorAtual,
      index,
      array,
    ){
      if (valorAtual.type == 'income') {
        return acumulador + valorAtual.value
      }
      else {
        return acumulador
      }
    }, 0)
    let outcome = this.transactions.reduce(function (
      acumulador,
      valorAtual,
      index,
      array,
    ){
      if (valorAtual.type == 'outcome') {
        return acumulador + valorAtual.value
      }
      else {
        return acumulador
      }
    }, 0)

    return {
      income: income,
      outcome: outcome,
      total: income - outcome,
    }
  }

  public create ({
    title,
    value,
    type,
  }: TransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    })
    this.transactions.push(transaction)
    return transaction
  }
}

export default TransactionsRepository
