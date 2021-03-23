const kodepos = (sequelize, DataTypes) => {
  const kodepos = sequelize.define('kodepos', {
    kodepos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    kodepos_kec_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'kecamatan',
        key: 'kec_id'
      }
    }
  }, {
    sequelize,
    tableName: 'kodepos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "kodepos_pkey",
        unique: true,
        fields: [
          { name: "kodepos" },
        ]
      },
    ]
  });
  kodepos.associate = models =>  {
    kodepos.belongsTo(models.kecamatan,{foreignKey:'kodepos_kec_id' })
    kodepos.hasMany(models.address,{foreignKey:'addr_kodepos', onDelete: 'CASCADE' })
  }
  return kodepos;
 
};
export default kodepos;