#! /usr/bin/env node

import inquirer from "inquirer";

interface bankAccount{
    accountNumber:number,
    balance:number;
    withdraw(amount:number):void
    deposit(amount:number):void
    checkBalance(): void
}

// class of Bank Account
class bankAccount implements bankAccount {
    accountNumber: number;
    balance: number;

    constructor(accountNumber:number, balance:number){
        this.accountNumber =accountNumber
        this.balance = balance
    }


    //Debit money 
    withdraw(amount:number):void {
        if(this.balance >= amount){
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} successful.Remaining balance: $${this.balance}`);
            
        }else{
            console.log("Insufficient balance.");
            
        }
    }

    // Credit money
    deposit(amount:number):void {
        if(amount > 100){
            amount -= 1; //if user charged more than $100 ,$1 fee will be charged
        } this.balance += amount;
        console.log(`Deposit of $${amount} successful.REmaining balance: $${this.balance}`);
        

    }
    
    //Check Balance
    checkBalance(): void {
        console.log(`Current balance $${this.balance}`);
        
    }
}

//Class of customer
class Customer{
    firstName: string;
    lastName: string;
    gender:string;
    age:number;
    mobileNumber: number;
    account:bankAccount;

    constructor(firstName: string,lastName: string, gender:string,age:number,mobileNumber: number,account:bankAccount){
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account


    }

}

//Create bank accounts

const accounts: bankAccount[] = [
    new bankAccount (1001,500),
    new bankAccount (1002,1000),
    new bankAccount (1003,2000)
];

//Create customers
const customers: Customer[] =[
    new Customer ("Osama","Khan","Male",35,3346789531,accounts[0]),
    new Customer ("Moiz","Khan","Male",25,3357789531,accounts[1]),
    new Customer ("Sadia","Khan","Female",23,3366789531,accounts[2])
]

//Function to interact with bank account

async function service() {
    do{
        const accountNumberInput = await inquirer.prompt({
            name:"accountNumber",
            type:"number",
            message: "Enter your account number:"
        })

        const customer = customers.find(customer =>customer.account.accountNumber === accountNumberInput.accountNumber)
        if(customer){
            console.log(`Welcome, ${customer.firstName} ${customer.lastName}! \n`);
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "Select an operation",
                choices: ["Deposit","Withdraw","Check Balance","Exit"]
            }]);

            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name:"amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    })
                    customer.account.deposit(depositAmount.amount);
                    break;

                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name:"amount",
                        type: "number",
                        message: "Enter the amount to deposit:"
                    })
                    customer.account.deposit(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log("Exiting bank program...");
                    console.log("\n Thank you for using our bank services");
                    return;     

            }
            
        }else{
            console.log("Invalid account number. Please try again.");
            
        }

    } while(true)
}

service()
