const kecamatan = (sequelize, DataTypes) => {
  const kecamatan = sequelize.define('kecamatan', {
    kec_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    kec_name: {
      type: DataTypes.STRING(55),
      allowNull: true,
      unique: "kecamatan_kec_name_key"
    },
    kec_city_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'city',
        key: 'city_id'
      }
    }
  }, {
    sequelize,
    tableName: 'kecamatan',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "kecamatan_kec_name_key",
        unique: true,
        fields: [
          { name: "kec_name" },
        ]
      },
      {
        name: "kecamatan_pkey",
        unique: true,
        fields: [
          { name: "kec_id" },
        ]
      },
    ]
  });
  kecamatan.associate = models =>  {
    kecamatan.belongsTo(models.city,{foreignKey:'kec_city_id' })
    kecamatan.hasMany(models.kodepos,{foreignKey:'kodepos_kec_id' , onDelete: 'CASCADE' })
  }
  return kecamatan;
};

export default kecamatan;