

export interface AllStatusLoan {
    waiting:   Loan[];
    onProcess: Loan[];
    decline: Loan[];
    inDebt: Loan[];
}

export interface Loan {
    account:    Account;
    loanStatus: string;
    createdAt:  string;
    loanAmount: number;
    loanId:     string;
    loanType: string;
    interestRate: number;
    responsibleEmployeeId: string | null;
}

export interface Account {
    accountId: string;
    customer:  Customer;
}

export interface Customer {
    firstName: string;
    lastName:  string;
}
