'use strict'


class bankAccount {
    // the constructor is connecting and making the key in the bank account object
    constructor(accountNumber, owner){
        // the word after the 'this.' is connected to the same word in the constructor
        //  it can be anything as long as those two match
        //  this is also true for the second 'this.' word
        this.accountNumber = accountNumber;
        this.owner = owner;
        // this word does not have a parameter in the constructor to match with
        // because all we are doing is setting up a empty array and not passing 
        // anything into it
        this.transactions = [];
    }

    balance(){
        let sum = 0;
        for(let i = 0; i < this.transactions.length; i++){
            sum += this.transactions[i].amount;
        }
        return sum;
    }

    charge(payee, amt){
        let currentBalance = this.balance();
        if(amt <= currentBalance){
            let chargeTrans = new transaction(-1 * amt, payee);
            this.transactions.push(chargeTrans);
        }
    }

    deposit(amt){
        if(amt > 0){
            let depositTrans = new transaction(amt, 'deposit');
            this.transactions.push(depositTrans);
        }
    }

}

class transaction {
    constructor(amount, payee){
        this.amount = amount;
        this.payee = payee;
        this.date = new Date();
    }
}


// test below
if(typeof describe === 'function'){
    const assert = require('assert');

    describe('test the account creation', function(){
        it('should create a new account correctly', function(){
            let acct1 = new bankAccount('xx8644', 'Big Man');
            assert.strictEqual(acct1.owner, 'Big Man');
            assert.strictEqual(acct1.accountNumber, 'xx8644');
            assert.strictEqual(acct1.transactions.length, 0);
            assert.strictEqual(acct1.balance(), 0);
        });

    });

    describe('test the account balance', function(){
        it('should create a new transaction correctly', function(){
            let acct1 = new bankAccount('xx8644', 'Big Man');
            assert.strictEqual(acct1.balance(), 0);
            acct1.deposit(100);  // putting 100 in the acct1 account
            assert.strictEqual(acct1.balance(), 100);
            acct1.charge('Target', 10);
            assert.strictEqual(acct1.balance(), 90);
        });

        it('check that a negative deposit can not be made', function(){
            let acct1 = new bankAccount('xx8644', 'Big Man');
            assert.strictEqual(acct1.balance(), 0);
            acct1.deposit(100);  // putting 100 in the acct1 account
            assert.strictEqual(acct1.balance(), 100);
            acct1.deposit(-30);  // trying to put in a -30 into account
            assert.strictEqual(acct1.balance(), 100);
        });

        it('should not allow charging to overdraft', function(){
            let acct1 = new bankAccount('xx8644', 'Big Man');
            assert.strictEqual(acct1.balance(), 0);
            acct1.charge('Target', 30) // this should not happen because the balance before the charge was 0
            assert.strictEqual(acct1.balance(), 0)
        });

        it('should allow a refund', function(){
            let acct1 = new bankAccount('xx8644', 'Big Man');
            assert.strictEqual(acct1.balance(), 0);
            acct1.charge('Target', -30) // target is giving a 30 refund
            assert.strictEqual(acct1.balance(), 30)
        });


    });

    describe('testing transaction creation', function(){
        it('shoud create a deposite transaction correctly', function(){
            let t1 = new transaction(50, 'deposit');
            assert.strictEqual(t1.amount, 50);
            assert.strictEqual(t1.payee, 'deposit');
            assert.notStrictEqual(t1.date, undefined); // this is testing to make sure something was passed in, not checking if the date is correct
            assert.notStrictEqual(t1.date, null);

        })
        it('shoud create a charge transaction correctly', function(){
            let t1 = new transaction(-35.45, 'Target'); // Target is where it got charged
            assert.strictEqual(t1.amount, -35.45);
            assert.strictEqual(t1.payee, 'Target');
            assert.notStrictEqual(t1.date, undefined); // this is testing to make sure something was passed in, not checking if the date is correct
            assert.notStrictEqual(t1.date, null);

        })
    })

    describe('bunch or transactions and test', function(){
        let testAccount = new bankAccount('864HON864', 'Wild Bill');
        it('test account created correctly', function(){
            assert.strictEqual('864HON864', testAccount.accountNumber);
            assert.strictEqual('Wild Bill', testAccount.owner);
            assert.strictEqual(testAccount.balance(), 0);
        })

        it('test deposit', function(){
            testAccount.deposit(30);
            testAccount.deposit(20);
            testAccount.deposit(-3);
            testAccount.deposit(34.25);
            testAccount.deposit(10000.45);
            assert.strictEqual(10084.70, testAccount.balance());
            testAccount.charge('cleanOut', 10084.70);
            assert.strictEqual(0, testAccount.balance())
        })

        it('test charges', function(){
            testAccount.deposit(10000);
            testAccount.charge('HEB', 40);
            testAccount.charge('ACE hardware', 10.32);
            testAccount.charge('A Line Auto Parts', 40);
            testAccount.charge('Tractor Supply', -20); // this is negative to get a refund
            assert.strictEqual(9929.68, testAccount.balance());
            assert.strictEqual(10, testAccount.transactions.length);
            console.log('transactions: ', testAccount.transactions)  // just logging the transactions
            console.log('transactions: ', testAccount.transactions[2])  // pulling out just one transaction

        })
    })
}

