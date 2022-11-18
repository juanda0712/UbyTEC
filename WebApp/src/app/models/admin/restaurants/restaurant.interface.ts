export interface RestaurantI{
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
    Owner:string
}