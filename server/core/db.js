/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/**
 * @author 16to
 * @Mysql 操作类
 *
 */
const conn = require('./dbConfig');

const connection = conn();

// 执行
const Query = (sql, callback) => {
  connection.query(sql, callback);
}

// 查
const Select = (table, where, callback) => {
  let con = '';
  for (const j in where) {
    // 如果是字符串
    if (typeof (where[j]) === 'string' && j !== 'orderBy' && j !== 'limit' && j !== 'like') {
      con += `${j}='${where[j]}' AND `
    }
    // 如果是数字
    if (typeof (where[j]) === 'number') {
      con += `${j}=${where[j]} AND `;
    }
    // 增加like的搜索功能
    if (j === 'like') {
      con += `${where[j]} AND `;
    }
    // 增加orderBy排序功能，条件放在后面
    if (j === 'orderBy') {
      con = con.slice(0, -5);
      con += ` ORDER BY ${where[j]} AND `;
    }
    // 增加limit功能，条件放在最后面
  }
  con = con.slice(0, -5);
  const sql = `SELECT * FROM ${table} WHERE ${con}`;
  console.log(sql);
  connection.query(sql, callback);
};

// 增
const Insert = (table, datas, callback) => {
  let keys = '';
  let values = '';
  for (const k in datas) {
    keys += `${k},`;
    if (typeof (datas[k]) === 'string') { values += `'${datas[k]}',`; } else {
      values += `${datas[k]},`;
    }
  }
  keys = keys.slice(0, -1);
  values = values.slice(0, -1);
  const sql = `INSERT INTO ${table}(${keys}) VALUES(${values})`;
  console.log(sql);
  connection.query(sql, callback);
}

// 删
const Delete = (table, where, callback) => {
  let con = '';
  for (const j in where) {
    if (typeof (where[j]) === 'string') { con += `${j}='${where[j]}' AND `; } else {
      con += `${j}=${where[j]} AND `;
    }
  }
  con = con.slice(0, -5);
  const sql = `DELETE  FROM ${table} WHERE ${con}`;
  console.log(sql);
  connection.query(sql, callback);
}

// 改
const Update = (table, datas, where, callback) => {
  let sets = '';
  let con = '';
  for (const k in datas) {
    // 增加字段自增的功能
    if (k === 'addStep') {
      sets += `${datas[k]},`;
    } else if (typeof (datas[k]) === 'string') { sets += `${k}='${datas[k]}',`; } else {
      sets += `${k}=${datas[k]},`;
    }
  }
  sets = sets.slice(0, -1);
  for (const j in where) {
    if (typeof (where[j]) === 'string') { con += `${j}='${where[j]}' AND `; } else {
      con += `${j}=${where[j]} AND `;
    }
  }
  con = con.slice(0, -5);
  const sql = `UPDATE ${table} SET ${sets} WHERE ${con}`;
  console.log(sql);
  connection.query(sql, callback);
}

exports.Query = Query;
exports.Select = Select;
exports.Insert = Insert;
exports.Delete = Delete;
exports.Update = Update;
