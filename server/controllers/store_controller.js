import model from "../model";
//-- 店铺订单统计
async function storeOrderCount(ctx) {
    var storeModel = model.new_store_model;
    var storeList = await storeModel.findAll();
    ctx.rest(storeList);
}

export default { storeOrderCount };
