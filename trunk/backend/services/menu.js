var menuService = {};

menuService.getMenus = function getMenus(connection) {
    var sql = "SELECT id, ten, hinh, gia, ghichu FROM menu";
    return connection.query(sql);
};

menuService.addMenu = function addMenu(connection, data) {
    var sql = "INSERT INTO menu (ten, hinh, gia, ghichu) VALUES (:ten, :hinh, :gia, :ghichu)";
    return connection.query(sql, data);
}

module.exports = menuService;