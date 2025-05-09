db.getSiblingDB('admin').createUser(
{
    user:"root",
    pwd:"1234",
    roles: ["root"]
})