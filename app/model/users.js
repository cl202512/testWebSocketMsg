module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    // 用户
    const UserSchema = new Schema({
        Name: { type: String }, 
        UserName: { type: String },          
        Pwd: { type: String },
        Flag: { type: Number, default: 1 },         // 是否可见： 1 可见 0 不可见
        Creater: { type: String },                  // 创建人
        Created: { type: Date, default: Date.now }, // 创建时间
        Updated: { type: Date, default: Date.now }  // 更新时间
    });

    return mongoose.model('User', UserSchema);
};
