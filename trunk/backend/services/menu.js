var menuService = {};

menuService.getMenus = function getMenus(connection) {
    var sql = "SELECT id, ten, hinh, gia, ghichu FROM menu";
    return connection.query(sql);
};

menuService.getEditMenu = function getEditMenu(connection, id) {
    var sql = "SELECT id, ten, hinh, gia, ghichu FROM menu WHERE id =" + id;
    return connection.query(sql);
};

menuService.addMenu = function addMenu(connection, data) {
    var sql = "INSERT INTO menu (ten, hinh, gia, ghichu) VALUES (:ten, :hinh, :gia, :ghichu)";
    return connection.query(sql, data);
}

menuService.deleteMenu = function deleteMenu(connection, id) {
    var sql = "DELETE FROM menu WHERE id =" + id;
    return connection.query(sql);
}

module.exports = menuService;