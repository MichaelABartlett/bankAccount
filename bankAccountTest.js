
// here we are picking up the two modules that we declared available to another file
// at the end of the bankAccount.js file
// we then give the location relevent to the file we are currently in
//
// to run these test you will still have to call it a test
// in the terminal call 'npm test bankAccountTest.js'  
// you still need to call it a test even though all that is in this file is test
//
const {bankAccount,transaction} = require("./bankAccount");


const assert = require("assert");

    // the modules bankAccount and transaction are now available to this file
    describe('test the account creation', function(){
        // here we are describing what we are testing
        // the description is just for our use
        // it does not effect how the code works
        // then we declare a function at the end
        it('should create a new account correctly', function(){
            // inside the function we are creating a new bankAccount class
            // and calling it 'acct1'
            // this class is created the same way it was in the bankAccount.js file
            let acct1 = new bankAccount('xx8644', 'Big Man');
            // here we are checking that the 'owner' of the class we created 'acct1' is 'Big Man'
            // we are using strictEqual so it must match EXACTLY
            // strings must be strings, numbers must be numbers ect...
            // even leters must be capitalized the same
            // if  EVERYTHING does not match exactly then you will not pass the test
            assert.strictEqual(acct1.owner, 'Big Man');
            // here we are checking to see if 'acct1 accountNumber' is equal to 'xx8644'
            // in the account that we created above
            assert.strictEqual(acct1.accountNumber, 'xx8644');
            // here we are checking to make sure that the length of the new account transactions is 0
            // rember in the bankAccount file where transactions = [], we are checking to make sure
            // that this arrey is empty and that nothing has been added to it at this point
            // we are checking on a new account so it should be blank because we declared it blank
            // to start with
            assert.strictEqual(acct1.transactions.length, 0);
            // at this point we have not made any deposits so the balance should be equal to 0
            // when we made the balance() function we declared 'let total = 0'
            // that is where the 0 came from that we are checking against
            // by the way we are running the balance() function here
            // we are not checking a balance variable
            assert.strictEqual(acct1.balance(), 0);
        });

    });

    describe('test the account balance', function(){
        // at every 'it' a new test is ran
        // if your program has 100 checks all in one 'it' 
        // you will only have one test
        // if you are running more than one check in a test 
        // try to keep them all relevant to each other
        // in other words don't check if a account is created correctly and 
        // also check if a charge is calculated correctly in the same test
        it('should create a new transaction correctly', function(){
            // a good idea is to set up each test in the beginning of it to 
            // eleminate chances of mistakes from other code rean before
            let acct1 = new bankAccount('xx8644', 'Big Man');
            assert.strictEqual(acct1.balance(), 0);
            // here we are running the deposit() function and passing in a amount 'called amt in the function argument' 
            acct1.deposit(100);
            // now we are running the same check that we did before on the balance but now we are checking to see if the 
            // balance is the number 100
            assert.strictEqual(acct1.balance(), 100);
            // now we are cheking to make sure that the charge() function works properly
            // we run the charge() , pass 'Target' and 10 into the argument
            // make sure the elements passed into the function are in the correct order
            // charge(payee, amt)
            acct1.charge('Target', 10);
            // we are now running the balance() function to get the balance after the deposit and the charge
            // and then checking to make sure the balance is the number 90
            assert.strictEqual(acct1.balance(), 90);
        });

        it('check that a negative deposit can not be made', function(){
            let acct1 = new bankAccount('xx8644', 'Big Man');
            assert.strictEqual(acct1.balance(), 0);
            acct1.deposit(100);  // putting 100 in the acct1 account
            assert.strictEqual(acct1.balance(), 100);
            // here we are testing to make sure the deposit can not take a negative amount
            // this check 'if(amt > 0)' in the deposit() function is what we are using to do this
            acct1.deposit(-30);  // trying to put in a -30 into account
            assert.strictEqual(acct1.balance(), 100);
        });

        it('should not allow charging to overdraft', function(){
            let acct1 = new bankAccount('xx8644', 'Big Man');
            assert.strictEqual(acct1.balance(), 0);
            // here we are checking to make sure the charge() function can not make the balance go to a negative number
            // this check 'if(amt <= currentBalance)' in the charge() function is what we are using to do this 
            acct1.charge('Target', 30) // this should not happen because the balance before the charge was 0
            assert.strictEqual(acct1.balance(), 0)
        });

        it('should allow a refund', function(){
            let acct1 = new bankAccount('xx8644', 'Big Man');
            assert.strictEqual(acct1.balance(), 0);
            // here we are hecking to see if we can give a refund
            // this charge will add to the account because there is a -30 as a argument
            // the 'new transaction(-1 * amt, payee)' in the charge() function changes the negative 30 
            // to a positive and then adds that to the balance
            // that is how we add to the account in the charge() function
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
            // notice on these test there is not a line creating a new class
            // the test will use the 'testAccount' created in the test above in it's checking
            testAccount.deposit(30);
            testAccount.deposit(20);
            testAccount.deposit(-3);  // nnothing happens here because it is a negative deposit, they are not allowed
            testAccount.deposit(34.25);
            testAccount.deposit(10000.45);
            assert.strictEqual(10084.70, testAccount.balance());
            testAccount.charge('cleanOut', 10084.70); // bringing the account back to zero with a single charge
            assert.strictEqual(0, testAccount.balance())
        })

        it('test charges', function(){
            testAccount.deposit(10000);
            testAccount.charge('HEB', 40);
            testAccount.charge('ACE hardware', 10.32);
            testAccount.charge('A Line Auto Parts', 40);
            testAccount.charge('Tractor Supply', -20); // this is negative to get a refund
            assert.strictEqual(9929.68, testAccount.balance());
                // here we are checking the length of the transactions array
                // there were 11 transactions but the negative charge did not go thru so it did not get counted
                // it did not make a transaction
            assert.strictEqual(10, testAccount.transactions.length);
            console.log('transactions: ', testAccount.transactions)  // just logging the transactions
            console.log('transactions: ', testAccount.transactions[2])  // pulling out just one transaction

        })
    })
