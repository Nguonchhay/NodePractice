const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    }
});

// Hash password using passport-local-mongoose plugin
UserSchema.plugin(passportLocalMongoose, { usernameField : 'email' });

// UserSchema.pre('save', async (next) => {
//     try {
//         if (!user.isModified('password')) {
//             next();
//         }

//         const salt = await bcryptjs.getSalt(10);
//         const hashPassword = await bcryptjs.hashPassword(this.password, salt);
//         this.password = hashPassword;
//         next();
//     } catch(err) {
//         next(err);
//     }
// });

// UserSchema.methods.matchPassword = async (password) => {
//     try {
//         return await bcrypt.compare(password, this.password);
//     } catch (error) {
//         throw new Error(error);
//     }
// }

module.exports = mongoose.model('User', UserSchema);
