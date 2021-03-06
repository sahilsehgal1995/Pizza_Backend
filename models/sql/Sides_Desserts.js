/* jshint indent: 1 */

module.exports = function (sequelize, DataTypes) {
	var sides_desserts = sequelize.define('sides_desserts', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: true,
			defaultValue: ''
		},
		is_available: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true
		},
		date_created: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		}
	}, {
		freezeTableName: true,
		createdAt: false,
		updatedAt: false
	});
	return sides_desserts;
};