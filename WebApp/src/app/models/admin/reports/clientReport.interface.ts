export interface ClientReportI{
    Client:string,
    Bill:[
        Restaurant:string,
        Orders:number,
        Driver:string,
        Total:number,
        Fee:number
    ]
    
}