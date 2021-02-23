/*  gunakan salah satu untuk latihan, kita buat 3 route : 
    1. region-raw : menggunakan raw query
    2. region-seq : menggunakan method sequelize
    3. region-ctrl : bisnis logic dipisah di folder controller
*/


import regions from './RegionRoute';
import province from './province';
import city from './city';
import kecamatan from './kecamatan';
import kodepos from './kodepos';
import address from './address';
import users from './users';
import account from './account';







export default {
  regions,
  province,
  city,
  kecamatan,
  kodepos,
  address,
  users,
  account
};
