const cds = require('@sap/cds');
const { COMMIT } = require('@sap/cds/libx/_runtime/db/utils/coloredTxCommands');


class CatalogService extends cds.ApplicationService {init(){
  

  const { ExpressPrice,DNExpress  } = cds.entities ('com.expressprice');

  this.on ('insertExpress', async req => {
    const {outboundDelivery,originProvince,targetProvince,grossWeight} = req.data; 
    let tag = originProvince+targetProvince;
    console.log(tag);

     let {basePrice,scalePrice } = await SELECT `basePrice,scalePrice` .from  (ExpressPrice,tag);
    
     let expressCost = 0;
    
    if(Number(grossWeight)  < 1){
      expressCost = Number(basePrice);
    }else{
      expressCost =  Number(basePrice) + ( Number(grossWeight) - 1) *  Number(scalePrice);
    }
    let expressCostStr = String(expressCost);
    const dnExpress = {outboundDelivery:outboundDelivery,originProvince:originProvince,targetProvince:targetProvince,basePrice: basePrice,scalePrice:scalePrice,grossWeight: Number(grossWeight),expressCost:expressCost };
    await INSERT (dnExpress) .into (DNExpress);
    await COMMIT;
    console.log(expressCostStr);
    return { expressCostStr };
  });
  this.on ('updateExpress', async req => {
    const {outboundDelivery,cpCode,logisticCode, logisticTrace} = req.data; 
    let dn = await SELECT `outboundDelivery` .from (DNExpress,outboundDelivery);
    if(!dn) return req.error(404,`DN ${outboundDelivery} does not exist`)
    await UPDATE (DNExpress,outboundDelivery) .with ({ cpCode: cpCode,logisticCode:logisticCode,logisticTrace:logisticTrace });
  await COMMIT;
  return {logisticCode};
  });


  return super.init();
}}

module.exports = { CatalogService };