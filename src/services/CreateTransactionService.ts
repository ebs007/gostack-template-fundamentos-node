import TransactionsRepository from '../repositories/TransactionsRepository'
import Transaction from '../models/Transaction'

interface TransactionDTO {
  title: string
  value: number
  type: 'income' | 'outcome'
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository

  constructor (
    transactionsRepository: TransactionsRepository,
  ) {
    this.transactionsRepository = transactionsRepository
  }

  public execute ({
    title,
    value,
    type,
  }: TransactionDTO): Transaction {
    const getBalance = this.transactionsRepository.getBalance()

    if (type == 'outcome' && value > getBalance.total) {
      throw Error(
        'Operação não permitida. Valor de saíde ultrapassa o saldo em caixa.',
      )
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    })

    return transaction
  }
}

export default CreateTransactionService
