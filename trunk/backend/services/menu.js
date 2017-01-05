var menuService = {};

menuService.getMenus = function getMenus(connection) {
    var sql = "SELECT id, name FROM menu";
    return connection.query(sql);
};

module.exports = menuService;