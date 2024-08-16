export interface user{
    name:string;
    email:string;
    password:string;
    phone:string;
}
export interface Transaction {
    id: string;
    amount: number;
    type: string;
    date: string;
  }