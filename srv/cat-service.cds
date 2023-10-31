using com.dnexpresscost as my from '../db/schema';

service CatalogService @(requires: 'authenticated-user') {
    entity   ExpressPrice as projection on my.ExpressPrice;
    entity  DNExpress as projection on my.DNExpress;
    action  updateExpress ( outboundDelivery: DNExpress:outboundDelivery,cpCode: DNExpress:cpCode,logisticCode: DNExpress:logisticCode,logisticTrace: DNExpress:logisticTrace  ) returns { logisticCode: String };
    action  insertExpress ( outboundDelivery: DNExpress:outboundDelivery, originProvince: DNExpress: originProvince,targetProvince: DNExpress:targetProvince,grossWeight: String ) returns {  expressCostStr: String };
}
