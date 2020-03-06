import bcrypt from 'bcrypt-nodejs';
import adminModel from '../models/admin';


class Admin {

    create = (req, res) => {
        let adminSchema = adminModel.model;

        adminModel.model.find({ email: req.body.email }, (err, data) => {
            if (err) {
                res.status(500).json({ message: 'An error occured' });
                return;
            } else if (data.length != 0 ) {
                res.status(409).json({ message: 'Admin account exists with this email address' });
                return;
            }

            let newAdmin = adminModel.model(req.body);

            newAdmin.save((err, data) => {
                if (err) {
                    res.status(500).json({ message: "An error occured" });
                    return;
                }

                res.status(201).json({'message':
                    {'response': 'Admin logged in', admin: data}
                })

            });
        })
    };

    login = (req, res) => {

        const AdminSchema = adminModel.model;
        adminSchema.findOne({ email: req.body.email}).exec((err, data) => {
            if (err) {
                res.status(500).json({message: 'An error occured'});
            }

            if(data) {
                bcrypt.compare(req.body.password, data.password, (err, mdata) => {
                    if(mdata) {
                        res.status(200).json({'message':{'response': 'Admin logged in', admin: data}
                        });
                    } else{
                        res.status(401).json({'message': {'response':'Invalid Email or password'}});
                    }
                });
            }
            else{
                res.status(401).json({'message': {'response':'Invalid Email or password'}});
            }
        })
    };

    allAdmin = (req, res) => {
        const adminSchema = adminModel.model;
        admin.find({}).exec((err, data) => {
            if (data) {
                 res.status(200).json({ data });
                 return;
            }

            res.status(500).json({ message: 'An error occured' });
        });
    }
}

export default Admin;
