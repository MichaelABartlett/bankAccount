'use strict'

// here we are setting up to build a bankAccount
// it will be a javaScript object
// accountNumber and owner will be strings
// the transactions will be an array listing out each individual charge or deposit
class bankAccount {
    // the constructor is connecting and making the key in the bank account object
    constructor(iaccountNumber, iowner){
        // the word after the 'this.' is equal to the same word in the constructor
        //  it can be anything as long as those two match
        this.accountNumber = iaccountNumber;
        this.owner = iowner;
        // the this word below does not have a parameter in the constructor to match with
        // because all we are doing is setting up a empty array and not passing 
        // anything into it from the constructor
        this.transactions = [];
    }

    // here we are creating a function to keep up with the balance of the account
    balance(){
        // creating a variable to use in function, it is only available in this function, it is not global
        let total = 0;
        // looping thru the transactions array and passing each transaction into the calculation below
        for(let i = 0; i < this.transactions.length; i++){
            // calculating the total for each loop of the array
            total = total + this.transactions[i].amount;
        }
        // returning the total for the balance() function
        return total;
    }

    // this function is going to see if a charge is legal and if so process it
    charge(payee, amt){
        // first we run the balance() function and get the balance
        // then pass that total into a variable to be used in the current function
        let currentBalance = this.balance();
        // here we are checking to see if the ammount charged is more than the currentBalance of the account
        // if the amount is less than the currentBalance then the punction proceeds
        // if not it does nothing
        if(amt <= currentBalance){   
            // creating a variable that equals the new transaction
            // it is multiplied by '-1' to turn the amount charged into a negative number
            let chargeTrans = new transaction(-1 * amt, payee);
            // here we are updating the transactions array for this.account
            // it is just ADDING a new element to the array, increasing the length by 1, 
            // it is NOT calculating the actual total for the account
            this.transactions.push(chargeTrans);
        }
        //*********************************************************************************************************
        // it could have also been written as below
        //
        // if(currentBalance >= amt){   
        //     let chargeTrans = new transaction(-1 * amt, payee);
        //     this.transactions.push(chargeTrans);
        // }
        // ******************************************************************************************************
        // it could also be written as below
        //
        // if(amt > currentBalance){   
            
        // } else {
        //         let chargeTrans = new transaction(-1 * amt, payee);
        //         this.transactions.push(chargeTrans);
        // }

    }

    // this function adds a deposit to the transactions array, it does NOT calculte a new total for the account
    // it works similar to the charge() function 
    deposit(amt){
        // first we make sure the amount being added is not a negative number
        // if it is not then we do nothing
        if(amt > 0){
            // if the deposit is a positive number then we proceed
            // a variable is created so we can work with "this" new transaction in the function
            // "this" transaction information is then passed into the variable
            let depositTrans = new transaction(amt, 'deposit');
            // the deposit is then added to the transactions array, the length of the array is increased by 1
            // the balance of the account is not upadated
            // there is NO math happening in this function
            this.transactions.push(depositTrans);
        }
        // this function could be written in several lwas just like we did in the charge() function
    }

}

// here we are building each transaction
// it will be a javaScript object
// amount will be a number, only because that is what is entered, if a string was entered it would throw an error
// payee is going to be a string
class transaction {
    constructor(amount, payee){
        this.amount = amount;
        this.payee = payee;
        this.date = new Date();
    }
}

// we are making the module, in this case 'class bankAccount and class transaction' 
// available to another file
module.exports = {bankAccount,transaction};
