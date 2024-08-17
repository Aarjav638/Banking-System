export interface user{
    name:string;
    email:string;
    password:string;
    phone:string;
}
export interface Transaction {
    id: string|null;
    amount: number;
    type: string;
    mode: string;
  }