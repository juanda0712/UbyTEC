export interface RestaurantCompleteI{
    ID:string,
    SINPE:number,
    Email:string,
    Business_name:string,
    Business_type:string,
    Province:string,
    Canton: string,
    District: string,
    Phone_number:[],
    isVerified:number,
    Comment:string,
    Owner:{
        ID:string,
        Full_name:string,
        Province:string,
        Canton:string,
        District:string,
        Phone_number:[],
        Username:string,
        Password:string
    }
}