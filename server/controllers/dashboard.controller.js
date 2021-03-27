import { sequelize, Op } from "../models/IndexModel";

const JumlahOrder = async (req, res) => {
  try {
    const order = await sequelize.query(
      " select acco_nama, count(order_name) as jumlah from orders join account on order_acco_id = acco_id where order_stat_name = 'CLOSED' group by acco_nama order by jumlah desc",
      { type: sequelize.QueryTypes.SELECT }
    );

    return res.send(order);
  } catch (error) {
    console.log(error);
  }
};

const ProdukLaris = async (req, res) => {
  try {
    const laris = await sequelize.query(
      " select prod_name, count(orit_prod_id) as total from orders_line_items join product on prod_id = orit_prod_id join orders on orit_order_name = order_name where order_stat_name = 'CLOSED' group by prod_name order by total desc",
      { type: sequelize.QueryTypes.SELECT }
    );

    return res.send(laris);
  } catch (error) {
    console.log(error);
  }
};

const ProdukCancel = async (req, res) => {
  try {
    const ProdCancel = await sequelize.query(
      " select prod_name,count(prod_name) as total from account join orders on acco_id = order_acco_id_seller join orders_line_items on orit_order_name = order_name join product on orit_prod_id = prod_id where order_stat_name = 'PAID' group by prod_name",
      { type: sequelize.QueryTypes.SELECT }
    );

    return res.send(ProdCancel);
  } catch (error) {
    console.log(error);
  }
};

const ProdCityBuyer = async (req, res) => {
    try {
      const CityBuy = await sequelize.query(
        " select city_id,city_name, (select sum(total_order) from (select city_id,order_acco_id,count(order_name) as total_order from orders join account on acco_id=order_acco_id join address on addr_accu_id = acco_id join kodepos on addr_kodepos = kodepos join kecamatan on kodepos_kec_id = kec_id join city on kec_city_id = city_id where addr_is_primary = true group by order_acco_id,city_id)t where city_id=c.city_id group by t.city_id) as total_order from city c",
        { type: sequelize.QueryTypes.SELECT }
      );
  
      return res.send(CityBuy);
    } catch (error) {
      console.log(error);
    }
  };


  const ProdCitySeller = async (req, res) => {
    try {
      const CitySell = await sequelize.query(
        "select city_id,city_name, (select sum(total_order) from (select city_id,order_acco_id_seller,count(order_name) as total_order from orders join account on acco_id=order_acco_id_seller join address on addr_accu_id = acco_id join kodepos on addr_kodepos = kodepos join kecamatan on kodepos_kec_id = kec_id join city on kec_city_id = city_id where addr_is_primary = true group by order_acco_id_seller,city_id)t where city_id=c.city_id group by t.city_id) as total_order from city c",
        { type: sequelize.QueryTypes.SELECT }
      );
  
      return res.send(CitySell);
    } catch (error) {
      console.log(error);
    }
  };

  const TotalOrderCB = async (req, res) => {
    try {
      const OrderBuyer = await sequelize.query(
        "select t.city_id,city_name,sum(total_order) as total_order from (select city_id,city_name,order_acco_id,count(order_name) as total_order from orders join account on acco_id=order_acco_id join address on addr_accu_id = acco_id join kodepos on addr_kodepos = kodepos join kecamatan on kodepos_kec_id=kec_id join city on kec_city_id = city_id group by order_acco_id,city_id,city_name)t group by t.city_id,t.city_name",
        { type: sequelize.QueryTypes.SELECT }
      );
  
      return res.send(OrderBuyer);
    } catch (error) {
      console.log(error);
    }
  };

  const TotalOrderCS = async (req, res) => {
    try {
      const OrderSeller = await sequelize.query(
        "select t.city_id,city_name,sum(total_order) as total_order from (select city_id,city_name,order_acco_id_seller,count(order_name) as total_order from orders join account on acco_id=order_acco_id_seller join address on addr_accu_id = acco_id join kodepos on addr_kodepos = kodepos join kecamatan on kodepos_kec_id=kec_id join city on kec_city_id = city_id group by order_acco_id_seller,city_id,city_name)t group by t.city_id,t.city_name",
        { type: sequelize.QueryTypes.SELECT }
      );
  
      return res.send(OrderSeller);
    } catch (error) {
      console.log(error);
    }
  };

  const TotalProductCB = async (req, res) => {
    try {
      const ProductBuyer = await sequelize.query(
        "select get_city_name(acco_id) as city,sum(total_qty)total_product from(select acco_id,prod_name as prod_name,sum(orit_qty) as total_qty from orders_line_items join product on prod_id = orit_prod_id join orders on order_name = orit_order_name join account on acco_id = order_acco_id group by acco_id,prod_name)t group by get_city_name(acco_id)",
        { type: sequelize.QueryTypes.SELECT }
      );
  
      return res.send(ProductBuyer);
    } catch (error) {
      console.log(error);
    }
  };

  const TotalProductCS = async (req, res) => {
    try {
      const ProductSeller = await sequelize.query(
        "select get_city_name_seller(acco_id) as city,sum(total_qty)total_product from(select acco_id,prod_name as prod_name,sum(orit_qty) as total_qty from orders_line_items join product on prod_id = orit_prod_id join orders on order_name = orit_order_name join account on acco_id = order_acco_id_seller group by acco_id,prod_name)t group by get_city_name_seller(acco_id)",
        { type: sequelize.QueryTypes.SELECT }
      );
  
      return res.send(ProductSeller);
    } catch (error) {
      console.log(error);
    }
  };



export default {
  JumlahOrder,
  ProdukLaris,
  ProdukCancel,
  ProdCityBuyer,
  ProdCitySeller,
  TotalOrderCB,
  TotalOrderCS,
  TotalProductCB,
  TotalProductCS
};
