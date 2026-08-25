function createBankAccount() {
    return {
        balance: 0,
        performTransaction(amount) {
            if (isNaN(amount)) {
                throw new Error('Please enter correct amount for transaction');
            } else {
                this.balance += amount;
            }
        }
    };
};
const account1 = createBankAccount();
account1.performTransaction(500);
console.log(`account1: $${account1.balance}`);
const account2 = createBankAccount();
account2.performTransaction(750);
console.log(`account2: $${account2.balance}`);

function transaction(amount) {
    if (isNaN(amount)) {
                throw new Error('Please enter correct amount for transaction');
            } else {
                this.balance += amount;
            }
}

transaction.call(account1, 700);
transaction.call(account2, -220);
console.log(`account1: $${account1.balance}`);
console.log(`account2: $${account2.balance}`);

const depositHundredInAccountOne = transaction.bind(account1, 100);
depositHundredInAccountOne();
depositHundredInAccountOne();
console.log(`account1: $${account1.balance}`);