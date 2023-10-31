namespace com.dnexpresscost;

entity ExpressPrice  {
    key tag: String;
    ID: Integer;
    originProvince: String;
    targetProvince: String;
    basePrice: Decimal(9,2);
    scalePrice: Decimal(9,2);
}

entity DNExpress  {
    key outboundDelivery: String;
    originProvince: String;
    targetProvince: String;
    basePrice: Decimal(9,2);
    scalePrice: Decimal(9,2);
    grossWeight: Decimal(9, 2);
    expressCost: Decimal(9,2);
    cpCode: String;
    logisticCode: String;
    logisticTrace:String(800);

}