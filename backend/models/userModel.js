const bcrypt = require('bcryptjs')

module.exports = (sequelize,DataTypes) => {
    const Users = sequelize.define(
        "Users",
        {
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [2, 10],
                },
            },

            lastName:{
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: [2, 10],
                },

            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                foreignKey:true,
                validate: {
                    isEmail: true,
                },
            },

            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            cpassword: {
                type: DataTypes.STRING,
            },
            state: {
                type: DataTypes.STRING,
            },
            city :{
                type: DataTypes.STRING,
                allowNull: false

            },
            zipCode:{
                type: DataTypes.INTEGER,
                allowNull:false
            },
            country :{
                type: DataTypes.STRING,
                allowNull:false
            },

            phoneNo: {
                type:DataTypes.INTEGER,
                validate :{
                    len:[10,11]
                }
            },



            isAdmin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },

        },
        {
            freezeTableName: true,
        },


    );





    // Hashing Password
    Users.beforeCreate((users) => {
        return bcrypt
            .hash(users.password && users.cpassword, 10)
            .then((hash) => {
                users.password = hash;
                users.cpassword = hash;
            })
            .catch((err) => {
                throw new Error("Hash not done", err);
            });
    });

    // Matching Password

    //Matching Password
    Users.prototype.matchPassword = async function (enterdPassword) {
        return await bcrypt.compare(enterdPassword, this.password);
    };


    return Users;
}
